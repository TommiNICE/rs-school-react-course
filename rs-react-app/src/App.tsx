import React, { Component } from 'react';
import './App.css';
import SearchSection from './components/sections/SearchSection';
import ResultSection from './components/sections/ResultSection';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* You can add a header component here if needed */}
        </header>
        <main>
          <SearchSection />
          <ResultSection />
        </main>
        <footer>{/* You can add a footer component here if needed */}</footer>
      </div>
    );
  }
}

export default App;
