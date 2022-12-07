import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Loader} from 'rsuite';
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel
} from "./file-upload.styles";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  useEffect(() =>{
    otherProps.filesFromApi ? setFiles(otherProps.filesFromApi) : <></>;
  }, [otherProps.filesFromApi])

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }else{
        console.log("too large")
      }
    }
    return { ...files };
  };


  const callUpdateFilesCb = (files) => {
    otherProps.dataChanged(true);
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Drag and drop a file or click to select a file</DragDropText>
        <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
          <i className="fas fa-file-upload" />
          <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>
      <FilePreviewContainer>
        {
!otherProps.fetchingImages ?
<PreviewList>
  {Object.keys(files).map((fileName, index) => {
    let file = files[fileName];
    let isImageFile = file.type.split("/")[0] === "image";
    return (
      <PreviewContainer key={fileName}>
        <div>
          {isImageFile && (
            
            <ImagePreview
              src={URL.createObjectURL(file)}
              alt={`file preview ${index}`}
            /> 
          )}
          <FileMetaData isImageFile={isImageFile}>
            <span>{file.name}</span>
            <aside>
              <span>{convertBytesToKB(file.size)} kb</span>
              <RemoveFileIcon
                className="fas fa-trash-alt"
                onClick={() => removeFile(fileName)}
              />
            </aside>
          </FileMetaData>
        </div>
      </PreviewContainer>
    );
  })}
</PreviewList> :  <Loader size="lg" content="Loading" />
        }
      
      </FilePreviewContainer>
    </>
  );
};

export default FileUpload;