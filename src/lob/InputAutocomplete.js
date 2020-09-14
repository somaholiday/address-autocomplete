import React, { useEffect, useState } from "react";
import { getAddresses } from "./api/SearchApi";
import Address from "./Address";

import "./InputAutocomplete.css";

const PENDING = "pending";

const SelectedItem = ({ result, onCancel }) => (
  <div className="InputAutocomplete-selectedResult">
    <Address {...result} />
    <button onClick={onCancel}>X</button>
  </div>
);

const InputAutocomplete = (inputConfig) => {
  const { label, name } = inputConfig;
  const [query, setQuery] = useState("");
  const [apiResults, setApiResults] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function runQuery() {
      if (!!query) {
        setApiResults(PENDING);
        const results = await getAddresses({ q: query });

        if (mounted) {
          setApiResults(results);
        }
      } else {
        // clear results if user deletes all text
        setApiResults(null);
      }
    }

    runQuery();

    return () => {
      mounted = false;
    };
  }, [query]);

  // debugging
  useEffect(() => {
    console.log(apiResults);
  }, [apiResults]);

  function handleInput(e) {
    setQuery(e.target.value);
  }

  function handleKeyDown(e) {
    // TODO: handle arrow keys

    if (e.key === "ArrowUp") {
      // move selection up
      console.log("↑");
    } else if (e.key === "ArrowDown") {
      // move selection down
      console.log("↓");
    }
  }

  function clearInput() {
    setQuery("");
    setApiResults(null);
  }

  function selectResult(result) {
    clearInput();
    setSelectedResult(result);
  }

  function clearSelection() {
    selectResult(null);
  }

  function getResultsContent(apiResults) {
    if (apiResults === null) {
      return null;
    }

    if (apiResults === PENDING) {
      return "Searching...";
    }

    if (apiResults.total_count === 0) {
      return "No results found.";
    }

    return apiResults.data.map((result) => (
      <div key={result.id} onClick={() => selectResult(result)}>
        <div className="InputAutocomplete-result">
          <div className="InputAutocomplete-resultAddress">
            <Address {...result} />
          </div>
          <div className="InputAutocomplete-resultId">{result.id}</div>
        </div>
      </div>
    ));
  }

  const inputElement = (
    <input
      className="InputAutocomplete-input"
      type="text"
      value={query}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onChange={() => {
        "be quiet";
      }}
    />
  );
  const resultsElement = <div className="InputAutocomplete-resultsContainer">{getResultsContent(apiResults)}</div>;
  const selectedElement = selectedResult ? <SelectedItem result={selectedResult} onCancel={clearSelection} /> : null;
  const hiddenInputElement = selectedResult ? <input type="hidden" name={name} value={selectedResult.id} /> : null;

  return (
    <div className="InputAutocomplete">
      <label>{label}:</label>
      {selectedElement || inputElement}
      {apiResults ? resultsElement : null}
      {hiddenInputElement}
    </div>
  );
};

export default InputAutocomplete;
