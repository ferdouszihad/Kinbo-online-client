import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../../Shared/PageTitle/PageTitle";
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const url = "http://localhost:8000/api/user/signin";
    fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          toast.error(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          localStorage.setItem("token", `Bearer ${data.token}`);
          navigate("/home");
        }
      });
  };
  return (
    <div className="container d-flex justify-content-center my-5">
      <PageTitle title="Login"></PageTitle>
      <div className="col-md-6 shadow-sm p-3 mb-5 bg-body rounded">
        <h2 className="text-center py-3">Please Login</h2>
        <form onSubmit={handleLogin}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input type="email" class="form-control" name="email" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input type="password" class="form-control" name="password" />
          </div>

          <button type="submit" class="btn btn-warning">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
