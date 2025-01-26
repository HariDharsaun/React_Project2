import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./style.css";

const lyrics = [
  { time: 38, text: "Oh ho minn vettu naalil inge minsaram pole vanthayae" },
  { time: 44, text: "Va va en velicha poove va (Repeat)" },
  { time: 61.2, text: "Uyir theetum uyilae va Kulir neekum veiyiale va Azhaithen va anbae" },
  { time: 65.4, text: "Mazhai megam varum bothae Mayil thogai viriyaatho Azhaithen va anbae" },
  { time: 70.8, text: "Kaadhal kaadhal oru joram Kaalam yaavum athu varum" },
  { time: 73.8, text: "Adam yevaal thodangiya kathai Thodarkathai adangiya thilaaye...." },
];

const SourceFile = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const index = lyrics.findIndex(
      (lyric, i) =>
        currentTime >= lyric.time &&
        (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)
    );
    setCurrentLyricIndex(index);
  }, [currentTime]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="karaoke-app">
      <h1 className="app-title">Karaoke Music</h1>
      <img
        src="\src\assets\title_card.jpg"
        alt="Karaoke Visual"
        className="karaoke-image"
      />
      <audio
        ref={audioRef}
        src="/songs/Velicha Poove from Ethirneechal.mp3"
        controls
        className="audio-player">
        Your browser does not support the audio element.
      </audio>
      <button onClick={playAudio} className="play-button">
        🎶 Play Song
      </button>
      <div className="lyrics-container">
        {lyrics.map((lyric, index) => (
          <motion.p
            key={index}
            className={`lyric ${
              index === currentLyricIndex ? "active-lyric" : ""
            }`}
          >
            {lyric.text}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default SourceFile;
