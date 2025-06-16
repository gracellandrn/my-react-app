import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button"
import InputForm from "../Elements/Input"
import { login } from "../../services/authService";

const FormLogin = () => {
    const [loginFailed, setLoginFailed] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        // localStorage.setItem("email", event.target.email.value);
        // localStorage.setItem("password", event.target.password.value);
        // console.log("login");
        // window.location.href = "/products";
        const data = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        login(data, (status, res) => {
            if (status) {
                localStorage.setItem("token", res);
                window.location.href = "/products"
            } else {
                setLoginFailed(res.response.data);
                // console.log(res.response.data);
            }
        });
    };

    //buka browser langsung emailnya focus
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const usernameRef = useRef(null);
    return (
        <form onSubmit={handleLogin}>
            <InputForm ref={usernameRef} label="Username" type="text" placeholder="username" name="username" />
            <InputForm label="Password" type="password" placeholder="*****" name="password" />
            <Button variant="bg-blue-600 w-full" type="submit">Login</Button>
            {loginFailed && (
                <p className="text-center text-red-600 mt-5">{loginFailed}</p>
            )}
        </form >
    )
}

export default FormLogin