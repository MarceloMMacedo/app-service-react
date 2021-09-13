
import { useHistory } from 'react-router-dom';



const ForgotPassword = () => {
  
    const history = useHistory();
    const handleClick = () => history.push('/login');
    
  return (
    <main className="main" id="top">
      <div className="container" data-layout="container">
        <div className="row flex-center min-vh-100 py-6 text-center">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <a className="d-flex flex-center mb-4">
             
              <span className="font-sans-serif fw-bolder fs-5 d-inline-block">
              Digital Serviços
              </span>
            </a>
            <div className="card">
              <div className="card-body p-4 p-sm-5">
                <h5 className="mb-0">Forgot your password?</h5>
                <small>Enter your email and we'll send you a reset link.</small>
                <form className="mt-4">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email address"
                  />
                  <div className="mb-3">
                    <button
                      className="btn btn-primary d-block w-100 mt-3"
                      type="submit"
                      name="submit"
                    >
                      Send reset link
                    </button>
                  </div>
                </form>
                <a className="fs--1 text-600"  onClick={handleClick}>
                  I can't recover my account using this page
                  <span className="d-inline-block ms-1">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
