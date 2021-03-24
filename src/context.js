import React, { useCallback, useContext, useEffect, useState } from "react";

const urlDefault = "https://restcountries.eu/rest/v2/all";
const url = "https://restcountries.eu/rest/v2/name/";
const AppContext = React.createContext();

const getLocalStorage = () => {
  let darkTheme = localStorage.getItem("theme");
  if (darkTheme) return JSON.parse(localStorage.getItem("theme"));
  return false;
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [darkTheme, setDarkTheme] = useState(getLocalStorage());
  const [displayItems, setDisplayItems] = useState("");

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    try {
      if (searchTerm === "") {
        const response = await fetch(urlDefault);
        const data = await response.json();
        setCountries(data);
      } else {
        const response = await fetch(`${url}${searchTerm}`);
        const data = await response.json();
        data.status ? setCountries([]) : setCountries(data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCountries();
  }, [searchTerm, fetchCountries]);

  useEffect(() => {
    const handleFilter = () => {
      if (filter !== "All") {
        setFilteredCountries(countries.filter((el) => el.region === filter));
      } else {
        setFilteredCountries(countries);
      }
    };

    setDisplayItems(12);
    handleFilter();
  }, [countries, filter]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        filter,
        setFilter,
        countries,
        filteredCountries,
        searchTerm,
        setSearchTerm,
        darkTheme,
        setDarkTheme,
        displayItems,
        setDisplayItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
