import { Link } from "react-router-dom";

const Country = ({ flag, name, population, region, capital }) => {
  return (
    <Link to={`/country/${name}`} aria-label={name}>
      <article className="country" aria-label={name}>
        <div className="country-img">
          <img src={flag} alt={name} />
        </div>
        <div className="country-body">
          <h4>{name}</h4>
          <ul className="details">
            <li>
              <p className="detail">
                Population: <span>{population.toLocaleString()}</span>
              </p>
            </li>
            <li>
              <p className="detail">
                Region: <span>{region}</span>
              </p>
            </li>
            <li>
              <p className="detail">
                Capital: <span>{capital}</span>
              </p>
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
};

export default Country;
