
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
const Popup = ({handleOpen,isOpen,handleClose,handleFileChange,handleUpload}) => {
    return(<div>
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
    </div>)
}
export default Popup;