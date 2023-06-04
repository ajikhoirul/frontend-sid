import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import Alert from "react-bootstrap/Alert";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const isValid = validateInput();
  //   if (isValid) {
  //     // Lakukan aksi yang diinginkan
  //   }
  // };

  // const validateInput = () => {
  //   let isValid = true;
  //   let errorMsg = "";

  //   if (email.trim() === "") {
  //     isValid = false;
  //     errorMsg += "Email is required\n";
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     isValid = false;
  //     errorMsg += "Email is invalid\n";
  //   }

  //   if (password.trim() === "") {
  //     isValid = false;
  //     errorMsg += "Password is required\n";
  //   } else if (password.length < 5) {
  //     isValid = false;
  //     errorMsg += "Password must be at least 5 characters\n";
  //   }

  //   setError(errorMsg);
  //   return isValid;
  // };
  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a className="h1">
              <b>Admin</b>DESA
            </a>
          </div>
          <div className="card-body login-card-body">
            <p className="login-box-msg">Silahkan login terlebih dahulu...</p>
            {isError && <Alert variant="danger">{message}</Alert>}
            <form onSubmit={Auth}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div class="card-footer bg-transparent border-primary">
                    <button type="submit" className="btn btn-block btn-primary">
                      {isLoading ? "Loading..." : "Login"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
