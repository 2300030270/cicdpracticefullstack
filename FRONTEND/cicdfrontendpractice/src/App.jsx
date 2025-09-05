import { BrowserRouter } from "react-router-dom";
import NavBar from "./ac/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
