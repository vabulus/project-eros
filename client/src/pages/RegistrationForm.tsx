import axios from "axios"; // If you're in a Node.js or CommonJS environment
import React, { useState } from "react";
import {useProfileRedirect} from "../hooks/useProfileRedirect";


export function RegistrationForm() {

  const { loading, data } = useProfileRedirect();

  if (data){
    window.location.href = "/profile"
  }


  interface AxiosResponse {
    response?: {
      status: number;
      data: any;
    };
    message: string;
  }

  const [formData, setFormData] = useState({
    username: "fabulus",
    email: "admin@admin.com",
    password: "asdfasdf",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let [username_is_existing, set_username_is_existing] = useState(false);
  let [email_is_existing, set_email_is_existing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    function isError(error: unknown): error is Error {
      return error instanceof Error;
    }

    let response = undefined;
    try {
      response = await axios.post(
        "http://localhost:3001/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      alert(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      // username taken or email
      const axiosError = error as AxiosResponse;
      if (axiosError.response) {
        if (axiosError.response.status === 409) {
          if (
            axiosError.response.data.errors.username ===
            "This username is already taken."
          ) {
            set_username_is_existing(true);
          }
          if (
            axiosError.response.data.errors.email ===
            "This email is already registered."
          ) {
            set_email_is_existing(true);
          }
        }
      } else {
        console.error("An unknown error occurred:", axiosError.message);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    username_is_existing
                      ? "border-red-600 placeholder-red-600"
                      : "border-0 ring-gray-300 placeholder-text-gray-400"
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
              {username_is_existing ? (
                <p className="text-red-600 mt-2 text-sm">
                  Username already exists.
                </p>
              ) : (
                <a></a>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    email_is_existing
                      ? "border-red-600 placeholder-red-600"
                      : "border-0 ring-gray-300 placeholder-text-gray-400"
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
              {email_is_existing ? (
                <p className="text-red-600 mt-2 text-sm">
                  Email is already used.
                </p>
              ) : (
                <a></a>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
