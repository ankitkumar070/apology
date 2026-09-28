import { useEffect, useState } from "react";
import { story } from "./data/story";
import Frame from "./components/Frame";
import Navbar from "./components/Navbar";
import FloatingElements from "./components/FloatingElements";
import Question from "./components/Question";
import FinalScreen from "./components/FinalScreen";
import ForgivenessScreen from "./components/ForgivenessScreen";
import EntryScreen from "./components/EntryScreen";
import { verifyAccess } from "./utils/verifyAccess";
import MusicPlayer from "./components/MusicPlayer";
import img1 from "./assets/images/img1.png";
import { logAction } from "./utils/logger";

function App() {
  const [current, setCurrent] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showForgiveness, setShowForgiveness] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
  sessionStorage.getItem("apology_access") === "true"
);
useEffect(() => {
  logAction("website_opened");
}, []);
useEffect(() => {
  if (!isAuthenticated || showQuestion || showFinal || showForgiveness) {
    return;
  }

  logAction("story_frame_viewed", {
    frame: current + 1,
  });
}, [current, isAuthenticated, showQuestion, showFinal, showForgiveness]);
  const replay = () => {
    setCurrent(0);
    setShowQuestion(false);
    setShowFinal(false);
    setShowForgiveness(false);
  };

  if (!isAuthenticated) {
  return (
    <EntryScreen
      verifyAccess={verifyAccess}
      onSuccess={() => {
        sessionStorage.setItem("apology_access", "true");
        setIsAuthenticated(true);
      }}
    />
  );
}

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 relative overflow-hidden">
      {/* live background hearts/candy/teddy */}
      <FloatingElements />

      <Navbar />

      {!showQuestion && !showFinal && (
        <Frame
          image={story[current].image}
          text={story[current].text}
          onNext={() => {
  logAction("story_next_clicked", {
    fromFrame: current + 1,
    toFrame: current === story.length - 1 ? "question" : current + 2,
  });

  if (current === story.length - 1) {
    setShowQuestion(true);
  } else {
    setCurrent((p) => p + 1);
  }
}}
        />
      )}

      {showQuestion && !showFinal && (
        <Question onYes={() => setShowFinal(true)} />
      )}

      {/* {showFinal && <FinalScreen onReplay={replay} />} */}
      {showFinal && !showForgiveness && (
  <FinalScreen onNext={() => setShowForgiveness(true)} />
)}

{showForgiveness && (
  <ForgivenessScreen onNext={replay}/>
)}
<MusicPlayer
  src={`${import.meta.env.BASE_URL}music/drop-dead.mp3`}
  title="Drop dead"
  subtitle="♡ Kiss me, and I might drop dead ♡"
  cover={img1}
/>
    </div>
  );
}

export default App;
