const SocialIcons = ({imglink , style ,lable}) => {
    return (
        <div>
            <img
                style={style}
                src={imglink}
                alt="icon"
            />
            <label style={{ cursor: 'pointer' }}>{lable}</label>
        </div>
    )
}
export default SocialIcons;