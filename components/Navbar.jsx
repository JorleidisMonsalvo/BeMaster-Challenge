import React from "react";
import Link from "next/link";
import { useStateContext } from "../context/StateContext";
import { GiFilmSpool } from "react-icons/gi";

const Navbar = () => {
  const { isLogged, userLogged, logOut } = useStateContext();
  userLogged()
  return (
    <div className="navbar-container">
      <Link href="/">
        <GiFilmSpool className="navbar-logo" />
      </Link>
      {!isLogged && (
        <>
          <Link href="/register">
            <a className="navbar-link">Registrarse</a>
          </Link>
          <Link href="/login" className="navbar-link">
            <a className="navbar-link">Iniciar sesión</a>
          </Link>
        </>
      )}
      {isLogged && (
        <>
        <Link href="/series/all">
          <a className="navbar-link">Series</a>
        </Link>
        <Link href="/movies/all" className="navbar-link">
          <a className="navbar-link">Peliculas</a>
        </Link>
        <Link href="/logout" className="navbar-link">
          <a className="navbar-link" onClick={logOut}>Cerrar sesión</a>
        </Link>
        
      </>
      )}
    </div>
  );
};

export default Navbar;
