import React, { useCallback, useEffect, useState } from "react";
import "./Autocomplete.css";
import Results from "./Results";

export type Option = {
  id: number;
  value: string;
};

const mockData: Option[] = [
  { id: 1, value: "Apple" },
  { id: 2, value: "Banana" },
  { id: 3, value: "Cherry" },
  { id: 4, value: "Date" },
  { id: 5, value: "Elderberry" },
  { id: 6, value: "Fig" },
  { id: 7, value: "Grape" },
  { id: 8, value: "Honeydew" },
  { id: 9, value: "Kiwi" },
  { id: 10, value: "Lemon" },
  { id: 11, value: "A pricot" },
  { id: 12, value: "Apricot" },
  { id: 13, value: "Ap ricot" },
];

const MOCK_OPTIONS_API_DELAY = 500;
const MOCK_FILTER_API_DELAY = 400;

const fetchMockOptionsAPI = () => {
  return new Promise<Option[]>((resolve) => {
    setTimeout(() => resolve(mockData), MOCK_OPTIONS_API_DELAY);
  });
};

function Autocomplete() {
  const [searchString, setSearchString] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // To keep track of the latest search string
  const lastRequest = React.useRef("");

  const container = React.useRef<HTMLDivElement>(null);

  // Mock API call to load the initial data
  useEffect(() => {
    fetchMockOptionsAPI().then((results) => {
      setOptions(results);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (container.current && !container.current.contains(event?.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    const filterData = async (term: string, data: Option[]) => {
      lastRequest.current = term;
      setLoading(true);
      setFilteredOptions([]);

      // Simulating the API call. This can be replaced by an API call eventually
      await new Promise((resolve) =>
        setTimeout(resolve, MOCK_FILTER_API_DELAY)
      );

      // The prev search string maybe outdated by the time the API is resolved.
      // So we show the result only for the latest fetch by comparing it with the ref.
      // If required, we can reduce these redundant fetches by debouncing the filterOptions function.
      if (lastRequest.current === term) {
        const filtered = data.filter((item) => {
          return item.value.toLowerCase().includes(term.toLowerCase());
        });
        setFilteredOptions(filtered);
      }

      setLoading(false);
    };
    filterData(searchString, options);
  }, [searchString, options]);

  // Handles the input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShowResults(true);
    setSearchString(e.target.value);
  }, []);

  // Handles the click on any result
  const handleClick = useCallback(
    (term: string) => {
      if (searchString !== term) {
        setSearchString(term);
      }
    },
    [searchString]
  );

  // TODO: Scroll to view
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowUp" && selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1);
      } else if (
        e.key === "ArrowDown" &&
        selectedIndex < filteredOptions.length - 1
      ) {
        setSelectedIndex((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        const selected = filteredOptions[selectedIndex].value;
        setSearchString(selected);
        setSelectedIndex(-1);
      }
    },
    [selectedIndex, filteredOptions]
  );

  const handleFocus = useCallback(() => {
    setShowResults(true);
  }, []);

  // TODO: Styling
  return (
    <div className="autocomplete-container" ref={container}>
      <input
        type="text"
        value={searchString}
        onChange={handleChange}
        placeholder="Type here.."
        onKeyDown={handleKeyDown}
        onClick={handleFocus}
      />
      {showResults && (
        <Results
          loading={loading}
          results={filteredOptions}
          searchString={searchString}
          selectedIndex={selectedIndex}
          handleClick={handleClick}
        />
      )}
    </div>
  );
}

export default Autocomplete;
