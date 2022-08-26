import { useStateContext } from "../context/StateContext";
import HomeUser from "../components/Home";
import Login from "../components/Login";
export default function Home() {
  const { isLogged } = useStateContext();
  return <div>{isLogged ? <HomeUser /> : <Login />}</div>;
}
