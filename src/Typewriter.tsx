import useTypewriter from "./useTypewriter";
import "./Typewriter.css";

interface TypewriterProps {
  text: string[];
  speed: number;
}

const Typewriter = ({ text, speed }: TypewriterProps) => {
  const displayText = useTypewriter(text, speed);

  return (
    <div className="title-container">
      <div className="title">
        <p>Hi, my name is</p>
        <div className="typewriter">
          <h1>{displayText}</h1>
        </div> 
      </div>
    </div>
  );
};

export default Typewriter;
