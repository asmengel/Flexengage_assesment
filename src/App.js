import {Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ViewMetric from "./pages/ViewMetric";

function App() {
  return (
  <Routes>
    <Route path='/' element={<Dashboard />} />
    <Route path='/viewmetric/:id' element={<ViewMetric />} />
  </Routes>
  );
}

export default App;
