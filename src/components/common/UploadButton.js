import React from "react";
// Upload Button in React
const UploadButton = ({UploadUI, handleChange }) => {

    const handleClick = () => {
        const container = document.querySelector('.upload-container');
        const input_element = document.querySelector('.upload-file');
        input_element.click();
    }

    return <div className="upload-container" onClick={() => handleClick()}>
        {UploadUI}
        <input type="file"  accept='*'  hidden className="upload-file" onChange={handleChange} />
    </div>
}

export default UploadButton