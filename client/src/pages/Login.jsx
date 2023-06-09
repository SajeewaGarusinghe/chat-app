import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/apiRoutes';

const Login = () => {
  const [values, setValues] = useState({
    userName: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const inputHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(values);
  };
  const validateHandler = () => {
    const { userName, password } = values;
    if (userName === '') {
      toast.error('Username required', toastOptions);
      return false;
    } else if (password === '') {
      toast.error('Password required', toastOptions);
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateHandler()) {
      const { userName, password } = values;
      const { data } = await axios.post(loginRoute, {
        userName,
        password,
      });
      // console.log("data",data);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={submitHandler}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Chat-app</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="userName"
            value={values.userName}
            min="3"
            onChange={(e) => {
              inputHandler(e);
            }}
          />

          <input
            type="password"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={(e) => {
              inputHandler(e);
            }}
          />

          <button type="submit">Login User</button>
          <span>
            Don't have an account ?<Link to="/register"> Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
  img {
    height: 5rem;
  }
  h1 {
    color: palevioletred;
    text-transform: uppercase;
    font-size: 2.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;

    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      text-decoration: none;
      color: #4e0eff;
      text-transform: none;
      font-weight: bold;
    }
  }

  /* font-size: 1.5em; */
  /* text-align: center; */
`;
export default Login;
