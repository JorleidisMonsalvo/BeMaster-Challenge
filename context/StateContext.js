import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../initFirebase";
import { useRouter } from "next/dist/client/router";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore/lite";
import axios from "axios";
const Context = createContext();

export const StateContext = ({ children }) => {
  const { push, pathname } = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const userLogged = () => {
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        let userLogged = user === null ? false : true;

        if (!userLogged) {
          push("/login");
        } else {
          setIsLogged(userLogged);
          setLoggedUser(user);
          getUserCategoriesFilter(db, user.uid);
          if (pathname === "/login" || pathname === "/register") {
            push("/");
          }
        }
      });

      axios({
        method: "get",
        url: `https://api.themoviedb.org/3/discover/movie`,
        params: {
          api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
          language: "es",
        },
      }).then((response) => {
        setMovies(response.data.results);
      });

      axios({
        method: "get",
        url: `https://api.themoviedb.org/3/discover/tv`,
        params: {
          api_key: process.env.NEXT_PUBLIC_MOVIE_API_KEY,
          language: "es",
        },
      }).then((response) => {
        setSeries(response.data.results);
      });
    }, []);
  };

  const getLocalCategories = async (user) => {
    let categories = JSON.parse(localStorage.getItem("categoriesUser"));
    setUserCategories(categories);
    if (categories && categories.length > 0) {
      await setDoc(doc(db, "userData", user.uid), {
        email: user.email,
        token: user.uid,
        categorias: categories,
      });
    }
  };

  const getCollectionFilter = async (db, collectionName, fieldName, filter) => {
    const coll = collection(db, collectionName);
    const q = query(coll, where(fieldName, "==", filter));
    const collSnapshot = await getDocs(q);
    let colData = [];
    collSnapshot._docs.map((doc) => {
      colData.push(doc.data());
    });
    return colData;
  };

  const getUserCategoriesFilter = async (db, filter) => {
    let data = await getCollectionFilter(db, "userData", "token", filter);
    
    if (data && data.length>0 ) {
      localStorage.setItem(
        "userCategories",
        JSON.stringify(data[0]?.categorias)
      );
      setUserCategories(data[0]?.categorias);
    }

    return data
    //setUserCategories(data[0]?.categorias)
  };

  /* const addNewDoc = async (db, collectionName, data) => {
    await addDoc(collection(db, collectionName), data)
  } */

  const logOut = async () => {
    try {
      signOut(auth);
      setIsLogged(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Context.Provider
      value={{
        isLogged,
        setIsLogged,
        userLogged,
        userCategories,
        setUserCategories,
        logOut,
        loggedUser,
        setLoggedUser,
        getUserCategoriesFilter,
        movies,
        series,
        getLocalCategories,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
