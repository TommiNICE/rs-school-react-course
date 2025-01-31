import React, { Component } from 'react';
import './App.css';
import SearchSection from './components/sections/SearchSection';
import ResultSection from './components/sections/ResultSection';
import * as swapi from 'swapi-ts';

interface AppState {
  searchResults: swapi.IPeople[];
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }
  handleSearchResults = (results: swapi.IPeople[]) => {
    this.setState({ searchResults: results });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* You can add a header component here if needed */}
        </header>
        <main>
          <SearchSection onSearchResults={this.handleSearchResults} />
          <ResultSection results={this.state.searchResults} />
        </main>
        <footer>{/* You can add a footer component here if needed */}</footer>
      </div>
    );
  }
}

export default App;
