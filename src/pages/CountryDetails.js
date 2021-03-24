import { BsArrowLeft } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Border from "../components/Border";
import Loading from "../components/Loading";
const url = "https://restcountries.eu/rest/v2/name/";

const CountryDetails = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getCountry = async () => {
      try {
        const response = await fetch(`${url}${name}`);
        const data = await response.json();

        !data.status ? setCountry(data[0]) : setCountry(null);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCountry();
  }, [name]);

  if (loading) return <Loading />;

  if (!country) {
    return (
      <div className="empty-result">
        <h2>No country to display</h2>
        <Link to="/" aria-label="previous page">
          <button className="btn btn-back">
            <BsArrowLeft />
            Back
          </button>
        </Link>
      </div>
    );
  }

  const {
    flag,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = country;

  return (
    <section className="country-details">
      <Link to="/" aria-label="previous page">
        <button className="btn btn-back">
          <BsArrowLeft />
          Back
        </button>
      </Link>
      <article className="country-container" aria-label={name}>
        <img src={flag} alt={name} />
        <div className="info">
          <h2>{name}</h2>
          <div className="details-container">
            <ul className="details-col">
              <li>
                <p className="detail detail-country">
                  Native Name: <span>{nativeName}</span>
                </p>
              </li>
              <li>
                <p className="detail detail-country">
                  Population: <span>{population.toLocaleString()}</span>
                </p>
              </li>
              <li>
                <p className="detail detail-country">
                  Region: <span>{region}</span>
                </p>
              </li>
              <li>
                <p className="detail detail-country">
                  Sub Region: <span>{subregion}</span>
                </p>
              </li>
              <li>
                <p className="detail detail-country">
                  Capital: <span>{capital}</span>
                </p>
              </li>
            </ul>
            <ul className="details-col">
              <li>
                <p className="detail detail-country">
                  Top Level Domain:{" "}
                  <span>
                    {topLevelDomain.map((el, i) => {
                      if (i < topLevelDomain.length - 1) {
                        return `${el}, `;
                      } else {
                        return el;
                      }
                    })}
                  </span>
                </p>
              </li>
              <li>
                <p className="detail detail-country">
                  Currencies:{" "}
                  <span>
                    {currencies.map((el, i) => {
                      if (i < currencies.length - 1) {
                        return `${el.name}, `;
                      } else {
                        return el.name;
                      }
                    })}
                  </span>
                </p>
              </li>
              <li>
                <p className="detail detail-country">
                  Languages:{" "}
                  <span>
                    {languages.map((el, i) => {
                      if (i < languages.length - 1) {
                        return `${el.name}, `;
                      } else {
                        return el.name;
                      }
                    })}
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className="border">
            <p className="detail detail-country">Border Countries:</p>
            <div className="buttons">
              {borders.map((border, id) => {
                return <Border key={id} border={border} />;
              })}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default CountryDetails;
