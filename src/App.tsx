import "./App.css";
import InputBlock from "./InputBlock";
import ParametersBlock from "./ParametersBlock";

function App() {
  return <div className="App">
    {/* need an export to json function
    this function will look through its children and create a schedule.json from them */}
    <div className="container">
        <InputBlock label="id"></InputBlock>
        <InputBlock label="name"></InputBlock>
        <InputBlock label="revision"></InputBlock>
        <ParametersBlock/>
    </div>
  </div>;
}

export default App;
