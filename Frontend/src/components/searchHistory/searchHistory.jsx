import React from 'react';
import Style from './searchHistory.module.css';

function SearchHistory(props) {
  return (
    <div className={Style.outer}>
      <p>{props.searchTerm}</p> 
    </div>
  );
}

export default SearchHistory;
