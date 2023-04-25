import { useState } from "react";


function LoginComponent() {
  const [message, setMessage] = useState('Logged Out');
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('pw');
  const [invalidUsername, setInvalidUsername] = useState({ invalid: false, message: ''});
  const [invalidPassword, setInvalidPassword] = useState({ invalid: false, message: '' });
  const isLoggedIn = message.startsWith('Welcome');
  const handleSubmit = async () => {
    // validate username and password before sending to server
    if (!username || username.length < 3) {
      setInvalidUsername({ invalid: true, message: 'Username must be at least 3 characters' });
      return;
    }
    if (!password || password.length < 3) {
      setInvalidPassword({ invalid: true, message: 'Password must be at least 3 characters' });
      return;
    }

    // send credentials to server
    const queryParams = new URLSearchParams({
      username,
      password
    });
    const res = await fetch(`http://localhost:3000/authenticate?${queryParams}`)
    const json = await res.json();

    // validate response from server
    if (json.message) {
      setMessage(json.message);
      setInvalidUsername({ invalid: false, message: '' });
      setInvalidPassword({ invalid: false, message: '' });
    } else if (json.error === 'Invalid username') {
      setInvalidUsername({ invalid: true, message: 'Invalid username' });
      setInvalidPassword({ invalid: false, message: '' });
    } else if (json.error === 'Invalid password') {
      setInvalidPassword({ invalid: true, message: 'Invalid password' });
      setInvalidUsername({ invalid: false, message: '' });
    } else {
      setMessage('Unknown error');
      setInvalidUsername({ invalid: false, message: '' });
      setInvalidPassword({ invalid: false, message: '' });
      console.log(json);
    }
  }
  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="username">Username</label>
      {invalidUsername.invalid && <div style={{ color: 'red' }}>{invalidUsername.message}</div>}
      <input type='text' id="username"
        placeholder="Username"
        defaultValue={username}
        onKeyDown={handleKeydown}
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      {invalidPassword.invalid && <div style={{ color: 'red' }}>{invalidPassword.message}</div>}
      <input type="text"
        id="password"
        placeholder="Password"
        defaultValue={password}
        onKeyDown={handleKeydown}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div style={{ color: isLoggedIn ? 'green' : 'red' }}>{message}</div>
    </div>
  )
}

export default LoginComponent;