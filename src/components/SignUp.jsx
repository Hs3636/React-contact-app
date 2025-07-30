import  { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser, fetchUsers } from "../features/Users/userSlice";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import contactImg from "../assets/contactImg.png";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { setAuth } from "../features/Auth/authSlice";

const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAction = (data) => {

    if (data.password !== data.cpassword) {
      return toast.error("Both password should be same.");
    }

    const user = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    };

    toast.success("Account created successfully !!");
    dispatch(setAuth(user));
    dispatch(addUser(user));
    navigate("/home/all");
    
  };

  return (
    <div className="my-container">
      <div className="form-container">
        <h2>Sign-Up Page</h2>
        <form className="form" onSubmit={handleSubmit(handleAction)}>
          <TextField
            error={errors.name?.message}
            helperText={errors.name?.message || null}
            {...register("name", {
              required: { value: true, message: "Name is required" },
            })}
            id="name"
            label="Name"
            placeholder="Enter your name"
          />
          <TextField
            error={errors.email?.message}
            helperText={errors.email?.message || null}
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            id="email"
            label="Email"
            placeholder="Enter your email"
          />
          <TextField
            error={errors.password?.message}
            id="password"
            helperText={errors.password?.message || null}
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <TextField
            error={errors.cpassword?.message}
            id="cpassword"
            helperText={errors.cpassword?.message || null}
            {...register("cpassword", {
              required: { value: true, message: "Password is required" },
            })}
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
          />
          <Button type="submit" variant="contained">
            create account
          </Button>
        </form>
        <p>
          Already have an account ? <Link to="/sign-in">Login</Link>
        </p>
      </div>
      <img className="img" src={contactImg} alt="" />
    </div>
  );
};

export default SignUp;
