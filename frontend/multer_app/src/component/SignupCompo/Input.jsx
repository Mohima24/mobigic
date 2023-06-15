
const Input = ({type,placeholder,handlefun,name}) => {

    return <input type={type} placeholder={placeholder} onChange={handlefun} name = {name}/>
}
export default Input