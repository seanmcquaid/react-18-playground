import { useState, useTransition } from 'react';

const getUrl = (term) =>
  `https://itunes.apple.com/search?term=${term}&country=us`;

const Transition = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition({
    timeoutMs: 5000,
  });

  const onChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    startTransition(() => {
      fetch(getUrl(value)).then((response) => {
        response.json().then((json) => {
          setResults(json.results);
        });
      });
    });
  };

  return (
    <div>
      <input value={query} onChange={onChange} />
      {isPending && <p>Pending</p>}
      <ul>
        {results.map((result, i) => (
          <li key={i}>
            <h4>{result.trackName}</h4>
            <p>{result.artistName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transition;
