import { useRef, useState } from 'react';
import Transition from './Transition';
// import { flushSync } from 'react-dom';

function fetchSomething() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(console.log('fetching'));
    }, 3000);
  });
}

function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const renderCount = useRef(0);

  function handleClick() {
    fetchSomething().then(() => {
      // React 18 and later DOES batch these:
      setCount((c) => c + 1);
      setFlag((f) => !f);
      // React will only re-render once at the end (that's batching!)
    });
  }

  // flushSync can be used to explicitly avoid vatching if we need to read something from the DOM immediately but this is a rare use case
  // function handleClick() {
  //   flushSync(() => {
  //     setCount((c) => c + 1);
  //   });
  //   // React has updated the DOM by now
  //   flushSync(() => {
  //     setFlag((f) => !f);
  //   });
  //   // React has updated the DOM by now
  // }

  console.log('render', renderCount.current++);

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? 'blue' : 'black' }}>{count}</h1>
      <Transition />
    </div>
  );
}

export default App;
