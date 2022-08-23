import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, seTtimeLeft] = useState(1500);
  const [timingType, setTimingtype] = useState('SESSION');

  const [play, setPlay] = useState(false);

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      seTtimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      seTtimeLeft(timeLeft + 60);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      seTtimeLeft(timeLeft - 60);
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype('SESSION');
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    const audio = document.getElementById('beep');
    if (!timeLeft && timingType === 'SESSION') {
      seTtimeLeft(breakLength * 60);
      setTimingtype('BREAK');
      audio.play();
    }
    if (!timeLeft && timingType === 'BREAK') {
      seTtimeLeft(sessionLength * 60);
      setTimingtype('SESSION');
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play) {
      // eslint-disable-next-line no-unused-expressions
      timeout;
      resetTimer();
    } else {
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    clock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, timeLeft, timeout]);

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const title = timingType === 'SESSION' ? 'Session' : 'Break';
  return (
    <div className='container'>
      <h1>25 + 5 Clock</h1>
      <div className='clock'>
        <div className='break'>
          <div id='break-label'>Break Length</div>
          <button
            disabled={play}
            onClick={handleBreakDecrease}
            id='break-decrement'
            className='fa-solid fa-arrow-down'
          ></button>
          <span id='break-length'>{breakLength}</span>
          <button
            disabled={play}
            onClick={handleBreakIncrease}
            id='break-increment'
            className='fa-solid fa-arrow-up'
          ></button>
        </div>
        <div className='session'>
          <div id='session-label'>Session Length</div>
          <button
            disabled={play}
            onClick={handleSessionDecrease}
            id='session-decrement'
            className='fa-solid fa-arrow-down'
          ></button>
          <span id='session-length'>{sessionLength}</span>
          <button
            disabled={play}
            onClick={handleSessionIncrease}
            id='session-increment'
            className='fa-solid fa-arrow-up'
          ></button>
        </div>
      </div>
      <div className='display'>
        <div id='timer-label'>{title}</div>
        <span id='time-left'>{timeFormatter()}</span>
      </div>
      <div className='controller'>
        <button onClick={handlePlay} id='start_stop'>
          Start/Stop
        </button>

        <button
          onClick={handleReset}
          className='fa-solid fa-arrows-rotate'
          id='reset'
        ></button>
      </div>
      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      ></audio>
    </div>
  );
}

export default App;
