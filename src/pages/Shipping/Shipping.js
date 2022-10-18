import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const navigate  = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
       const url = `http://localhost:8000/api/user/update`;
       fetch(url,{
        method:"PATCH",
        headers:{
          'Content-Type':'Application/json',
          'Authorization':localStorage.getItem('token')
        },
        body:JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(data => {
         if(data.status){
            navigate('/checkout')
         }
      })
  }

  let active = false;
  if (window.location?.pathname === "/shipping") {
    active = true;
  }

  return (
    <div className="mt-5 mb-3">
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li class={`breadcrumb-item ${active ? "bg-warning" : ""}`}>
            Shipping
          </li>
        </ol>
      </nav>
      <h2 className="text-center">Shipping Address</h2>
      <div className="row">
        <div className="col-md-7 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
            <div>
              <label for="inputPassword4" className="form-label">
                Name
              </label>
              <input
                type="name"
                {...register("name", { required: "Name is required" })}
                className="form-control"
              />
              {errors.name && (
                <p className="text-danger my-2">{errors.name?.message}</p>
              )}
            </div>
            <div className="col-12">
              <label for="inputAddress" className="form-label">
                Address 1
              </label>
              <input
                type="text"
                {...register("address1", { required: "Address1 is required" })}
                name="address1"
                className="form-control"
              />
              {errors.address1 && (
                <p className="text-danger my-2">{errors.address1?.message}</p>
              )}
            </div>
            <div className="col-12">
              <label for="inputAddress2" className="form-label">
                Address 2
              </label>
              <input
                type="text"
                {...register("address2", { required: "Address2 is required" })}
                name="address2"
                className="form-control"
              />
              {errors.address2 && (
                <p className="text-danger my-2">{errors.address2?.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <label for="inputCity" className="form-label">
                City
              </label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                name="city"
                className="form-control"
              />
              {errors.city && (
                <p className="text-danger my-2">{errors.city?.message}</p>
              )}
            </div>
            <div className="col-md-4">
              <label for="inputState" className="form-label">
                State
              </label>
              <select
                name="state"
                {...register("state", { required: "State is required" })}
                className="form-select"
              >
                <option selected>Khulna</option>
                <option>Cumilla</option>
              </select>
              {errors.state && (
                <p className="text-danger my-2">{errors.state?.message}</p>
              )}
            </div>
            <div className="col-md-2">
              <label for="inputZip" className="form-label">
                Zip
              </label>
              <input
                type="text"
                {...register("zip", { required: "Zip is required" })}
                name="zip"
                className="form-control"
              />
              {errors.zip && (
                <p className="text-danger my-2">{errors.zip?.message}</p>
              )}
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-warning">
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
