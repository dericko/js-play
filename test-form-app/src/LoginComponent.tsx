import { useState } from "react";


function LoginComponent() {
  const [message, setMessage] = useState('Not submitted');
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('pw');
  const handleSubmit = async () => {
    const queryParams = new URLSearchParams({
      username,
      password
    });
    const res = await fetch(`http://localhost:3000/authenticate?${queryParams}`)
    const json = await res.json();
    console.log(json)
    if (json.message) {
      setMessage(json.message);
    } else if (json.error) {
      setMessage(json.error);
    } else {
      setMessage('Unknown error');
      console.log(json);
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="username">Username</label>
      <input type='text' id="username" placeholder="Username" defaultValue={username} onChange={e => setUsername(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="text" id="password" placeholder="Password" defaultValue={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <div>Status: {message} </div>
    </div>
  )
}

export default LoginComponent;