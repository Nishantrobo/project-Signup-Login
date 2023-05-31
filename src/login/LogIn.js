// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import style from './LogIn.module.css'
// import profile from '../profile.png'

// function LogIn() {
//     const navigate = useNavigate()
//     const initialValues = { name: "", password: "" };
//     const [formValues, setFormValues] = useState(initialValues);
//     const [formErrors, setFormErrors] = useState({});
//     const [isSubmit, setIsSubmit] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues({ ...formValues, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setFormErrors(validate(formValues));
//         setIsSubmit(true);

//         const loggedUser = JSON.parse(localStorage.getItem("registeredUserList"))
//         const found = loggedUser.find(user => user.name === formValues.name && user.password === formValues.password)
//         if (found) {
//             alert(`Welcome ${found.name}`)
//             navigate("../about/About")
//         }
//         else {
//             alert("wrong Credentials")
//         }

//     };

//     useEffect(() => {
//         if (Object.keys(formErrors).length === 0 && isSubmit) {
//         }
//     }, [formErrors, isSubmit]);

//     const validate = (values) => {
//         const errors = {};
//         var inValid = /\s/;
//         if (inValid.test(values.name)) {
//             errors.name = "*username name wouldn't have whiteSpace"
//         }
//         else if (inValid.test(values.email)) {
//             errors.email = "*email wouldn't have whiteSpace"
//         }
//         else if (inValid.test(values.password)) {
//             errors.password = "*password wouldn't have whiteSpace"
//         }

//         if (!values.name) {
//             errors.name = "*Username is required!";
//         }

//         if (!values.password) {
//             errors.password = "*Password is required";
//         } else if (values.password.length < 8) {
//             errors.password = "*Password must be more than 8 characters";
//         } else if (values.password.length > 10) {
//             errors.password = "*Password cannot exceed more than 10 characters";
//         }
//         return errors;
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <div className={style.outer}>
//                     {Object.keys(formErrors).length === 0 && isSubmit ? (<div style={{ color: "green" }}>Signed in successfully</div>) : null}
//                     <div className={style.img}>
//                         <div className={style.containerImg}>
//                             <img className={style.profile} src={profile} alt='profile' />
//                         </div>
//                     </div>
//                     <input className={style.user} type="text" name="name" placeholder="Username" value={formValues.name} onChange={handleChange} />
//                     <p style={{ color: "red" }}>{formErrors.name}</p>
//                     <input className={style.pass} type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
//                     <p style={{ color: "red" }}>{formErrors.password}</p>
//                     <div className={style.btn}>
//                         <p>Don't have an account?<br /><Link to='/register/Register'>Register</Link></p>
//                         <button>Login</button>
//                     </div>
//                 </div>
//             </form>
//         </>
//     )
// }

// export default LogIn

import React, { useRef, useState } from "react";
import styles from "./LogIn.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const obj = {
    email: "",
    password: "",
  };

  const [errors, setErrors] = useState({});
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("userdata")) || []
  );
  const [isUser, setIsuser] = useState("");
  const [formValues, setFormValues] = useState(obj);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    obj[name] = value;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //   console.log(formValues)

  const handlesubmit = (e) => {
    e.preventDefault();
    const error = validate(formValues);
    if (Object.keys(error).length !== 0) {
      setErrors(error);

      return;
    }

    const user = FindUser(data);
    if (user) {
      setIsuser("Login SuccesFully");
      setTimeout(() => {
        Navigate("/");
      }, 2500);
    } else {
      setIsuser("something went wrong");
    }

    setFormValues(obj);
  };

  const validate = (validate) => {
    const error = {};
    const email = validate.email;
    const password = validate.password;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      error.email = "email is required !";
    } else if (!regex.test(email)) {
      error.email = "this email is not valid !";
    }

    if (!password) {
      error.password = "Password is required !";
    } else if (password.length < 6) {
      error.password = "Password should be greater than 6";
    } else if (password.length > 16) {
      error.password = "password should be less than 16";
    }

    return error;
  };

  const FindUser = (data) => {
    const value = data.find(
      (user) =>
        user.email === formValues.email && user.password === formValues.password
    );
    return value;
  };

  return (
    <div className={styles.loginMian}>
      <img
        className={styles.sideimg}
        src="https://w.forfun.com/fetch/0b/0bc739968eeb709d8eebbdb132141cb8.jpeg?h=900&r=0.5"
        alt="demo"
      />

      <form className={styles.loginContainer} onSubmit={handlesubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email:</label>
        <input
          value={formValues.email}
          onChange={handleChange}
          type="text"
          name="email"
        />
        <p>{errors.email}</p>
        <label htmlFor="password">Password:</label>
        <input
          value={formValues.password}
          onChange={handleChange}
          type="password"
          name="password"
        />
        <p>{errors.password}</p>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
        <h3>
          Don't have an account?{" "}
          <Link className={styles.spanlogin} to="/register">
            Register
          </Link>
        </h3>
        <h1>{isUser}</h1>
      </form>
    </div>
  );
};

export default Login;
