import { useState, useEffect } from 'react';

const useTypewriter = (texts: string[], speed = 50, delay = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Index du texte actuel
  const [isTyping, setIsTyping] = useState(true); // Phase de saisie ou d'effacement

  useEffect(() => {
    let i = 0; // Pour l'affichage progressif des lettres
    let j = texts[currentIndex].length; // Pour l'effacement progressif des lettres
    const currentText = texts[currentIndex]; // Texte à afficher actuellement
    let typingInterval: NodeJS.Timeout;

    if (isTyping) {
      // Phase de saisie
      typingInterval = setInterval(() => {
        if (i < currentText.length) {
          setDisplayText(currentText.substring(0, i + 1)); // Affiche progressivement
          i++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setIsTyping(false); // Passe à la phase d'effacement après un délai
          }, delay);
        }
      }, speed);
    } else {
      // Phase d'effacement
      typingInterval = setInterval(() => {
        if (j > 0) {
          setDisplayText(currentText.substring(0, j - 1)); // Efface progressivement
          j--;
        } else {
          clearInterval(typingInterval);
          setIsTyping(true); // Recommence la saisie
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // Passe au texte suivant
        }
      }, speed);
    }

    return () => {
      clearInterval(typingInterval);
    };
  }, [texts, currentIndex, isTyping, speed, delay]);

  return displayText;
};

export default useTypewriter;
