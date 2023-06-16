import {AiOutlineDownload} from 'react-icons/ai';
import {MdDeleteForever} from 'react-icons/md';

const Filecard = ({id,fileType, fileName, fileCode ,handleDownload, handleDelete}) => {
    return (
        <div className='FileCard' key={id}>
            <h3>Filename: {fileName}</h3>
            <p>File Type: {fileType}</p>
            <p>File Code: {fileCode}</p>
            <button onClick={() => handleDownload(id, fileCode, fileName, fileType)}><AiOutlineDownload /></button>
            <button onClick={()=>{handleDelete(id)}}><MdDeleteForever /></button>
        </div>)
}

export default Filecard;