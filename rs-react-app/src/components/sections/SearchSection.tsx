import { Component, ChangeEvent, FormEvent } from 'react';
import * as swapi from 'swapi-ts';
import Spinner from '../Spinner';
import '../Spinner.css';

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
      if (error instanceof Error) {
        if ('status' in error) {
          const httpError = error as { status: number };
          switch (httpError.status) {
            case 404:
              alert('No results found. Please try a different search term.');
              break;
            case 429:
              alert('Too many requests. Please wait a moment and try again.');
              break;
            case 500:
              alert('Server error. Please try again later.');
              break;
            default:
              alert(`An error occurred: ${error.message}`);
          }
        } else {
          alert(`An unexpected error occurred: ${error.message}`);
        }
      }
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
          {this.state.isLoading ? <Spinner /> : 'Search'}
        </button>
      </form>
    );
  }
}

export default SearchSection;
