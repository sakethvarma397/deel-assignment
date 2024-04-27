import React from "react";
import { Option } from "./Autocomplete";

type TSProps = {
  results: Option[];
  searchString: string;
  handleClick: (term: string) => void;
  selectedIndex: number;
  loading: boolean;
};
function Results(props: TSProps) {
  const { results, searchString, handleClick, selectedIndex, loading } = props;

  const renderResults = () => {
    return results.map((item: Option, index: number) => {
      const match = searchString.toLowerCase();
      const startIndex = item.value.toLowerCase().indexOf(match);
      const endIndex = startIndex + match.length;

      return (
        <li
          key={item.id}
          onClick={() => handleClick(item.value)}
          className={selectedIndex === index ? "active" : ""}
        >
          {item.value.substring(0, startIndex)}
          <b>{item.value.substring(startIndex, endIndex)}</b>
          {item.value.substring(endIndex)}
        </li>
      );
    });
  };

  return (
    <ul className="results-container">
      {loading && <li>...</li>}
      {!loading && renderResults()}
    </ul>
  );
}

export default Results;
