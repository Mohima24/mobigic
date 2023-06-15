import React, { useEffect, useState } from "react";
import FileContext from "./fileContext";
import { useNavigate } from "react-router-dom";

const FileState = ({ children }) => {
    
    return (
      <FileContext.Provider
        value={{ }}
      >
        {children}
      </FileContext.Provider>
    );
    
  };
  
  export default FileState;
  