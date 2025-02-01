import { Component } from 'react';
import * as swapi from 'swapi-ts';
import SearchSection from './components/sections/SearchSection';
import ResultSection from './components/sections/ResultSection';
import ErrorBoundary from './components/ErrorBoundary';

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
          <main>
            <SearchSection onSearchResults={this.handleSearchResults} />
            <ResultSection results={this.state.searchResults} />
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
