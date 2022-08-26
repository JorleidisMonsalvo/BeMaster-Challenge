import { useState, useEffect } from "react";
import { FaFilm, FaEnvelope, FaLock } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useRouter } from "next/router";
import { default as ReactSelect } from "react-select";
import Option from "../components/Option";
import axios from "axios";
import useForm from "../hooks/useForm";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [categories, setCategories] = useState(null);
  const [optionSelected, setOptionSelected] = useState(null);

  const { push } = useRouter();

  const formLogin = () => {
    console.log("El formulario ha sido enviado!");
    console.log("Form Values ", values);
  };

  //Custom hook call
  const { handleChange, values, errors, handleSubmit } = useForm(formLogin);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/genre/movie/list`,
      params: {
        api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
        language: "es",
      },
    }).then((response) => {
      let genres = response.data.genres.map((el) => {
        return {
          id: el.id,
          value: el.name,
          label: el.name,
        };
      });
      setCategories(genres);
    });
  }, []);

  const handleChangeLocal = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleDropdown = (selected) => {
    setOptionSelected(selected);
    console.log("os", optionSelected);
  };

  const registerUser = async () => {
    try {
      localStorage.setItem('categoriesUser', JSON.stringify(optionSelected));
      await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      push("/");
    } catch (error) {
      console.log("Este es el error", error);
      if (
        error.message === "FirebaseError: Firebase: Error (auth/invalid-email)."
      ) {
        // toast.error("Ingrese un correo electrónico valido.")
        window.alert("Ingrese un correo electrónico valido.");
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        window.alert("La contraseña debe contener al menos 6 carácteres.");
      } else {
        error;
      }
    }
  };

  return (
    <div className="register-form">
      <div className="register-card">
        <h2 className="title">
          Bienvenido a MediaPlus! <FaFilm />
        </h2>
        <span>Registra tu cuenta</span>
        <form onSubmit={registerUser}>
          <div className="form-item">
            <FaEnvelope className="icons" />
            <input
              name="email"
              type="email"
              placeholder="Ingresa tu correo"
              onChange={(e) => {
                handleChange;
                handleChangeLocal(e);
              }}
            />
            {errors.email && <h3>{errors.email}</h3>}
          </div>
          <div className="form-item">
            <FaLock className="icons" />
            <input
              minLength="6"
              type="password"
              name="password"
              placeholder="Ingresa una contraseña"
              onChange={(e) => {
                handleChange;
                handleChangeLocal(e);
              }}
            />
            {errors.password && <h3>{errors.password}</h3>}
          </div>
          <div>
            {categories && (
              <span
                className="d-inline-block"
                data-toggle="popover"
                data-trigger="focus"
                data-content="genres"
              >
                Por favor selecciona los 5 géneros que te gustan:
                <ReactSelect
                  options={categories}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{
                    Option,
                  }}
                  onChange={handleDropdown}
                  allowSelectAll={true}
                  value={optionSelected}
                />
              </span>
            )}
          </div>
          <div className="form-item">
            <button>Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
