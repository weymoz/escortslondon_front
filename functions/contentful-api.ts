import { EscortsData } from "@store/escorts";
import axios from "@store/client";
import { contentfulBaseURL, contentfulBaseParams } from "@store/api";
import { AxiosResponse } from "axios";
import {
  EscortsDuoResponse,
  FilterApiEscortsByServiceResponse,
  MenuItem,
  MainPageSettingsResponse,
  ServicePageSettingsResponse,
  EscortsDuoPageSettingsResponse,
  FaqPageSettingsResponse,
  ProfilePageSettingsResponse,
  DuoProfilePageSettingsResponse,
  CastingPageSettingsResponse,
  TermsPageSettingsResponse,
  AreaGroupResponse,
} from "@typedefs/app";

export const getEscortsData = (
  limit: number = 24,
  skip: number = 0
): Promise<AxiosResponse<EscortsData>> => {
  return axios.request<EscortsData>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "escorts",
      limit,
      skip,
    },
  });
};

export const getDuoEscortsData = (
  limit: number = 24,
  skip: number = 0
): Promise<AxiosResponse<EscortsDuoResponse>> => {
  return axios.request<EscortsDuoResponse>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "escortsDuo",
      limit,
      skip,
    },
  });
};

export const getServiceData = async (
  slug: string
): Promise<ServicePageSettingsResponse> => {
  const response = await axios.request<ServicePageSettingsResponse>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "service",
      "fields.slug": slug,
    },
  });
  return response.data;
};

export const getEscortsByServiceData = (
  slug: string,
  skip: number = 0,
  limit: number = 24
): Promise<AxiosResponse<FilterApiEscortsByServiceResponse>> => {
  return axios.request<FilterApiEscortsByServiceResponse>({
    method: "get",
    baseURL: process.env.NEXT_PUBLIC_ESCORTS_INDEX_BASE_URL + "/api",
    url: "/service",
    params: {
      slug,
      skip,
      limit,
    },
  });
};

export const getMainPageSettings = async (): Promise<
  MainPageSettingsResponse
> => {
  const response = await axios.request<MainPageSettingsResponse>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "mainPageSettings",
    },
  });
  return response.data;
};

export const getServicesPageSettings = async (): Promise<
  ServicePageSettingsResponse
> => {
  const response = await axios.request<ServicePageSettingsResponse>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "servicePageSettings",
    },
  });
  return response.data;
};

export const getEscortsDuoPageSettings = async (): Promise<
  EscortsDuoPageSettingsResponse
> => {
  const response = await axios.request<EscortsDuoPageSettingsResponse>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "escortsDuoPageSettings",
    },
  });
  return response.data;
};

export const getProfileData = (
  title: string
): Promise<AxiosResponse<EscortsData>> => {
  return axios.request<EscortsData>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      ["fields.title"]: title,
      content_type: "escorts",
    },
  });
};

export const getAllServices = (): Promise<AxiosResponse<MenuItem[]>> => {
  return axios.request<MenuItem[]>({
    method: "get",
    baseURL: process.env.NEXT_PUBLIC_ESCORTS_INDEX_BASE_URL + "/api",
    url: "/all-filterable-services",
  });
};

export const getDuoProfileData = async (
  slug: string
): Promise<EscortsDuoResponse> => {
  const response = await axios.request<EscortsDuoResponse>({
    url: "/entries",
    method: "get",
    baseURL: contentfulBaseURL,
    params: {
      ...contentfulBaseParams,
      content_type: "escortsDuo",
      "fields.slug": slug,
    },
  });
  return response.data;
};

export const getFaqPageSettings = async (): Promise<
  FaqPageSettingsResponse
> => {
  const response = await axios.request<FaqPageSettingsResponse>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "faqPageSettings",
    },
  });
  return response.data;
};

export const getProfilePageSettings = async (): Promise<
  ProfilePageSettingsResponse
> => {
  const response = await axios.request<ProfilePageSettingsResponse>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "profilePageSettings",
    },
  });
  return response.data;
};

export const getDuoProfilePageSettings = async (): Promise<
  DuoProfilePageSettingsResponse
> => {
  const response = await axios.request<DuoProfilePageSettingsResponse>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "duoProfilePageSettings",
    },
  });
  return response.data;
};

export const getCastingPageSettings = async (): Promise<
  CastingPageSettingsResponse
> => {
  const response = await axios.request<CastingPageSettingsResponse>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "castingPageSettings",
    },
  });
  return response.data;
};

export const getTermsPageSettings = async (): Promise<
  TermsPageSettingsResponse
> => {
  const response = await axios.request<TermsPageSettingsResponse>({
    method: "get",
    baseURL: contentfulBaseURL,
    url: "/entries",
    params: {
      ...contentfulBaseParams,
      content_type: "termsPageSettings",
    },
  });
  return response.data;
};

export const getAreaGroups = async (): Promise<AreaGroupResponse> => {
  const response = await axios
    .request<AreaGroupResponse>({
      method: "get",
      baseURL: contentfulBaseURL,
      url: "/entries",
      params: {
        ...contentfulBaseParams,
        content_type: "areaGroup",
      },
    })
    .catch((e) => console.log(e));

  return response.data;
};
