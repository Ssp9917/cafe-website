// src/components/Signup.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  // Access authentication functions from AuthContext
  const { googleLogin, handleGithubLogin } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/auth/signup', data);
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Error signing up');
    }
  };

  return (
    <dialog id="my_model_6" className="modal modal-middle sm:modal-middle" open>
      <div className="modal-box bg-white">
        <div className="modal-action flex-col justify-center mt-0">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className="font-bold text-slate-600 text-xl text-center mb-4">
              Create Your Account
            </h3>
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base text-slate-700">Name</span>
              </label>
              <input
                type="name"
                placeholder="Your name"
                className="input input-bordered text-gray-600 bg-yellow-100"
                {...register('name')}
              />
            </div>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base text-slate-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered text-gray-600 bg-yellow-100"
                {...register('email')}
              />
            </div>
            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base text-slate-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered text-gray-600 bg-yellow-100"
                {...register('password')}
              />
            </div>
            {/* Error message */}
            <p className="text-red-500 mb-4">{errors.message}</p>
            {/* Submit button */}
            <button
              type="submit"
              className="btn bg-yellow-300 hover:bg-yellow-400 border-none w-full text-gray-600 text-lg"
              value="Sign up"
            >
              Signup
            </button>
            {/* Close button */}
            <Link to="/">
              <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</div>
            </Link>
            <div className="text-center my-4 text-base text-gray-700">
              Have an account?
              <Link to="/login" className="underline text-yellow-700 ml-1">
                Login here
              </Link>
            </div>
          </form>
          <div className="flex justify-center space-x-3 mb-5">
            <button
              onClick={googleLogin}
              className="btn btn-circle bg-yellow-200 border-none text-gray-600 hover:bg-yellow-300"
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle bg-yellow-200 border-none text-gray-600 hover:bg-yellow-300">
              <FaFacebookF />
            </button>
            <button
              onClick={handleGithubLogin}
              className="btn btn-circle bg-yellow-200 border-none text-gray-600 hover:bg-yellow-300"
            >
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Signup;
