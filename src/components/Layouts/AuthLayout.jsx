import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";

const AuthLayout = (props) => {
  const { children, title, type } = props;
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  console.log("togle darkMode: ", isDarkMode);

  return (
    <div
      className={`flex justify-center min-h-screen items-center ${
        isDarkMode && "bg-slate-900"
      }`}
    >
      <div className="w-full max-w-xs">
        <button
          className="absolute bg-blue-600 text-white p-2 rounded-md right-2 top-2"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
        <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
        <p className="font-medium text-slate-500 mb-8">
          Welcome, Please enter your details
        </p>
        {children}

        {/* <p className="text-sm mt-5 text-center">
                    {type === "login" ? "Don't have an account? " : "Already have an account? "}

                    {type === "login" && (
                        < Link to="/register" className="font-bold text-blue-600">Register</Link>
                    )}
                    {type === "register" && (
                        < Link to="/login" className="font-bold text-blue-600">Login</Link>
                    )}
                </p> */}

        <Navigate type={type}></Navigate>
      </div>
    </div>
  );
};

const Navigate = ({ type }) => {
  if (type === "login") {
    return (
      <p className="text-sm mt-5 text-center">
        {" "}
        Don't have an account? {""}
        <Link to="/register" className="font-bold text-blue-600">
          Register
        </Link>
      </p>
    );
  } else {
    return (
      <p className="text-sm mt-5 text-center">
        {" "}
        Have an account? {""}
        <Link to="/login" className="font-bold text-blue-600">
          Login
        </Link>
      </p>
    );
  }
};

export default AuthLayout;
