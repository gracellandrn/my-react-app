import { useLogin } from "../hooks/useLogin";

export const ProfilePage = () => {
    const username = useLogin();
    return (
        <div>
            <h1>Profile</h1>
            Username: {username}
        </div>
    )
}