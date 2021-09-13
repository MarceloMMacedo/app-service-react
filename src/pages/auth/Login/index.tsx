 
import { BrowserRouter, Link, NavLink, Redirect, Route, Router } from "react-router-dom";
 
import ForgotPassword from "../ForgotPassword";
 const Login=()=>{ 
    const forgot=ForgotPassword;
  return (
    <main className="main" id="top">
      <div className="container" data-layout="container">
        <div className="row flex-center min-vh-100 py-6">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <a className="d-flex flex-center mb-4">
              
              <span className="font-sans-serif fw-bolder fs-5 d-inline-block">
                Digital Serviços
              </span>
            </a>
            <div className="card">
              <div className="card-body p-4 p-sm-5">
                <div className="row flex-between-center mb-2">
                  <div className="col-auto">
                    <h5>Log in</h5>
                  </div>
                </div>
                <form>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="row flex-between-center">
                    <div className="col-auto">
                    
                     
                        <a href="/forgot-pass" className="fs--1">
                          Forgot Password?
                        </a> 
                    </div>
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary d-block w-100 mt-3"
                      type="submit"
                      name="submit"
                    >
                      Log in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
