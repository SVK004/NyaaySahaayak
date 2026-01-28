import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Style from './home.module.css'
import SearchBar from '../searchBar/searchBar.jsx'
// import searchTerm from '../searchBar/searchBar.jsx'
import DialogueBox from '../dialogueBox/dialogueBox.jsx'
import User from '../user/user.jsx'
import SearchHistory from '../searchHistory/searchHistory.jsx'
import TypingHeading from './typingEffect.jsx'

// react icons ...
import { MdOutlineDoubleArrow } from "react-icons/md";
import { FaUserLarge } from "react-icons/fa6";



function Home() {
  const [searchTerm,setSearchTerm] = useState("");

  const [mode,setMode] = useState(false);
  const changeMode = () => {
    setMode(e => !e);
  }
  // for storing user details in local storage.
  const [userDetails1, setUserDetails] = useState({
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email')
  })

  console.log("SEARCH TERM:" + searchTerm);

  const [popup, setPopup] = useState(false);
  const showUser = () => {
    setPopup(e => !e);
  }
  // const [show_history,setShow_history] = useState(false);
  // onClick={setShow_history(e => !e)}
  // , width:show_history ? 0 : "280px"

  const popupRef = useRef();
  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      setPopup(false);
    }
  }


  const handleSearchTermChange = (term) => {
    console.log("Search is: "+term)
    setSearchTerm(term);
  };
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const handleDataFromChild = (data1,data2) => {
    console.log("Data1: ", data1, "Data2: ", data2);
    setResults(prevResults => [...prevResults, { question: data2, answer: data1 }]);
    setQuery('');
  };
  useEffect(() => {
    // Render components only when results state changes
  }, [results]);


  return (
    <div className={Style.main}>
      {popup && <div className={Style.popbg} onClick={closePopup} ref={popupRef}>
        <div className={Style.popup}>
          <User changeMode={changeMode} mode={mode} username={userDetails1.username} email={userDetails1.email} />
        </div>
      </div>}
      <div className={Style.history} style={{backgroundColor: mode ? "#022B3A" : "" }}>
        <h1 title='your history goes here' style={{color:mode ? "#E1E5F2" : ""}}>HISTORY</h1>
        {results.slice(0,10).map((component,index) => (
                  <React.Fragment key={index}>
                    <SearchHistory searchTerm={component.name} />
                  </React.Fragment>
                ))}
      </div>
      <div className={Style.body} style={{ backgroundColor: mode ? "#011D27" : "" }}>
        <div className={Style.arrow} ><MdOutlineDoubleArrow /></div>
        <div className={Style.header}>
          <div className={Style.img} onClick={showUser}><FaUserLarge /></div>
          <TypingHeading mode={mode} />
        </div>
        <div className={Style.middle}>
          <div className={Style.queryboxbg}>
            <div className={Style.querybox}>
  {results.map((chatPair, index) => (
    <React.Fragment key={index}>
      {/* User Question */}
      <div className={Style.userChat}>
        <h4>{userDetails1.username.split('"').join('')}:</h4>
        <DialogueBox info={chatPair.question} /> 
      </div>

      {/* NyaaySahayak Answer */}
      <div className={Style.assistantChat}>
        <h4>NyaaySahayak:</h4>
        {/* chatPair.answer is the array returned from backend */}
        {chatPair.answer.map((res, i) => (
          <DialogueBox key={i} info={res.description} />
        ))}
      </div>
    </React.Fragment>
  ))}
</div>
          </div>
        </div>
        <div className={Style.footer}>
          <SearchBar sendDataToParent={handleDataFromChild} onSearchTermChange={handleSearchTermChange}/>
        </div>
      </div>
    </div>
  )
}

export default Home