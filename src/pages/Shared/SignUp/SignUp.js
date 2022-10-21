import React from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const handleSignUp = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const url = "http://localhost:8000/api/user/signup";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          toast.error(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.success("Signup done", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  return (
    <div className="container d-flex justify-content-center my-5">
      <div className="col-md-6 shadow-sm p-3 mb-5 bg-body rounded">
        <h2 className="text-center py-3">Please Signup</h2>
        <form onSubmit={handleSignUp}>
          <div class="mb-3">
            <label for="exampleInputname1" class="form-label">
              Name
            </label>
            <input type="text" class="form-control" name="name" />
          </div>
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
