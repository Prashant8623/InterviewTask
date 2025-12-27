import React, { useRef, useState } from "react";

const RefState = () => {
  const [count, setCount] = useState(0);
  const prevRef = useRef(0);

  const handleIncre = () => {
    setCount(count + 1);
  };

  const handleRef = () => {
    prevRef.current = count + 1;
    console.log(prevRef, "RefState");
  };

  return (
    <>
      <h2>Count Ref {count}</h2>
      <h2>{prevRef.current}</h2>
      <button onClick={handleIncre}>++</button>
      <button onClick={handleRef}>RefCount</button>
    </>
  );
};

export default RefState;
