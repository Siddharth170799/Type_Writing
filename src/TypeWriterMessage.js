import React, { useState, useEffect, useRef } from "react";

const messages = [
  "Hello, welcome to the typewriter effect!",
  "This demonstrates useEffect and setInterval in React.",
  "Watch as each character appears one by one.",
  "You can skip the animation if you're impatient!",
  "Thanks for watching the typewriter in action!",
];

export function TypeWriterMessage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const startRef = useRef(null);

  const startTyping = () => {
    const messageToBeDisplayed = messages[currentMessageIndex].split("");
    let index = 0;
    let message = "";

    startRef.current = setInterval(() => {
      if (!messageToBeDisplayed[index]) {
        setShowSkip(false);
        clearInterval(startRef.current);
        return;
      }

      setShowSkip(true);
      setIsTyping(true);

      message = message + messageToBeDisplayed[index];
      index = index + 1;
      setDisplayedText(message);
    }, 100);
  };

  const skipTyping = () => {
    setDisplayedText(messages[currentMessageIndex]);
    clearInterval(startRef.current);
    setShowSkip(false);
  };

  const nextMessage = () => {
    setCurrentMessageIndex((prev) => prev + 1);
    setDisplayedText("");
  };

  useEffect(() => {
    return () => clearInterval(startRef.current);
  }, []);

  return (
    <div className="typewriter-container">
      <h1>Typewriter Effect</h1>

      <div className="message-display">
        <p className="displayed-text">{displayedText}</p>
        {isTyping && <span className="cursor">|</span>}
      </div>

      <div className="controls">
        <button
          onClick={startTyping}
          disabled={showSkip}
          className="start-button"
        >
          Start Typing
        </button>

        {showSkip && (
          <button onClick={skipTyping} className="skip-button">
            Skip
          </button>
        )}

        <button
          onClick={nextMessage}
          disabled={showSkip}
          className="next-button"
        >
          Next Message
        </button>
      </div>

      <div className="message-info">
        <p>
          Message {currentMessageIndex + 1} of {messages.length}
        </p>
        <p className="instruction">
          Watch the typewriter effect or use the Skip button to see the full
          message instantly!
        </p>
      </div>
    </div>
  );
}