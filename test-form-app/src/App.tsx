import './App.css';

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
          <p>
            The most minimal TSX React app we could do
          </p>
          <textarea rows={10} />
          <button>Clicky</button>

        </div>
      </main>
      <footer className="App-footer">App Footer</footer>
    </div>
  );
}

export default App;
