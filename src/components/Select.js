import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useGlobalContext } from "../context";

const Select = () => {
  const { filter, setFilter } = useGlobalContext();
  const [showList, setShowList] = useState(false);
  const selectRef = useRef();
  const selectOptions = [
    "All",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ];

  const handleFilter = (value) => {
    setFilter(value);
    setShowList(false);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (!selectRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  });

  return (
    <div className="select-container" ref={selectRef}>
      <div className="select" onClick={() => setShowList(!showList)}>
        {filter !== "All" ? (
          <span className="active">{filter}</span>
        ) : (
          <span>Filter by Region</span>
        )}
        <FaChevronDown className={showList ? "arrow show" : "arrow"} />
      </div>
      <ul className={showList ? "select-list show" : "select-list"}>
        {selectOptions.map((option, id) => {
          return (
            <li
              key={id}
              className={
                filter === option ? "list-option option-active" : "list-option"
              }
              onClick={() => handleFilter(option)}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
