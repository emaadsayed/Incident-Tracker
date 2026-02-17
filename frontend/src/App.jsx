import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateIncident from "./pages/CreateIncident";
import UpdateIncident from "./pages/UpdateIncident";
import IncidentList from "./pages/IncidentList";
import "./styles/incident.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IncidentList />} />
        <Route path="/create" element={<CreateIncident />} />
        <Route path="/update/:id" element={<UpdateIncident />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
