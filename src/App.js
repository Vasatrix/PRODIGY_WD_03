import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (!running) {
      setRunning(true);
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1);
    }
  };

  const pauseStopwatch = () => {
    if (running) {
      setRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const resetStopwatch = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  const formatTime = (time) => {
    const milliseconds = (`00${time % 1000}`).slice(-3);
    const seconds = (`0${Math.floor((time / 1000) % 60)}`).slice(-2);
    const minutes = (`0${Math.floor((time / 60000) % 60)}`).slice(-2);
    const hours = (`0${Math.floor(time / 3600000)}`).slice(-2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={startStopwatch}>Start</button>
        <button onClick={pauseStopwatch}>Pause</button>
        <button onClick={resetStopwatch}>Reset</button>
        <button onClick={recordLap}>Lap</button>
      </div>
      {laps.length > 0 && (
        <div className="laps">
          <h2>Laps</h2>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
