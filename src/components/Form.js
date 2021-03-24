import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../context";
import Select from "./Select";

const Form = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();
  const searchValue = useRef("");

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const searchCountry = () => {
    setSearchTerm(searchValue.current.value);
  };

  return (
    <section className="search" aria-label="search section">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-container">
          <input
            type="text"
            autoComplete="off"
            placeholder="Search for a country..."
            aria-label="search field"
            ref={searchValue}
            value={searchTerm}
            onChange={searchCountry}
          />
          <FaSearch />
        </div>
        <Select />
      </form>
    </section>
  );
};

export default Form;
