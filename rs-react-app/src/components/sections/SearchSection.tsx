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
    const trimmedValue = event.target.value.trim();
    this.setState({ searchQuery: trimmedValue });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = this.state.searchQuery.trim();
    this.setState({ isLoading: true, searchQuery: trimmedQuery });

    try {
      const searchResult = await swapi.People.findBySearch([trimmedQuery]);
      console.log('Search results:', searchResult);
      if (searchResult && searchResult.resources) {
        const people: swapi.IPeople[] = searchResult.resources.map(
          (resource) => resource.value
        );
        this.props.onSearchResults(people);

        localStorage.setItem('lastSearch', trimmedQuery);
        this.setState({ lastSearch: trimmedQuery });
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
