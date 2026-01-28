import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import Style from './searchBar.module.css';
import axios from 'axios';
// import { useAnswer } from '../../hooks/searchBody';

let searchTerm = '';

function SearchBar({ sendDataToParent }) {
  const textAreaRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);


  const handleChange = (e) => {
    setQuery(e.target.value);
    setSearchTerm(e.target.value);
  }

  // const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [highestKeywordDescription, setHighestKeywordDescription] = useState('');
  const [showAccount, setAccount] = useState(false);
  const [userDetails1, setUserDetails] = useState({
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email')
  })

  const handleSearch1 = () => {
    console.log("Search Term: ", searchTerm);

    // Send the search term to the server
    fetch('http://localhost:3002/search', {
      method: 'POST',
      body: JSON.stringify({ textInput: searchTerm }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);

        // Check if description_with_highest_keywords is defined before setting the state
        if (data.description_with_highest_keywords) {
          setHighestKeywordDescription(data.description_with_highest_keywords);
          // Optional: Update search history if available in the server response
          if (data.history) {
            setSearchHistory(data.history.slice(0, 7));
          }
        } else {
          console.log("No description_with_highest_keywords in the response from the server.");
        }
      })
      .catch((error) => console.error('Error saving search history:', error));
  };

  useEffect(() => {
    textAreaRef.current.style.height = 'auto';
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [query])

  const handleSearch = async () => {
  try {
    console.log("Query", query);
    const response = await axios.get(`http://localhost:3001/api/search?query=${query}`);
    const freshData = response.data; // Capture the data directly
    
    setResults(freshData); 
    console.log("Fresh Data:", freshData);
    // Send freshData directly so the parent gets it on the FIRST click
    sendDataToParent(freshData, query); 

    setQuery('');
    setSearchTerm('');
  } catch (error) {
    console.error("Query failed:", error);
  }
};

  return (
    <div className={Style.searchbox}>
      <textarea
        onChange={handleChange}
        placeholder="Type something..."
        ref={textAreaRef}
        rows={1}
        content={searchTerm}
        type="text" value={query}
      />
      <div className={Style.upload}>
        <MdOutlineFileUpload onClick={handleSearch} />
      </div>
     
      {/* <p>search text is overflowing . need the correction</p> */}
    </div>
  );
}

export default SearchBar;
