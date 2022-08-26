import React, { useState } from "react";
import Image from "next/image";
import FilePreview from "./FilePreview";

const DropZone = ({ data, dispatch }) => {
  const [dragged, setDragged] = useState(false);

  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(true);
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };
  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(false);
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(true);
    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragged(false);

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add selected file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };

  // to handle file uploads
  const uploadFiles = async () => {
    // get the files from the fileList as an array
    let files = data.fileList;
    alert(files[0].name);
    // // initialize formData object
    // const formData = new FormData();
    // // loop over files and add to formData
    // files.forEach((file) => formData.append("files", file));

    // // Upload the files as a POST request to the server using fetch
    // // Note: /api/fileupload is not a real endpoint, it is just an example
    // const response = await fetch("/api/fileupload", {
    //   method: "POST",
    //   body: formData,
    // });

    // //successful file upload
    // if (response.ok) {
    //   alert("Files uploaded successfully");
    // } else {
    //   // unsuccessful file upload
    //   alert("Error uploading files");
    // }
  };

  return (
    <>
      <div
        id="dragdrop"
        className={
          dragged
            ? "flex flex-col items-center border text-[#888888] border-black rounded-xl p-16 w-[60%] h-[30vh] mt-8 bg-[#B2B2B2] bg-opacity-25"
            : "flex flex-col items-center border border-[#16abff] text-[#16abff] rounded-xl p-16 w-[60%] h-[30vh] mt-8"
        }
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className={data.fileList.length > 0 ? "hidden" : "w-12 h-12"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1"
          stroke="currentColor"
          className={data.fileList.length > 0 ? "w-12 h-12" : "hidden"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>

        <input
          id="fileSelect"
          type="file"
          multiple
          className="border-0 absolute overflow-hidden h-[1px] p-0 whitespace-nowrap w-[1px]"
          onChange={(e) => handleFileSelect(e)}
        />
        {data.fileList.length > 0 && <FilePreview fileData={data} />}
        <h3 className={data.fileList.length > 0 ? "hidden" : ""}>
          Drag & Drop{" "}
        </h3>
      </div>
      <div
        className={
          data.fileList.length > 0
            ? "flex justify-between w-[60%]"
            : "flex justify-center w-[60%]"
        }
      >
        <label
          htmlFor="fileSelect"
          className={
            data.fileList.length > 0
              ? "mt-4 border border-[#A5A5A5] bg-opacity-100 rounded-xl text-[#A5A5A5] cursor-pointer text-center inline-block px-2 py-3 select-none w-[48%] focus:bg-[#0a58ca] hover:bg-[#0a58ca]"
              : "mt-4 bg-[#16abff] bg-opacity-[7%] border border-[#16abff] rounded-xl text-[#16abff] cursor-pointer text-center inline-block px-2 py-3 select-none w-48 focus:bg-[#0a58ca] hover:bg-[#0a58ca]"
          }
        >
          {data.fileList.length > 0 ? "다시 불러오기" : "파일 불러오기"}
        </label>
        {/* Pass the selectect or dropped files as props */}
        {/* Only show upload button after selecting atleast 1 file */}
        <button
          onClick={uploadFiles}
          className={
            data.fileList.length > 0
              ? "mt-4 bg-[#16abff] bg-opacity-[7%] border border-[#16abff] rounded-xl text-[#16abff] cursor-pointer text-center inline-block px-2 py-3 select-none w-[48%] focus:bg-[#0a58ca] hover:bg-[#0a58ca]"
              : "hidden"
          }
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default DropZone;
