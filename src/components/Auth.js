import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/authContext";


const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  let authCtx = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault();

    

    register
      ? axios
          .post("http://localhost:5312/register", {
            username,
            password,
          })
          .then((res) => {
            console.log(res.data)

            const {userId, token, exp} = res.data

            authCtx.login(token, exp, userId)
          })
          .catch((err) => {
            alert('There was a problem with registering new user')
            console.log(err);
            setPassword('')
            setUsername('')
          })
      : axios
          .post("http://localhost:5312/login", {
            username,
            password,
          })
          .then((res) => {
            const {userId, token, exp} = res.data

            authCtx.login(token, exp, userId)
            
          })
          .catch((err) => {
            console.log(err);
            setPassword('')
            setUsername('')
            alert('There was a problem with logging in')
          });

    console.log("submitHandler called");
  };

  const setRegisterHandler = () => {
    setRegister(!register);
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          value={username}
          placeholder="username"
          type="text"
          className="form-input"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          value={password}
          placeholder="password"
          type="text"
          className="form-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={setRegisterHandler}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
