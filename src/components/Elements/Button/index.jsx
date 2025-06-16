const Button = (props) => {
    const { children = "...", variant = "bg-black", onClick = () => { }, type = "button" } = props;
    return (
        // shg ga usah props.variant lg, tinggal variant aja
        <button className={`h-10 px-6 font-semibold rounded-md ${variant} text-white`} type={type} onClick={onClick}>
            {/* {props.text} */}
            {/* {props.children} */}
            {children}
        </button>
    )
}

export default Button;