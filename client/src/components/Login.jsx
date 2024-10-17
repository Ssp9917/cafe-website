import React, { useContext, useState } from 'react'
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axiosConfig';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {

  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate()

  const {setUser} = useContext(AuthContext)

  //react hook form
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {

      const response = await axios.post('/auth/login', data);
      console.log(response);

      setUser(response.data.user)

      // Show success message
      swal({
        title: "Login Successful!",
        text: "Welcome back! You are now logged in.",
        icon: "success",
        buttons: false,
        timer: 2000, 
      });

    
      setTimeout(() => {
        navigate('/'); 
      }, 2000); 

    } catch (error) {
      console.error(error);
      alert('Error login up');
    }
  };


  return (
    <dialog id='my_model_5' className='modal modal-middle sm:modal-middle' open>
      <div className="modal-box bg-white">
        <div className="modal-action flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-slate-600 text-xl text-center mb-4">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base text-slate-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered text-gray-600 bg-yellow-100"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base text-slate-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered text-gray-600 bg-yellow-100"
                {...register("password", { required: true })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-yellow-300 hover:bg-yellow-400 border-none w-full text-gray-600  text-lg"
                value="Login"
              />
            </div>

            {/* close btn */}
            <Link to="/">
              <div
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </div></Link>

            <p className="text-center my-2">
              Don't have an account?
              <Link to="/signup" className="underline  text-yellow-700 ml-1">
                Signup Now
              </Link>
            </p>
          </form>
          <div className="text-center space-x-3">
            <button
              // onClick={handleRegister} 
              className="btn btn-circle bg-yellow-200  border-none  text-gray-600 hover:bg-yellow-300">
              <FaGoogle />
            </button>
            <button className="btn btn-circle bg-yellow-200  border-none  text-gray-600 hover:bg-yellow-300">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle bg-yellow-200  border-none  text-gray-600 hover:bg-yellow-300">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>

  )
}

export default Login