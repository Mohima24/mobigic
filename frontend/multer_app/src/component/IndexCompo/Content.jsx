import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from
    '@chakra-ui/react';

const Content = () => {
    const data = JSON.parse(localStorage.getItem('loginres'));
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
  
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
          setTimeout(()=>{
            response.data.status == 'OK'? alert('File uploaded. Your file code is ' + response.data.code):
            alert(response.message)
          },0)
          console.log('File uploaded:', response.data);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        alert('Please Select a file');
      }
    };
    return (

        <>
        <div>
            <Button onClick={handleOpen}>Open Form</Button>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>File Upload</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <input type="file" placeholder="" onChange={handleFileChange} />
                    </ModalBody>
                    <ModalFooter>
                        <input type="submit" placeholder="" onClick={handleUpload} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
        </>
    )
}
export default Content;

