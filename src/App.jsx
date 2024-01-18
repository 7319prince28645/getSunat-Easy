import Render from "./Components/Render";
import GetFiles from "./Services/getFiles";
function App() {
  return (
    <GetFiles>
      <Render />
    </GetFiles>
  );
}

export default App;
