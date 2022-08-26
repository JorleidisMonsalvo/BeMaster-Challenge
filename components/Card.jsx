import Link from "next/link";
import { MdMovieFilter } from "react-icons/md";

const Card = ({ nombre, id }) => {
  return (
    <div>
      <Link href={`/categoria/${nombre}=${id}`}>
        <div className="card">
          <div className="card-icon">
            {/* <MdMovieFilter style={{fontSize:'150px', color:'white'}}/> */}
            <p className="card-name">{nombre}</p>
          </div>
          {/* <p className="card-name">{nombre}</p> */}
        </div>
      </Link>
    </div>
  );
};

export default Card;
