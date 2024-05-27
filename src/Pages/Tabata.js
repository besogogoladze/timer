import React, { useState, useEffect, useRef } from "react";
import audioMp3 from "../Sound/drum.MP3";
import airHorn from "../Sound/airhorn-blast-soundroll-lower-1-00-03.MP3";
import drumRoll from "../Sound/drum-roll.MP3";
import "./style.css";
import Intervals from "../Components/Intervals_tabata/Intervals";
import { useToggle } from "../Hooks/UseContext";

function Tabata() {
  const [startFunction, setStartFunction] = useState(false);
  const [workTime, setWorkTime] = useState(
    localStorage.getItem("workTime") === null
      ? 30
      : localStorage.getItem("workTime")
  ); // Default 30 seconds work time
  const [restTime, setRestTime] = useState(
    localStorage.getItem("restTime") === null
      ? 30
      : localStorage.getItem("restTime")
  ); // Default 30 seconds rest time
  const [workTimeLeft, setWorkTimeLeft] = useState(workTime);
  const [restTimeLeft, setRestTimeLeft] = useState(restTime);
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [rounds, setRounds] = useState(
    localStorage.getItem("rounds") === null ? 6 : localStorage.getItem("rounds")
  );
  const [currentRound, setCurrentRound] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const alarmSound = useRef(null);
  const airHornSound = useRef(null);
  const drumEffectRoll = useRef(null);
  const { soundNumber, SoundTiming, StartFunction } = useToggle();

  let min = 0;

  useEffect(() => {
    let interval = null;

    if (isActive) {
      if (isResting) {
        if (restTimeLeft > 0) {
          interval = setInterval(() => {
            setRestTimeLeft((time) => time - 1);
            setElapsedTime((time) => time + 1);
          }, 1000);
        } else {
          setIsResting(false);
          setRestTimeLeft(restTime);
          setCurrentRound((round) => round + 1);
          if (currentRound < rounds) {
            setWorkTimeLeft(workTime);
          } else {
            setIsActive(false); // Stop if all rounds are completed
          }
        }
      } else {
        if (workTimeLeft > 0) {
          interval = setInterval(() => {
            setWorkTimeLeft((time) => time - 1);
            setElapsedTime((time) => time + 1);
          }, 1000);
        } else {
          setIsResting(true);
          setWorkTimeLeft(workTime);
        }
      }
    }
    return () => clearInterval(interval);
  }, [
    isActive,
    workTimeLeft,
    restTimeLeft,
    isResting,
    currentRound,
    rounds,
    workTime,
    restTime,
  ]);

  const playAudio = () => {
    alarmSound.current.play();
  };
  const playAirHorn = () => {
    airHornSound.current.play();
  };
  const playDrumRoll = () => {
    drumEffectRoll.current.play();
  };

  const handleStart = () => {
    setStartFunction(true);
    setTimeout(() => {
      setIsActive(true);
      setStartFunction(false);
    }, 4000);
    return clearTimeout();
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setWorkTimeLeft(workTime);
    setRestTimeLeft(restTime);
    setIsResting(false);
    setCurrentRound(1);
    setElapsedTime(0);
  };

  const handleRoundsChange = (e) => {
    setRounds(Math.max(min, Number(e.target.value)));
    localStorage.setItem("rounds", Number(e.target.value));
  };

  const handleWorkTimeChange = (e) => {
    setWorkTime(Math.max(min + 1, Number(e.target.value)));
    setWorkTimeLeft(Number(e.target.value));
    localStorage.setItem("workTime", Number(e.target.value));
  };

  const handleRestTimeChange = (e) => {
    setRestTime(Math.max(min, Number(e.target.value)));
    setRestTimeLeft(Number(e.target.value));
    localStorage.setItem("restTime", Number(e.target.value));
    console.log(Number(e.target.value));
  };
  const totalWorkoutTime = workTime * rounds + restTime * rounds;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}s`;
  };
  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  if (isActive === true) {
    for (let i = soundNumber; i > 0; i--) {
      if (workTimeLeft === i || restTimeLeft === i) {
        playAudio();
      }
    }
    if (formatTime(elapsedTime) !== formatTime(totalWorkoutTime)) {
      if (workTimeLeft === 0 || restTimeLeft === 0) {
        playAirHorn();
      }
    }
    if (formatTime(elapsedTime) === formatTime(totalWorkoutTime)) {
      playDrumRoll();
    }
  }

  return (
    <>
      <StartFunction
        playAudio={playAudio}
        playAirHorn={playAirHorn}
        startFunction={startFunction}
      />
      <SoundTiming
        isActive={isActive ? "flex" : "none"}
        e={isResting ? formatTimer(restTimeLeft) : formatTimer(workTimeLeft)}
      />
      <div className="tabata-timer">
        <h1>{isResting ? "დასვენება" : "ვარჯიში"}</h1>
        <div className="time">
          {isResting ? formatTimer(restTimeLeft) : formatTimer(workTimeLeft)}
        </div>
        <div className="controls">
          {isActive ? (
            <button
              onClick={handlePause}
              disabled={!isActive}
              style={{ backgroundColor: "#820000", color: "red" }}
            >
              Stop
            </button>
          ) : currentRound > rounds ? (
            <button
              style={{ backgroundColor: "gray", color: "red" }}
              onClick={handleStart}
              disabled={true}
            >
              Start
            </button>
          ) : (
            <button onClick={handleStart} disabled={isActive}>
              Start
            </button>
          )}
          {currentRound > rounds ? (
            <button onClick={handleReset}>Reset</button>
          ) : (
            <button
              style={{ backgroundColor: "gray", color: "#fff" }}
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>
        <Intervals
          workTime={workTime}
          handleWorkTimeChange={handleWorkTimeChange}
          isActive={isActive}
          restTime={restTime}
          handleRestTimeChange={handleRestTimeChange}
          rounds={rounds}
          handleRoundsChange={handleRoundsChange}
        />
        <div className="current-round">
          <h2>
            რაუნდი {currentRound} / {rounds}
          </h2>
          <div className="total-workout-time">
            <h2>{formatTime(elapsedTime)}</h2>
            <p>სავარჯიშო დრო: {formatTime(totalWorkoutTime)}</p>
            <audio ref={alarmSound} src={audioMp3} />
            <audio ref={airHornSound} src={airHorn} />
            <audio ref={drumEffectRoll} src={drumRoll} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Tabata;
