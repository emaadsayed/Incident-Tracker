import { useNavigate } from "react-router-dom";
import IncidentTable from "../components/IncidentTable";

const IncidentList = () => {
  const navigate = useNavigate();

  return (
    <div className="incident-wrapper">
      <div className="card incident-list">
        <div className="card-header incident-list-header">
          <span>Incident Tracker</span>
          <button
            className="secondary-btn small-btn"
            onClick={() => navigate("/create")}
          >
            New Incident +
          </button>
        </div>

        <div className="card-body">
          <IncidentTable />
        </div>
      </div>
    </div>
  );
};

export default IncidentList;
