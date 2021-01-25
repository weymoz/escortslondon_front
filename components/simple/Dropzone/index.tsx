import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import UploadIcon from "@svg/upload.svg";
import TrashIcon from "@svg/trash.svg";
import s from "./style.module.css";

interface Props {
  handleFile(file: File | null): void;
}

const Dropzone = ({ handleFile }: Props) => {
  const [acceptedFile, setAcceptedFile] = useState<{
    preview: string;
    file: File;
  } | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (files: File[]) => {
      if (!files || !files.length) return;
      const file = files[0];
      setAcceptedFile({
        file,
        preview: URL.createObjectURL(file),
      });
    },
  });

  useEffect(() => {
    handleFile((acceptedFile && acceptedFile.file) || null);
  }, [acceptedFile]);

  return (
    <div className={s.dropzone} {...getRootProps()}>
      {acceptedFile ? (
        <div className={s.preview}>
          <img src={acceptedFile.preview} />
          <TrashIcon
            onClick={() => setAcceptedFile(null)}
            className={s.trashIcon}
          />
        </div>
      ) : (
        <>
          <input {...getInputProps()} />
          <div className={s.dropzonePlaceholder}>
            <div className={s.uploadIcon}>
              <UploadIcon />
            </div>
            <p>
              Drag an image to upload or <span>browse</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropzone;
