import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

function Welcome() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [data, setData] = useState([]);

  const handleClick = (setState, increase) => {
    const changeBy = increase ? 1 : -1;
    // Important! a functional call like this is synchronous
    setState((prev) => prev + changeBy);
    // and a direct call using the direct state value is asynchronous
    // setCount(count + 1)
    // setCount(count + 1)
  };

  const getUser = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // using inbuilt fetch
    // fetch("https://fakestoreapi.com/products")
    //   .then((res) => res.json())
    //   .then((json) => console.log(json));
    getUser();
  }, []);

  // useEffect(() => {
  //   console.log("inside useEffect2");
  // }, [count2]);

  return (
    <>
      <div className="items-container">
        {data?.map((item) => {
          return (
            <div key={item.id}>
              <p>Title is: {item.title}</p>
              <p>Description is: {item.description}</p>
              <img src={item.image} alt="item-image" height="200px" />
            </div>
          );
        })}
      </div>
      <p>Count = {count}</p>
      <p>Count2 = {count2}</p>
      <button onClick={() => handleClick(setCount, true)}>Increment</button>
      <button onClick={() => handleClick(setCount, false)}>Decrement</button>
      <button onClick={() => handleClick(setCount2, true)}>Increment2</button>
      <button onClick={() => handleClick(setCount2, false)}>Decrement2</button>
    </>
  );
}

export default Welcome;
