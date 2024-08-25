import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClickPage from './components/ClickPage';
import Boost from './components/Boost';
import { useEffect, useState } from 'react';

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve Telegram username and log it to console
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;

      if (user?.username) {
        setUsername(user.username);
        console.log(`Telegram Username: ${user.username}`);
      } else {
        setUsername(null); 
        console.log('No Telegram username detected');
      }
    }
  }, []);

  // USername Condition
  if (!username) {
    return (
      <div className="container-fluid bg-dark  d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
        <header className="text-white">
          <p>It looks like you don't have a username set in Telegram.</p>
          <p>To use this app, please set a username in your Telegram settings:</p>
          <ol>
            <li>Open Telegram and go to "Settings".</li>
            <li>Tap on "Username".</li>
            <li>Set your desired username.</li>
          </ol>
          <p>After setting a username, refresh this page.</p>
        </header>
      </div>
    );
  }

  return (
    <>
    {/* Routes */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} >
            <Route path='' element={<ClickPage user={username} />} />
            <Route path='/boost' element={<Boost user={username} />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
