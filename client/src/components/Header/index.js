import React, { useContext } from "react"; //willis
import { Link } from "react-router-dom";
import "../../assets/style.css";
import Logo from "../../images/logo.png";
import Auth from "../../utils/auth";
import { ThemeContext } from "../Theme/themeContext"; //willis
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; //willis
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //willis


const Header = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className={`header ${theme}`}>  {/*willis*/}
      <header className="nav mb-4 py-3">
        <div className="container-fluid flex-row justify-space-between">
          <div>
            <Link className="navbar-brand text-light" to="/">
              <img src={Logo} className="logo" alt=""></img>
              <h1 className="name navbar-expand-lg fw-bold ml-5">Bark Buddy</h1>
            </Link>
          </div>
          <div>
            {/* Not need to be logged-in */}
            <Link className="link m-4 fw-bolder" to="/Videos">
              Videos
            </Link>

            {/* MUST be logged-in */}
            {Auth.loggedIn() ? (
              <>
                <Link className="link m-4 fw-bolder" to="/favorites">
                  Favorites
                </Link>
                <Link className="link m-4 fw-bolder" to="/search">
                  Pick A Pooch
                </Link>
                <Link className="link m-4 fw-bolder" to="/quiz">
                  Dog Quiz
                </Link>
                <Link className="link m-4 fw-bolder" to="/donation">
                  Shelter Donation
                </Link>
                <Link className="link m-4 fw-bolder" to="/shelter">
                  Find a Shelter
                </Link>
                <Link className="link m-4 fw-bolder" to="/me">
                  {Auth.getProfile().data.username}'s Profile
                </Link>
                <button className="btn btn-lg m-2 fw-bolder" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="link m-4 fw-bolder" to="/home">
                  Home
                </Link>
                <Link className="link m-4 fw-bolder" to="/search">
                  Pick a Pooch
                </Link>
                <Link className="link m-4 fw-bolder" to="/quiz">
                  Dog Quiz
                </Link>
                <Link className="link m-4 fw-bolder" to="/me">
                  Shelter Donation
                </Link>
                <Link className="link m-4 fw-bolder" to="/me">
                  Find a Shelter
                </Link>
                <Link className="btn btn-lg m-2 fw-bolder" to="/login">
                  Login
                </Link>
                <Link
                  className="btn btn-lg my-3 mr-5 ml-3 fw-bolder"
                  to="/signup"
                >
                  Signup
                </Link>
              </>

            )}
          </div>
        </div>
      </header>
      <div>
        <button onClick={toggleTheme}>
          {theme === 'light' ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </button>

      </div>
    </div> //willis
  );
};

export default Header;
