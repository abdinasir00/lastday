// import React from "react";
// import { useForm } from "react-hook-form";
// import { RegisterSchema } from "../components/Schema/Register";
// import { zodResolver } from "@hookform/resolvers/zod";

// function Register() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(RegisterSchema),
//     defaultValues: { name: "", email: "", password: "" },
//   });

//   const onSend = (data) => {
//     console.log("onSsend Data is ", data);
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center p-6">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Welcome to Register
//         </h1>

//         <form onSubmit={handleSubmit(onSend)} className="flex flex-col gap-4">
//           {errors.name && <p> {errors.name.message} </p>}
//           <input
//             type="text"
//             name="name"
//             {...register("name")}
//             placeholder="Enter your name"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && <p> {errors.email.message} </p>}
//           <input
//             type="email"
//             name="email"
//             {...register("email")}
//             placeholder="Enter your email"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && <p> {errors.password.message} </p>}
//           <input
//             type="password"
//             name="password"
//             {...register("password")}
//             placeholder="Enter your password"
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-4 text-sm">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;





// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { RegisterSchema } from "../components/Schema/Register";

// function Register() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(RegisterSchema),
//     defaultValues: { name: "", email: "", password: "" },
//   });

//   const onSend = (data) => {
//     console.log("✅ Form Data:", data);
//     reset();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
//           Create Account
//         </h1>
    

//         <form onSubmit={handleSubmit(onSend)} className="flex flex-col gap-5">
//           {/* Name Field */}
//           <div>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Full Name
//             </label>
//             <input
//               type="text"
//               {...register("name")}
//               placeholder="Enter your name"
//               className={`w-full border ${
//                 errors.name ? "border-red-500" : "border-gray-300"
//               } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.name.message}
//               </p>
//             )}
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Email Address
//             </label>
//             <input
//               type="email"
//               {...register("email")}
//               placeholder="Enter your email"
//               className={`w-full border ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block mb-1 text-gray-700 font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               {...register("password")}
//               placeholder="Enter your password"
//               className={`w-full border ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300 transform hover:scale-[1.02]"
//           >
//             Register
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-6 text-sm">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-blue-600 hover:underline font-medium"
//           >
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React from "react";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "../components/Schema/Register";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegister } from "../store/slices/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSend = async (data) => {
    try {
      await dispatch(userRegister(data)).unwrap();
      console.log("Registered successfully:", data);
      navigate("/login");
      reset();
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSend)} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className={`border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.name ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
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
                errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
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
            className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Register
          </button>
          {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        </form>

        {/* <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </a>
        </p> */}
      </div>
    </div>
  );
}

export default Register;
