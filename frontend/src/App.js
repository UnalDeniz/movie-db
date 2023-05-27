import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserLogin = () => {
    // Kullanıcı girişi işlemleri
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const handleDbManagerLogin = () => {
    // Veritabanı yöneticisi girişi işlemleri
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: 'black', textAlign: 'center', fontFamily: 'Candara' }}>Welcome!</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ marginTop: '10px' }}>
          <button
            style={{ backgroundColor: 'green', color: 'white', marginRight: '10px' }}
            onClick={handleUserLogin}
          >
            Login as user.
          </button>
          <button
            style={{ backgroundColor: 'blue', color: 'white' }}
            onClick={handleDbManagerLogin}
          >
            Login as database manager.
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
