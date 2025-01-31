import React from 'react';
import * as swapi from 'swapi-ts';

interface ResultSectionProps {
  results: swapi.IPeople[];
}

class ResultSection extends React.Component<ResultSectionProps> {
  render() {
    const { results } = this.props;

    return (
      <div>
        <h2>Search Results:</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((person, index) => (
              <li key={index}>
                <h3>{person.name}</h3>
                <p>Birth Year: {person.birth_year}</p>
                <p>Height: {person.height}</p>
                <p>Mass: {person.mass}</p>
                <p>Hair Color: {person.hair_color}</p>
                <p>Eye Color: {person.eye_color}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    );
  }
}
export default ResultSection;
