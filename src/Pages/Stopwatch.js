import React, { useState, useEffect, useRef } from "react";
import IntervalsStopwatch from "../Components/Intervals_stopwatch/IntervalsStopwatch";
import { useToggle } from "../Hooks/UseContext";
import audioMp3 from "../Sound/drum.MP3";
import airHorn from "../Sound/airhorn-blast-soundroll-lower-1-00-03.MP3";
import drumRoll from "../Sound/drum-roll.MP3";

const Stopwatch = () => {
  const [startFunction, setStartFunction] = useState(false);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds] = useState(1);
  const [stopwatchTime, setStopwatchTime] = useState(
    localStorage.getItem("stopwatch_time") === null
      ? 60
      : localStorage.getItem("stopwatch_time")
  );
  const [currentStopwatchTime, setCurrentStopwatchTime] = useState(
    localStorage.getItem("stopwatch_time") === null
      ? 60
      : localStorage.getItem("stopwatch_time")
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const { soundNumber, SoundTiming, StartFunction } = useToggle();
  const alarmSound = useRef(null);
  const airHornSound = useRef(null);
  const drumEffectRoll = useRef(null);

  const playAudio = () => {
    alarmSound.current.play();
  };
  const playAirHorn = () => {
    airHornSound.current.play();
  };
  const playDrumRoll = () => {
    drumEffectRoll.current.play();
  };

  useEffect(() => {
    let timer;
    if (running) {
      if (stopwatchTime > 0) {
        timer = setInterval(() => {
          setStopwatchTime((prev) => prev - 1);
          setElapsedTime((time) => time + 1);
        }, 1000);
      }
      if (stopwatchTime === 0) {
        setStopwatchTime(
          localStorage.getItem("stopwatch_time") === null
            ? 60
            : localStorage.getItem("stopwatch_time")
        );
        timer = setInterval(() => {
          setStopwatchTime((prev) => prev - 1);
        }, 1000);
      }
    }
    return () => clearInterval(timer);
  }, [stopwatchTime, running]);

  useEffect(() => {
    if (stopwatchTime === 0) {
      setRounds((prev) => prev + 1);
    }
  }, [stopwatchTime]);

  const start = () => {
    setStartFunction(true);
    setTimeout(() => {
      setRunning(true);
      setStartFunction(false);
    }, 4000);
    return clearTimeout();
  };
  const stop = () => {
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setStopwatchTime(
      localStorage.getItem("stopwatch_time") === null
        ? 60
        : localStorage.getItem("stopwatch_time")
    );
    setRounds(1);
    setElapsedTime(0);
    if (running) {
      playDrumRoll();
    }
  };

  const updateInterval = (e) => {
    setStopwatchTime(Number(e.target.value));
    setRounds(1);
    localStorage.setItem("stopwatch_time", Number(e.target.value));
    setCurrentStopwatchTime(Number(e.target.value));
  };
  const totalWorkoutTime = currentStopwatchTime * rounds;

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}s`;
  };

  if (running === true) {
    for (let i = Number(soundNumber); i > 0; i--) {
      if (Number(stopwatchTime) === i) {
        playAudio();
      }
    }
    if (Number(stopwatchTime) === 0) {
      playAirHorn();
    }
  }

  return (
    <div>
      <StartFunction
        playAudio={playAudio}
        playAirHorn={playAirHorn}
        startFunction={startFunction}
      />
      <SoundTiming
        isActive={running ? "flex" : "none"}
        e={running ? formatTimer(stopwatchTime) : ""}
      />
      <div className="tabata-timer">
        <h1>{running ? "ვარჯიში" : "დასვენება"}</h1>
        <div className="time">{formatTimer(stopwatchTime)}</div>
        <div className="controls">
          {running ? (
            <button
              onClick={stop}
              disabled={!running}
              style={{ backgroundColor: "#820000", color: "red" }}
            >
              Stop
            </button>
          ) : running || startFunction === true ? (
            <button
              style={{ backgroundColor: "gray", color: "red" }}
              onClick={start}
              disabled={true}
            >
              Start
            </button>
          ) : (
            <button onClick={start} disabled={running}>
              Start
            </button>
          )}
          {running ? (
            <button onClick={reset}>Reset</button>
          ) : (
            <button
              style={{ backgroundColor: "gray", color: "#fff" }}
              onClick={reset}
            >
              Reset
            </button>
          )}
        </div>
        <IntervalsStopwatch
          interval={stopwatchTime}
          running={running}
          updateInterval={updateInterval}
        />
        <div className="current-round">
          <h2>რაუნდი {rounds}</h2>
          <div className="total-workout-time">
            <h2>{formatTimer(elapsedTime)}</h2>
            <p>სავარჯიშო დრო: {formatTime(totalWorkoutTime)}</p>
          </div>
        </div>
        <audio ref={alarmSound} src={audioMp3} />
        <audio ref={airHornSound} src={airHorn} />
        <audio ref={drumEffectRoll} src={drumRoll} />
      </div>
    </div>
  );
};

export default Stopwatch;
