import { IconButton } from "@mui/material";
import { Search, Person, Menu, Brightness4, Brightness7 } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";
import { useTheme } from '../contexts/ThemeContext'; // Asegura que useTheme esté importado

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); // Usar useTheme para el cambio de tema

  const iconColor = theme === 'dark' ? '#fff' : variables.darkgrey; // Define colores dinámicos basados en el tema
  const searchIconColor = theme === 'dark' ? '#fff' : variables.pinkred;

  return (
    <div className={`navbar ${theme}`}>  {/* Agregar clase dinámica basada en el tema */}
      <a href="/">
        <img src="/assets/logo01.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""} onClick={() => navigate(`/properties/search/${search}`)}>
          <Search sx={{ color: searchIconColor }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        <IconButton onClick={toggleTheme} sx={{ color: iconColor }}>
          {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        {user ? (
          <a href="/create-listing" className="host">
            Conviértete en un Hos
          </a>
        ) : (
          <a href="/login" className="host">
            Conviértete en un Hos
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: iconColor }} />
          {!user ? (
            <Person sx={{ color: iconColor }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Lista de viajes</Link>
            <Link to={`/${user._id}/wishList`}>Lista de deseos</Link>
            <Link to={`/${user._id}/properties`}>Lista de Sitos</Link>
            <Link to={`/${user._id}/reservations`}>Lista de reservas</Link>
            <Link to="/create-listing">Conviértete en anfitrión</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
