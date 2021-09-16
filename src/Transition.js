import { useState, useTransition } from 'react';

const Transition = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition({
    timeoutMs: 3000,
  });

  const onChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    startTransition(() => {
      fetch().then(() => {
        setResults([]);
      });
    });
  };

  return <div></div>;
};

export default Transition;
