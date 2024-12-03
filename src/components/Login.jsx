import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.email || !formData.password) {
      toast.error("all fields are required");
    }
    try {
      const { email, password } = formData;
      let { data } = await axios.post("http://localhost:8000/api/users/login", {
        email,
        password,
      });
      console.log(data);
      if (data) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-slate-50 min-h-full py-32">
      <form
        onSubmit={handleFormSubmit}
        className="form flex p-6 flex-col w-2/4 mx-auto  bg-white"
      >
        <h2 className="font-bold text-xl">User Login</h2>

        <label className="text-slate-800 font-semibold py-4" htmlFor="email">
          Email
        </label>
        <input
          className="border p-2 border-slate-400 rounded-sm"
          id="email"
          type="email"
          required
          value={formData.email}
          name="email"
          onChange={handleChange}
        />

        <label className="text-slate-800 font-semibold py-4" htmlFor="password">
          Password
        </label>
        <input
          className="border p-2 border-slate-400 rounded-sm"
          id="password"
          type="password"
          value={formData.password}
          required
          name="password"
          autoComplete="true"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="hover:bg-black hover:text-white transition-all text-white rounded-sm border-black bg-slate-800  p-2 my-4"
        >
          Submit
        </button>
        <p>
          Dont have an account !{" "}
          <Link to={"/signUp"} className="font-bold">
            Sign Up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
