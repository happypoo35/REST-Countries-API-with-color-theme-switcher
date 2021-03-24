import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="empty-result">
      <h2>This page doesn't exist</h2>
      <Link to="/" aria-label="previous page">
        <button className="btn btn-back">
          <BsArrowLeft />
          Back
        </button>
      </Link>
    </div>
  );
};

export default Error;
