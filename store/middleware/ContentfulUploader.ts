import axios from "@store/client";
import {
  ContentfulUploadFileResponse,
  ContentfulCreateAssetResponse,
} from "@typedefs/app";

const CONT_ENVIRONMENT: string = process.env.NEXT_PUBLIC_CONT_ENVIRONMENT;
const CONT_SPACE_ID: string = process.env.NEXT_PUBLIC_CONT_SPACE_ID;
const CONT_MANAGEMENT_TOKEN: string =
  process.env.NEXT_PUBLIC_CONT_MANAGEMENT_TOKEN;

export default class ContentfulFileUploader {
  public file: File;
  public assetId: string | null = null;

  constructor(
    private space: string = CONT_SPACE_ID,
    private environment: string = CONT_ENVIRONMENT,
    private cmaToken: string = CONT_MANAGEMENT_TOKEN
  ) {}

  async upload(file: File): Promise<string> {
    try {
      console.log(`Upload started: ${file.name}`);
      const uploadResult = await this.uploadFile(file);
      console.log(`Upload success: ${file.name}`);

      const {
        sys: { id: uploadId },
      } = uploadResult;

      console.log(`Asset creation started: ${file.name}`);
      const createAssetResult = await this.createAsset(uploadId);
      console.log(`Asset creation success: ${file.name}`);

      const {
        sys: { id: createedAssetId },
      } = createAssetResult;

      console.log(`Asset processing started: ${file.name}`);
      await this.processAsset(createedAssetId);
      console.log(`Asset processing success: ${file.name}`);

      return createedAssetId;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  private uploadFile(file: File): Promise<ContentfulUploadFileResponse> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async (e) => {
        try {
          const response = await axios({
            method: "post",
            url: `https://upload.contentful.com/spaces/${this.space}/uploads`,
            headers: {
              "Content-Type": "application/octet-stream",
              Authorization: `Bearer ${this.cmaToken}`,
            },
            data: e.target.result,
          });
          resolve(response.data as ContentfulUploadFileResponse);
        } catch (e) {
          this.handleError(e);
          throw new Error("File upload error");
        }
      };
    });
  }

  private async createAsset(
    uploadId: string
  ): Promise<ContentfulCreateAssetResponse> {
    try {
      const response = await axios({
        method: "post",
        url: `https://api.contentful.com/spaces/${this.space}/environments/${this.environment}/assets`,
        headers: {
          "Content-Type": "application/vnd.contentful.management.v1+json",
          Authorization:
            "Bearer CFPAT-RwIveuyX9DDWBRHvIW3SuNldSCvGDA90oUCn9Y3IOPU",
        },
        data: {
          fields: {
            title: {
              "en-US": "upload asset test",
            },
            file: {
              "en-US": {
                contentType: "image/jpeg",
                fileName: "upload-asset-test.jpg",
                uploadFrom: {
                  sys: {
                    type: "Link",
                    linkType: "Upload",
                    id: uploadId,
                  },
                },
              },
            },
          },
        },
      });
      return response.data as ContentfulCreateAssetResponse;
    } catch (e) {
      this.handleError(e);
      throw new Error("Asset creation error");
    }
  }

  private async processAsset(id: string): Promise<any> {
    try {
      const response = await axios({
        method: "put",
        url: `https://api.contentful.com/spaces/${this.space}/environments/${this.environment}/assets/${id}/files/en-US/process`,
        headers: {
          "X-Contentful-Version": "1",
          Authorization: `Bearer ${this.cmaToken}`,
        },
      });
      return response.data;
    } catch (e) {
      this.handleError(e);
      throw new Error("Asset processing error");
    }
  }

  private handleError(err) {
    console.log(err);
  }
}
