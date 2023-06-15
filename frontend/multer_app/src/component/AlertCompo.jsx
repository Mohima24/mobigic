
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
const AlertCompo = ({status,msg}) => {
    return (<>
        
            <Alert status={status} maxW="400px" mx="auto">
            <AlertIcon />
            {msg}
            </Alert>
            </>
    )
}
export default AlertCompo;