import React, { useState } from 'react';
import axios from 'axios';
import DbInterface from './db_manager';
import DirectorInterface from './director';
import AudienceInterface from './audience';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedInDb, setLoggedInDb] = useState(false);
  const [isLoggedInDir, setLoggedInDir] = useState(false);
  const [isLoggedInAud, setLoggedInAud] = useState(false);

  const handleUserLogin = () => {
    // Kullanıcı girişi işlemleri
    console.log('Username:', username);
    console.log('Password:', password);

    axios
      .post('http://localhost:3001/api/user/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        // Başarılı yanıt durumunda işlemler
        console.log('Response:', response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        // İstenilen sayfaya yönlendirme işlemleri burada yapılabilir
        if (response.data.userType=="director") {
          setLoggedInDir(true);
        }
        else {
          setLoggedInAud(true);
        }
        
      })
      .catch((error) => {
        // Hata durumunda işlemler
        console.error('Error:', error.response.data);
        if (error.response.status === 404) {
          const reqMessage = error.response.data.resultMessage;
          console.log('Request Message:', reqMessage);
          // Hata mesajını kullanarak istenilen işlemleri yapabilirsiniz
          setError(reqMessage);
        } else {
          setError('An error occurred. Please try again.');
        }
      });
  };

  const handleDbManagerLogin = () => {
    // Veritabanı yöneticisi girişi işlemleri
    console.log('DB Name:', username);
    console.log('Password:', password);

    axios
      .post('http://localhost:3001/api/user/db_login', {
        db_name: username,
        password: password,
      })
      .then((response) => {
        // Başarılı yanıt durumunda işlemler
        console.log('Response:', response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        // İstenilen sayfaya yönlendirme işlemleri burada yapılabilir
        setLoggedInDb(true);
      })
      .catch((error) => {
        // Hata durumunda işlemler
        console.error('Error:', error.response.data);
        if (error.response.status === 404) {
          const reqMessage = error.response.data.resultMessage;
          console.log('Request Message:', reqMessage);
          // Hata mesajını kullanarak istenilen işlemleri yapabilirsiniz
          setError(reqMessage);
        } else {
          setError('An error occurred. Please try again.');
        }
      });
  };

  if (isLoggedInDb) {
    return <DbInterface />;
  }
  if (isLoggedInAud) {
    return <AudienceInterface />;
  }
  if (isLoggedInDir) {
    return <DirectorInterface />;
  }

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
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
}

export default App;
