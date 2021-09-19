import { useState, useTransition, useEffect, useDeferredValue } from 'react';

const getUrl = (term) =>
  `https://itunes.apple.com/search?term=${term}&country=us`;

const List = ({ query }) => {
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition({
    timeoutMs: 5000,
  });

  useEffect(() => {
    if (query.length) {
      startTransition(() => {
        fetch(getUrl(query)).then((response) => {
          response.json().then((json) => {
            setResults(json.results);
          });
        });
      });
    }
  }, [query, startTransition]);

  return (
    <>
      {isPending && <p>Pending</p>}
      <ul>
        {results.map((result, i) => (
          <li key={i}>
            <h4>{result.trackName}</h4>
            <p>{result.artistName}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

const Transition = () => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query, { timeoutMs: 5000 });

  const onChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  return (
    <div>
      <input value={query} onChange={onChange} />
      <List query={deferredQuery} />
    </div>
  );
};

export default Transition;
