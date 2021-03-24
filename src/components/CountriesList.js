import { useEffect } from "react";
import { useGlobalContext } from "../context";
import Country from "./Country";
import Loading from "./Loading";

const CountriesList = () => {
  const {
    filteredCountries,
    loading,
    displayItems,
    setDisplayItems,
  } = useGlobalContext();

  useEffect(() => {
    const checkHeight = () => {
      const d = document.documentElement;
      const offset = d.scrollTop + window.innerHeight + 100;
      const height = d.offsetHeight;
      const itemsPerPage = 12;

      if (offset >= height) {
        console.log("At the bottom");
        setDisplayItems(displayItems + itemsPerPage);
      }
    };
    window.addEventListener("scroll", checkHeight);
    return () => {
      window.removeEventListener("scroll", checkHeight);
    };
  }, [displayItems, setDisplayItems]);

  if (loading) return <Loading />;

  if (filteredCountries.length < 1) {
    return (
      <div className="empty-result">
        <h2>No countries matched your search criteria</h2>
      </div>
    );
  }

  return (
    <section className="countries" aria-label="countries list">
      {filteredCountries.map((el, index) => {
        if (index < displayItems)
          return <Country key={el.numericCode} {...el} />;
        return "";
      })}
    </section>
  );
};

export default CountriesList;
