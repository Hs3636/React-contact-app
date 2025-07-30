import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers } from "../features/Users/userSlice";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import contactImg from "../assets/contactImg.png";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { setAuth } from "../features/Auth/authSlice";

const SignIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAction = (data) => {

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const ind = users.findIndex(
      (user) => user.email === data.email && user.password === data.password
    );
    if (ind === -1) return toast.error("Invalid username password");
    toast.success("Login successful !!");
    dispatch(setAuth(users[ind]));
    navigate("/home/all");

  };

  return (
    <div className="my-container">
      <img className="img" src={contactImg} alt="" />
      <div className="form-container">
        <h2>Login Page</h2>
        <form className="form" onSubmit={handleSubmit(handleAction)}>
          <TextField
            error={errors.email?.message}
            helperText={errors.email?.message || null}
            {...register('email', { required: {value: true, message: 'Email is required'}, pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address'} })}
            id="email"
            label="Email"
            placeholder="Enter your email"
          />
          <TextField
            error={errors.password?.message}
            id="password"
            helperText={errors.password?.message || null}
            {...register('password', { required: {value: true, message: 'Password is required'}, })}
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </form>
        <p>
          Don't have an account ? <Link to="/sign-up">Create One</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
