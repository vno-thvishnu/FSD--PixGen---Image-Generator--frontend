import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../constants/Config'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import Loaderbtn from '../components/Loaderbtn';


const Signup = () => {
    const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
      },
      validate: (values) => {
        let error = {};
  
      
        if (values.name === "") {
          error.name = "please enter Last name";
        }
        if (
          values.name &&
          (values.name.length < 0 || values.name.length > 15)
        ) {
          error.name = "Name must be between 3 to 15 characters";
        }
        if (values.email === "") {
          error.email = "please enter Email";
        }
        if (
          values.email &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.email)
        ) {
          error.email = " please enter a valid Email";
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
        if (values.confirmpassword === "") {
          error.confirmpassword = "please enter Password again";
        }
        if (
          values.confirmpassword &&
          (values.confirmpassword.length <= 7 ||
            values.confirmpassword.length > 12)
        ) {
          error.confirmpassword = "Password must be between 8 to 12 characters";
        }
  
        if (
          values.password.length > 7 &&
          values.confirmpassword.length > 7 &&
          values.password.length < 13 &&
          values.confirmpassword.length < 13 &&
          values.password !== values.confirmpassword
        ) {
          error.confirmpassword = "Password not matching";
  
          error.password = "Password not matching";
        }
        return error;
      },
      onSubmit: async (values) => {
        try {
          setButtonLoading(true);
          const createAcc = await  axios.post(`${config.api}/auth/signup`, values);
  
          if (createAcc.data.message === "Registered Successfully") {
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
  
            setTimeout(() => navigate("/"), 5500);
          } else if (
            createAcc.data.message === "Email-id or Firstname already in use" ||
            "Email-id already in use" ||
            "Firstname already in use"
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
        } catch (error) {
          alert("error");
        }
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
  
    const [passwordDispalyTwo, setPasswordDisplayTwo] = useState("Show");
  
    const [passwordTypeTwo, setPasswordTypeTwo] = useState("password");
    const changeTypeTwo = () => {
      if (passwordTypeTwo === "password") {
        setPasswordDisplayTwo("Hide");
        setPasswordTypeTwo("text");
      } else {
        setPasswordTypeTwo("password");
        setPasswordDisplayTwo("Show");
      }
    };
    const [buttonLoading, setButtonLoading] = useState(false);
  

  return (
    <>
      <div >
        <form className="flex flex-col justify-center items-center forgap">
          <h3 className='h3'>SignUp</h3>
         
          <div className="Inputpair">
            <input
              className="Input"
              type="text"
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id={`
							${formik.touched.name && formik.errors.name ? "error-box" : ""}
							${formik.touched.name && !formik.errors.name ? "success-box" : ""}

							`}
            />
            {formik.touched.name && formik.errors.name ? (
              <span className="err">{formik.errors.name} </span>
            ) : null}
          </div>

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
              <span onClick={changeType} className="InputPasswordSpan">
                {passwordDispaly}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <span className="err">{formik.errors.password} </span>
            ) : null}
          </div>
          <div className="Inputpair">
            <div
              className="Input"
              id={`
							${
                formik.touched.confirmpassword && formik.errors.confirmpassword
                  ? "error-box"
                  : ""
              }
							${
                formik.touched.confirmpassword && !formik.errors.confirmpassword
                  ? "success-box"
                  : ""
              }

							`}
            >
              <input
                className="InputPassword"
                type={passwordTypeTwo}
                placeholder="Confirm Password"
                name="confirmpassword"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span onClick={changeTypeTwo} className="InputPasswordSpan">
                {passwordDispalyTwo}
              </span>
            </div>
            {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
              <span className="err">{formik.errors.confirmpassword} </span>
            ) : null}
          </div>

          <Link className="forlinks InputLink" to="/">
            Already have an account. Login!
          </Link>
          <button
            onClick={formik.handleSubmit}
            type="submit"
            className="button InputButton"
          >
            {buttonLoading ? 
          <><Loaderbtn/></> 
            
            : "Create"}
          </button>
        </form>
      </div>

      <ToastContainer
        transition={Flip}
        position="top-center"
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

export default Signup