import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { useRef , useContext, useState} from 'react';
import UserContext from '../../context/UserContext/userContext';
import AlertCompo from '../../component/AlertCompo';

const Otp = () => {
    const inputRef = useRef([]);
    const context = useContext(UserContext);
    const [click ,setClick] = useState(false)
    const {otpFun ,res ,setErr,err} = context;
    console.log(res)
    const handleClick = () => {
        console.log(res)
        let x = inputRef.current[0].value+inputRef.current[1].value+inputRef.current[2].value+inputRef.current[3].value;
        const obj={
            otp:+x,
            userID:res.data.userID
        }
        x.length<4?alert("Please Enter Valid Input"):otpFun(obj);
        setClick(true)
        setErr(false)
    }
    return (
        <>
        {click && (<AlertCompo status={err?"error":"success"} msg = {res.message}/>
        )}
        <div className='otpDiv'>
            
            <h1>Enter OTP</h1>
            <HStack style={{display:'block'}}>
            <PinInput>
                <PinInputField  ref={(el)=>{inputRef.current[0]=el}}/>
                <PinInputField  ref={(el)=>{inputRef.current[1]=el}}/>
                <PinInputField  ref={(el)=>{inputRef.current[2]=el}}/>
                <PinInputField  ref={(el)=>{inputRef.current[3]=el}} />
            </PinInput>
            </HStack>
            <input type="submit" onClick={handleClick}/>
        </div>
        </>
    )
}

export default Otp;