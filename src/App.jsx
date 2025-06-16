import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"

function App() {
  return (
    // <div className="flex justify-center bg-blue-600 min-h-screen items-center">
    //   <div className="flex gap-x-3">
    //     {/* <Button variant="bg-yellow-500" text="Login"></Button> */}
    //     {/* <Button variant="bg-orange-500" text="Register"></Button> */}
    //     <Button variant="bg-yellow-500">Login</Button>
    //     <Button variant="bg-orange-500">Register</Button>
    //     <Button></Button>
    //   </div>
    // </div>

    <div className="flex justify-center min-h-screen items-center">
      {/* <LoginPage /> */}
      <RegisterPage />
    </div>
  )
}

export default App
