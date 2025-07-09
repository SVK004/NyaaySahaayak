import React, { useState, useEffect } from 'react';

function TypingHeading({mode}) {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const phrase = "NyaaySahaayak";

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    const intervalId = setInterval(() => {
      if (currentIndex === phrase.length) {
        setIsTyping(false);
        clearInterval(intervalId);
        return;
      }
      currentText = phrase.substring(0, currentIndex + 1);
      setText(currentText);
      currentIndex++;
    }, 180); // Adjust typing speed
    return () => clearInterval(intervalId);
  }, [phrase]);

  return (
    <h3 style={{fontFamily:"ubuntu", color:mode ? "#E1E5F2" : "" }}>{text}</h3>
  );
}

export default TypingHeading;
