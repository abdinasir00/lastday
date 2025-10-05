// import React from "react";
// import { useForm } from "react-hook-form";
// import { RegisterSchema } from "../components/Schema/Register";
// import { zodResolver } from "@hookform/resolvers/zod";


// function Login() {
//     const {
//       register,
//       handleSubmit,
//       formState: { errors },
//       reset,
//     } = useForm({
//       resolver: zodResolver(LoginSchema),
//       defaultValues: {  email: "", password: "" },
//     });
  
//     const onSend = (data) => {
//       console.log("onSend Data is ", data);
//       reset();
//     };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Log in 
//         </h1>

//         <form className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <button
//             type="submit"
//             className="bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
//           >
//             Login
//           </button>
//         </form>

//         <div className="text-center mt-4">
//           <a href="#" className="text-sm text-indigo-600 hover:underline">
//             Forgot your password?
//           </a>
//         </div>

//         <p className="text-center text-gray-600 mt-4 text-sm">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-indigo-600 hover:underline font-medium">
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import  { LoginSchema } from "../components/Schema/Login"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userlogin } from "../store/slices/auth";

// Login Schema


function Login() {
   const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSend = async(data) => {
    // console.log("✅ Login Data:", data);
    // reset();
     try {
      await dispatch(userlogin(data)).unwrap();
      console.log(" successfully login :", data);
      navigate("/login");
      reset();
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Log In
        </h1>

        <form
          onSubmit={handleSubmit(onSend)}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <div className="flex flex-col gap-1">
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-indigo-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-medium">
                 {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className={`border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "focus:ring-red-500"
                  : "focus:ring-indigo-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm font-medium">
                 {errors.password.message}  
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-700 text-white py-2 rounded-lg font-semibold  hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Login
          </button>
                    {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        </form>

        <div className="text-center mt-4">
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            Forgot your password?
          </a>
        </div>

        <p className="text-center text-gray-600 mt-4 text-sm">
{/*           
          <a
            href="/register"
            className="text-indigo-600 hover:underline font-medium"
          >
            Register here
          </a> */}
        </p>
      </div>
    </div>
  );
}

export default Login;
