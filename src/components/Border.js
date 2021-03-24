import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const url = "https://restcountries.eu/rest/v2/alpha/";

const Border = ({ border }) => {
  const [borderCountry, setBorderCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getBorder = async () => {
      try {
        const response = await fetch(`${url}${border}`);
        const data = await response.json();
        setBorderCountry(data.name);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getBorder();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading)
    return <button className="btn btn-border btn-loading">· · ·</button>;

  return (
    <Link to={`/country/${borderCountry}`}>
      <button className="btn btn-border">{borderCountry}</button>
    </Link>
  );
};

export default Border;
