import React, { useEffect, useState } from "react";
import useStore from "../../store/store";
import TagInput from "../Tag/Tag";
import { useQuery } from "react-query";
import axios from "axios";
import styles from "./Calc.module.css";
import { motion } from "framer-motion";

export const MyComponent = ({ isVisible }) => (
  <motion.div animate={{ opacity: isVisible ? 1 : 0 }} />
);

const FormulaEditor = () => {
  const { formula, setFormula, suggestionsList, setSuggestions } = useStore();
  const [inputValue, setInputValue] = useState("");

  const fetchSuggest = async () => {
    const { data } = await axios.get(
      "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
    );
    return data;
  };

  const { data } = useQuery("suggestions", fetchSuggest);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setFormula([...formula, inputValue]);
      setInputValue("");
    }
  };
  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  return (
    <div className={styles.calc}>
      {formula.map((tag, index) => (
        <TagInput key={index} tag={tag} index={index} />
      ))}
      <input
        type="text"
        placeholder="Text tag..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {inputValue.length !== 0 && (
        <ul className={styles.suggests}>
          {suggestionsList
            .filter((item) =>
              item.value
                .toString()
                .toLowerCase()
                .includes(inputValue.toString().toLowerCase())
            )
            .map((item) => (
              <li
                onClick={() => {
                  setInputValue(item.value);
                  setFormula([...formula, inputValue]);
                }}
                key={item.id}
              >
                {item.value}
              </li>
            ))}
          {!suggestionsList.some((item) =>
            item.value
              .toString()
              .toLowerCase()
              .includes(inputValue.toString().toLowerCase())
          ) && <li>No suggestions found</li>}{" "}
        </ul>
      )}
    </div>
  );
};
export default FormulaEditor;
