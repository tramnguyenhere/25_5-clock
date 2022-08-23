import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='break'>
        <div id='break-label'>Break Length</div>
        <button id='break-decrement'>
          <i class='fa-solid fa-arrow-down'></i>
        </button>
        <button id='break-increment'>
          <i class='fa-solid fa-arrow-up'></i>
        </button>
      </div>
      <div className='session'>
        <div id='session-label'>Session Length</div>
        <button id='session-decrement'>
          <i class='fa-solid fa-arrow-down'></i>
        </button>
        <button id='session-increment'>
          <i class='fa-solid fa-arrow-up'></i>
        </button>
      </div>
    </div>
  );
}

export default App;
