import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

const initialState = {
    username: "",
    password: "",
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [form, setForm] = useState(initialState)
    const history = useHistory()

    const login = (e) => {
        e.preventDefault()
        console.log(form)
        Axios.post("http://localhost:5000/api/login", form)
            .then(res=> {
                console.log(res.data)
                localStorage.setItem('token', res.data.payload)
                history.push('/bubble-hub')
            })
            .catch(err=>console.dir(err))
    }

    const handleChange = e => {
        setForm({...form, [e.target.name]:e.target.value})
    }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <form onSubmit={(e)=>login(e)} >
          <input type="text" name="username" value={form.username} onChange={handleChange} />
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          <input type="submit" value="Login" />
        </form>
      </div>

    </>
  );
};

export default Login;
