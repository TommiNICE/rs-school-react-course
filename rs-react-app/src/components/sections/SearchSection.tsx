import { Component, ChangeEvent, FormEvent } from 'react';
import * as swapi from 'swapi-ts';

interface SearchSectionProps {
  onSearchResults: (results: any[]) => void;
}

interface SearchSectionState {
  searchQuery: string;
  isLoading: boolean;
}

class SearchSection extends Component<SearchSectionProps, SearchSectionState> {
  constructor(props: SearchSectionProps) {
    super(props);
    this.state = {
      searchQuery: '',
      isLoading: false,
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      const results = await swapi.Planets.findBySearch([this.state.searchQuery]);
      console.log('Search results:', results);
      this.props.onSearchResults(results);
    } catch (error) {
      console.error('Error searching for planets:', error);
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
          placeholder="Search for planets..."
        />
        <button type="submit" disabled={this.state.isLoading}>
          {this.state.isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    );
  }
}

export default SearchSection;
