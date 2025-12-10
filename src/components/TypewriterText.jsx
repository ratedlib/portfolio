"use client";
import { useEffect, useState } from "react";

export default function TypewriterText() {
  const words = ["Hello!","Apa Khabar!","Bonjour!", "こんにちは!", "안녕하세요!", "Hola!"];
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullWord = words[i];

      setCurrentWord(
        isDeleting
          ? fullWord.substring(0, currentWord.length - 1)
          : fullWord.substring(0, currentWord.length + 1)
      );

      setTypingSpeed(isDeleting ? 60 : 120);

      if (!isDeleting && currentWord === fullWord) {
        setTimeout(() => setIsDeleting(true), 800);
      } else if (isDeleting && currentWord === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, loopNum]);

  return (
    <p className="text-5xl font-quantico text-gray-900 typewriter-cursor">
      {currentWord}
    </p>
  );
}



