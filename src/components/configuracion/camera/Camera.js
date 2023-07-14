import React from "react";
import { Dialog } from "@material-ui/core";
import WebCamera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export const Camera = ({ onClose, open, setShowCamera, fileName, callback }) => {

  return ( 
    <Dialog 
      open={open} 
      maxWidth="md"
      onClose={onClose}
    >
      <WebCamera
          onTakePhoto={(dataUri) => {
            let arr = dataUri.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]); 
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            
            while(n--){
              u8arr[n] = bstr.charCodeAt(n);
            }
            
            const file = new File([u8arr], `${fileName}.jpg`, {type:mime});
            callback(file);
            setShowCamera(false);
          }}
      />
    </Dialog>
  )
};
