import { Component } from 'react';
import * as swapi from 'swapi-ts';
import SearchSection from './components/sections/SearchSection';
import ResultSection from './components/sections/ResultSection';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import Header from './components/Header';
import './App.css'; // Import the CSS file

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
      <ErrorBoundary>
        <div className="App">
          <div className="content-wrapper">
            <Header />
            <main>
              <SearchSection onSearchResults={this.handleSearchResults} />
              <ResultSection results={this.state.searchResults} />
              <ErrorButton />
            </main>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
