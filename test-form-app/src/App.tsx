import './App.css';
import LoginComponent from './LoginComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        App Header
      </header>
      <main className="App-body">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <LoginComponent />
        </div>
      </main>
      <footer className="App-footer">App Footer</footer>
    </div>
  );
}

export default App;
