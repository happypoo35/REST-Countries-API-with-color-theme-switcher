import { Link } from "react-router-dom";
import { FaRegMoon, FaSun } from "react-icons/fa";
import { useGlobalContext } from "../context";

const Header = () => {
  const { darkTheme, setDarkTheme } = useGlobalContext();

  return (
    <header className="header pad">
      <div className="container">
        <Link to="/" className="logo">
          <h1>Where in the world?</h1>
        </Link>
        <button className="dark-mode" onClick={() => setDarkTheme(!darkTheme)}>
          {darkTheme ? <FaSun /> : <FaRegMoon />}
          {darkTheme ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
};

export default Header;
