import React, { useReducer } from "react";
import Search from "./components/Search";
import Result from "./components/Result";

const reducer = (state, action) => {
  switch (action.type) {
    case "changeInput":
      return { ...state, query: action.payload };
    case "updateRes":
      return { ...state, result: action.payload };
    default:
      throw new Error(`State ${state} does not exist.`);
  }
};

const initialState = {
  query: "",
  result: [],
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeInput = (query) => {
    dispatch({ type: "changeInput", payload: query });
  };
  const updateRes = (res) => {
    dispatch({ type: "updateRes", payload: res });
  };

  return (
    <main>
      <Search state={state} changeInput={changeInput} updateRes={updateRes} />
      <Result state={state} />
    </main>
  );
};

export default App;
