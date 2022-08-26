import React from "react";

const FilePreview = ({ fileData }) => {
  return (
    <div className="flex mt-4 gap-4 w-[400px]">
      <div className="flex-col items-center">
        {/* loop over the fileData */}
        {fileData.fileList.map((f) => {
          return (
            <>
              <ol className="content-center">
                <li key={f.lastModified} className="flex justify-center mt-4 gap-4 w-[400px]">
                  {/* display the filename and type */}
                  <div key={f.name}>
                    {f.name}
                  </div>
                </li>
              </ol>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;