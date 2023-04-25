import { useState } from "react";


function LoginComponent() {
  const [message, setMessage] = useState('Logged Out');
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('pw');
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const handleSubmit = async () => {
    const queryParams = new URLSearchParams({
      username,
      password
    });
    const res = await fetch(`http://localhost:3000/authenticate?${queryParams}`)
    const json = await res.json();
    if (json.message) {
      setMessage(json.message);
      setInvalidUsername(false);
      setInvalidPassword(false);
    } else if (json.error === 'Invalid username') {
      setInvalidUsername(true);
      setInvalidPassword(false);
    } else if (json.error === 'Invalid password') {
      setInvalidPassword(true);
      setInvalidUsername(false);
    } else {
      setMessage('Unknown error');
      setInvalidUsername(false);
      setInvalidPassword(false);
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
      {invalidUsername && <div style={{ color: 'red' }}>Invalid username</div>}
      <input type='text' id="username"
        placeholder="Username"
        defaultValue={username}
        onKeyDown={handleKeydown}
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      {invalidPassword && <div style={{ color: 'red' }}>Invalid password</div>}
      <input type="text"
        id="password"
        placeholder="Password"
        defaultValue={password}
        onKeyDown={handleKeydown}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>Status: {message} </div>
    </div>
  )
}

export default LoginComponent;