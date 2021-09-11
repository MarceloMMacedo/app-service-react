import "./navbar.css";
import "bootstrap/js/src/collapse.js"
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark  main-nav base-navbar">
      <div className="container-fluid">
        <a href="/" className="nav-logo-text">
          <h4  className="nav-logo-text">DS Catalog</h4>
        </a>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dscatalog-navbar"
          aria-controls="dscatalog-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <a className="bt">HOME</a>
            </li>
            <li>
              <a  className="bt">CATÁLOGO</a>
            </li>
            <li>
              <a className="bt">ADMIN</a>
            </li>
          </ul>
        </div>
      </div>
      <div className=" bt" >
         
            <>
              <span className="nav-username"> user_name </span>
              <a href="#logout" >
                LOGOUT
              </a>
            </> 
            <a >LOGIN</a>
        
        </div>
    </nav>
  );
};

export default Navbar;
