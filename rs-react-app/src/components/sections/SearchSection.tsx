import { Component, ChangeEvent, FormEvent } from 'react';
import * as swapi from 'swapi-ts';

interface SearchSectionProps {
  onSearchResults: (results: swapi.IPeople[]) => void;
}

interface SearchSectionState {
  searchQuery: string;
  isLoading: boolean;
  lastSearch: string;
}

class SearchSection extends Component<SearchSectionProps, SearchSectionState> {
  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {
      searchQuery: '',
      isLoading: false,
      lastSearch: '',
    };
  }

  componentDidMount() {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
      this.setState({ lastSearch });
    }
  }
  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      const searchResult = await swapi.People.findBySearch([
        this.state.searchQuery,
      ]);
      console.log('Search results:', searchResult);
      if (searchResult && searchResult.resources) {
        const people: swapi.IPeople[] = searchResult.resources.map(
          (resource) => resource.value
        );
        this.props.onSearchResults(people);

        // Save the search query to localStorage
        localStorage.setItem('lastSearch', this.state.searchQuery);
        this.setState({ lastSearch: this.state.searchQuery });
      } else {
        this.props.onSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching for people:', error);
      this.props.onSearchResults([]);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
          placeholder={this.state.lastSearch}
        />
        <button type="submit" disabled={this.state.isLoading}>
          {this.state.isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    );
  }
}

export default SearchSection;
