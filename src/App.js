import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import Landing from "./components/Landing";
import Success from "./components/Success";
import Failure from "./components/Failure";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
