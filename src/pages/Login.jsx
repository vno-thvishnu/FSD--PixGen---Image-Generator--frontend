import React, { useContext, useState } from 'react'
import { useFormik } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { config } from '../constants/Config'
// import { UserContext } from '../UserContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

const Login = () => {

    const navigate = useNavigate();
 

    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate: (values) => {
        let error = {};
  
        if (values.email === "") {
          error.email = "please enter Email";
        }
        if (
          values.email &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.email)
        ) {
          error.email = " please enter a valid email";
        }
        if (values.password === "") {
          error.password = "please enter Password";
        }
        if (
          values.password &&
          (values.password.length <= 7 || values.password.length > 12)
        ) {
          error.password = "Password must be between 8 to 12 characters";
        }
  
        return error;
      },
      onSubmit: async (values) => {
        try {
          setButtonLoading(true);
  
          const createAcc = await axios.post(`${config.api}/auth/login`, values);
          if (createAcc.data.message === "Login Successfully") {
            localStorage.setItem("username", createAcc.data.otherDetails.name);

            toast.success(createAcc.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => formik.resetForm(), 3000);
            setButtonLoading(false);
  
            setTimeout(() => navigate("/home"), 5000);
  
            formik.resetForm();
          } else if (
            createAcc.data.message === "email or Password incorrect" ||
            "User does not exists"
) {
    toast.error(createAcc.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setButtonLoading(false);
         
          }
        } catch (error) {}
      },
    });
    const [passwordDispaly, setPasswordDisplay] = useState("Show");
  
    const [passwordType, setPasswordType] = useState("password");
    const changeType = () => {
      if (passwordType === "password") {
        setPasswordDisplay("Hide");
        setPasswordType("text");
      } else {
        setPasswordType("password");
        setPasswordDisplay("Show");
      }
    };
  
    const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <>
    <div>
      <form className="flex flex-col justify-center items-center forgap">
        <h3 className='h3'>LogIn</h3>
        <div className="Inputpair">
          <input
            className="Input"
            type="email"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id={`
                          ${formik.touched.email && formik.errors.email ? "error-box" : ""}
                          ${formik.touched.email && !formik.errors.email ? "success-box" : ""}
 
                          `}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="err">{formik.errors.email} </span>
          ) : null}
        </div>

        <div className="Inputpair">
          <div
            className="Input"
            id={`
                          ${formik.touched.password && formik.errors.password ? "error-box" : ""}
                          ${formik.touched.password && !formik.errors.password ? "success-box" : ""}

                          `}
          >
            <input
              className="InputPassword"
              type={passwordType}
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="InputPasswordSpan" onClick={changeType}>
              {passwordDispaly}
            </span>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <span className="err">{formik.errors.password} </span>
          ) : null}
        </div>
<div className='pdiv'>
<p className='fordisplay'><span>Email : </span>user@gmail.com </p>
<p  className='fordisplay'><span>Password : </span>12345678</p>
</div>


        <Link className="forlinks InputLink" to="signup">
          Don't have an account Sign up!
        </Link>
        <button
          onClick={formik.handleSubmit}
          type="submit"
          className="button InputButton"
        >
          {buttonLoading ? "Login" : "Login"}
        </button>

        <div></div>
      </form>
    </div>

    <ToastContainer
      transition={Flip}
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />


    
  </>
  )
}

export default Login