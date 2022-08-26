import { useState, useEffect } from "react";
import { FaFilm, FaEnvelope, FaLock } from "react-icons/fa";
import { useRouter } from "next/dist/client/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../initFirebase";
import Notification from "./Notification";
import { useStateContext } from "../context/StateContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { setLoggedUser, getUserCategoriesFilter, getLocalCategories } = useStateContext();
  
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  
  const { push } = useRouter();
  

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  
  const showSnackbar = (m) => {
    setMessage(m);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const loginUser = async () => {
    try {
      let res = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      let user = res.user;
      let locals = await getUserCategoriesFilter(db, user.uid)
      console.log(locals)
      if(locals.length <=0 || !locals) await getLocalCategories(user)
      setLoggedUser(user)
      push("/");
    } catch ({message}) {
      
      if (message === "Firebase: Error (auth/wrong-password).") {
        showSnackbar("Contraseña incorrecta");
      } else if(message==='Firebase: Error (auth/invalid-email).'){
        showSnackbar("Email inválido");
      }
    }
  };

  return (
    <div className="register-form">
      <Notification show={showNotification} message={message} />
      <div className="register-card">
        <h2 className="title">
          Bienvenido a MediaPlus! <FaFilm />
        </h2>
        <span>Iniciar sesión</span>
        <div className="form-item">
          <FaEnvelope className="icons" />
          <input
            name="email"
            type="email"
            placeholder="Ingresa tu correo"
            onChange={handleChange}
          />
        </div>
        <div className="form-item">
          <FaLock className="icons" />
          <input
            name="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
          />
        </div>
        
        <div className="form-item">
          <button onClick={loginUser}>Iniciar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
