import React from "react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
const PreviewCard = ({ img, title, votes, vote_count, type, id }) => {
  return (
    <Link href={`/${type}/${id}`}>
    <div className="card-preview">
      <img src={img} alt={title} />
      <div className="preview-container">
        <h4>
          <b>{title}</b>
        </h4>
        <p><FaStar style={{color:'yellow'}}/> Puntuación: {votes} ({vote_count} votos)</p>
      </div>
    </div>
    </Link>
  );
};

export default PreviewCard;
