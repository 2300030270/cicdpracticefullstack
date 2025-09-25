import { BrowserRouter } from "react-router-dom";
import NavBar from "./ac/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter basename="/reactacapi">
        <NavBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
