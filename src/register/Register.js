// import React, { useEffect, useState } from 'react'
// import style from './Register.module.css'
// import profile from '../profile.png'
// import { useNavigate } from 'react-router-dom'

// function Register() {

//     const navigate = useNavigate()
//     const [formValues, setFormValues] = useState({ name: "", email: "", password: "" });
//     const [formErrors, setFormErrors] = useState({});
//     const [isSubmit, setIsSubmit] = useState(false);

//     const handleChange = (e) => {
//         setFormValues({ ...formValues, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {

//         e.preventDefault();
//         setFormErrors(validate(formValues));
//         setIsSubmit(true);
//     };

//     useEffect(() => {
//         if (Object.keys(formErrors).length === 0 && isSubmit) {
//             let userList = JSON.parse(localStorage.getItem("registeredUserList")) || []
//             userList.push(formValues)
//             localStorage.setItem("registeredUserList", JSON.stringify(userList))
//             navigate("../login/Login")
//         }
//     }, [formErrors, isSubmit, formValues, navigate]);

//     const validate = (values) => {
//         const errors = {};

//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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

//         if (!values.email) {
//             errors.email = "*Email is required!";
//         } else if (!regex.test(values.email)) {
//             errors.email = "*This is not a valid email format!";
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
//                     {Object.keys(formErrors).length === 0 && isSubmit ? (<div style={{ color: "green" }}>Registered successfully</div>) : null}
//                     <div className={style.img}>
//                         <div className={style.containerImg}>
//                             <img className={style.profile} src={profile} alt='profile' />
//                         </div>
//                     </div>

//                     <input className={style.user} type="text" name="name" placeholder="Username" value={formValues.name} onChange={handleChange} />
//                     <p style={{ color: "red" }}>{formErrors.name}</p>

//                     <input className={style.email} type="text" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} />
//                     <p style={{ color: "red" }}>{formErrors.email}</p>

//                     <input className={style.pass} type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
//                     <p style={{ color: "red" }}>{formErrors.password}</p>
//                     <div className={style.btn}>
//                         <button>Register</button>
//                     </div>

//                 </div>
//             </form>
//         </>
//     )
// }

// export default Register


import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css"

const Register = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState({});
  const [userdata, setUserdata] = useState(
    JSON.parse(localStorage.getItem("userdata")) || []
  );
  const [isuserPresent, setIsuserPresent] = useState(false);
  const [isregister, setIsregister] = useState(false);
  
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsuserPresent(false);
    setIsregister(false);

    

    const error = Validation(formValues);
    if (Object.keys(error).length === 0) {
      const result = userFind(formValues.email);

      if (result) {
        setIsuserPresent(true);

        return;
      }

      setUserdata([...userdata, formValues]);
      localStorage.setItem(
        "userdata",
        JSON.stringify([...userdata, formValues])
      );
      setIsregister(true);

      setFormValues({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setError({});
    } else {
      setError(error);
    }
  };

  const Validation = (values) => {
  
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "username is required !";
    }

    if (!values.email) {
      errors.email = "email is required !";
    } else if (!regex.test(values.email)) {
      errors.email = "this is not valid email";
    }

    if (!values.password) {
      errors.password = "Password is required !";
    } else if (values.password.length < 6) {
      errors.password = "Password should be greater than 6 character";
    } else if (values.password.length > 16) {
      errors.password = "Password should be less than 16 character";
    } else if (
      values.password.includes(123) ||
      values.password.includes(1234) ||
      values.password.includes(123456) ||
      values.password.includes(12345678)
    ) {
      errors.password = "Password should be Unique";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "confirm Password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password doesn't match";
    }

    return errors;
  };

  const userFind = (email) => {
    const data = userdata;

    let result = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].email == email) {
        result = true;
        break;
      }
    }
    return result;
  };

  return (
    <div className={styles.main} >
    
      <form className={styles.form} onSubmit={handelSubmit}>
      <h1>Register Here...</h1>
        <label  htmlFor="username"> UserName:</label>
        <input
          onChange={handelChange}
          value={formValues.username}
          type="text"
          name="username"
        />

        <p className={styles.errorMessage}>{error.username}</p>
        <label htmlFor="email">Email:</label>
        <input
          onChange={handelChange}
          value={formValues.email}
          type="text"
       
          name="email"
        />
        <p className={styles.errorMessage}>{error.email}</p>

        <label htmlFor="password">Password:</label>
        <input
          onChange={handelChange}
          value={formValues.password}
          type="password"
        
          name="password"
        />
        <p className={styles.errorMessage}>{error.password}</p>

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          onChange={handelChange}
          value={formValues.confirmPassword}
          type="password"
         
          name="confirmPassword"
        />
        <p className={styles.errorMessage}>{error.confirmPassword}</p>

        <button type="submit" className={styles.Register}>
          Register
        </button>
        <h3>
        Already have an account? <Link className={styles.spanlogin} to="/login">Login</Link>
      </h3>
      <h2>{isuserPresent ? "User Already exits please login" : ""}</h2>
      <h2>{isregister ? "Registration succesfully" : ""}</h2>
      </form>
      <div>
      <img className={styles.sideimg} src="https://w.forfun.com/fetch/f3/f35aac2c75b8684e84207ea303634e41.jpeg?h=900&r=0.5" alt="demo"  />
     </div>
      
    </div>
  );
};

export default Register;