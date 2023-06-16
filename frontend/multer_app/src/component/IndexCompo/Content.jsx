import React, { useEffect, useState } from 'react';
import "./Content.css"
import axios from 'axios';
import Popup from './Popup';
import Filecard from './card';
import { PresenceContext } from 'framer-motion';

const Content = () => {
  const data = JSON.parse(localStorage.getItem('loginres'));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setIsOpen(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDownload = async (fileID,fileCode,filename,fileType) => {
    
    try {
      const result = window.prompt('Enter your file code for download', '')
      if(result==null || fileCode!=+result){
        alert("Not matched! Please try again later")
        return
      }
      const response = await axios.get(`http://localhost:8080/files/${fileID}/${fileCode}`,{
        headers:{
          authorization:`${data.access_token}`
        }
      });
      const bufferData = new Uint8Array(response.data.data.data);
      const blob = new Blob([bufferData], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.type = fileType;
      link.click();
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  const handleDelete = async(fileId) => {
    const result = window.prompt('Are you sure?Y/N', '')
    if(result==null || result.toLowerCase()!=="y"){
      console.log(result.toLocaleLowerCase())
      return
    }
      try {
        const response = await axios.delete(`http://localhost:8080/files/delete/${fileId}`,{
          headers:{
            authorization:`${data.access_token}`
          }
        });
        
        if(response.data.status==="DELETED"){
         alert(response.data.messege);
         deleterender()
        }else{
          alert(response.data.message)
        }

      } catch (error) {
        console.error('Error deleting file:', error);
      }
  }
  const handleUpload = async () => {
    if (!data) {
      alert('Please login first');
      return;
    }
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:8080/files/upload', formData, {
          headers: {
            authorization: `${data.access_token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setTimeout(() => {
          response.data.status == 'OK' ? alert('File uploaded. Your file code is ' + response.data.code) :
            alert(response.data.message)
        }, 0)

        console.log('File uploaded:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      alert('Please Select a file');
    }
  };

  
  useEffect(() => {
    fetchFiles();

    return ()=>{

    }
  }, [selectedFile,data]);

  const fetchFiles = async () => {
    try {
      if(!data){
        return
      }
      if(data.status!="OK"){
        return
      }
      const response = await axios.get('http://localhost:8080/files/', {
        headers: {
          authorization: `${data.access_token}`,
        },
      });
      const userFiles = response.data[0].files;
      setFiles(userFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const deleterender = (fileId)=>{
    setFiles(files.filter((file) => file.id !== fileId));
  }

  return (

    <>
     <Popup handleClose={handleClose} handleOpen={handleOpen} isOpen={isOpen} handleFileChange={handleFileChange} handleUpload={handleUpload}/>
      <div className='filesContains'>
        <div>
          <h2>All Files</h2>
          <div className='Cards'>
            {data==null  && <h2>Please Login</h2>}
            {data!==null && data.status=="OK" && files.map((file) => (
               <Filecard id={file._id} fileType={file.fileType} fileName={file.filename} fileCode={file.fileCode} handleDownload={handleDownload} handleDelete={handleDelete}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default Content;

