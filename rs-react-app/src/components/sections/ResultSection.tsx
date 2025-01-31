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
          <ol>
            {results.map((person, index) => (
              <li key={index}>
                <h3>{person.name}</h3>
                <ul>
                  <li>Birth Year: {person.birth_year}</li>
                  <li>Height: {person.height}</li>
                  <li>Mass: {person.mass}</li>
                  <li>Hair Color: {person.hair_color}</li>
                  <li>Eye Color: {person.eye_color}</li>
                </ul>
              </li>
            ))}
          </ol>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    );
  }
}
export default ResultSection;
