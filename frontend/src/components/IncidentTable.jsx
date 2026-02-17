import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIncidents } from "../api/incidentApi";

const IncidentTable = () => {
  const navigate = useNavigate();

  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({
    service: "",
    severity: "",
    status: "",
    search: "",
  });

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await getIncidents({
        page,
        limit: 10,
        sortBy,
        order,
        ...filters,
      });

      setIncidents(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, sortBy, order]);

  const handleFilter = () => {
    setPage(1);
    fetchData();
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortBy !== field) return "⇅";
    return order === "asc" ? "▲" : "▼";
  };

  return (
    <>
      {loading && (
        <div className="overlay-loader">
          <div className="spinner"></div>
        </div>
      )}

      <div className="incident-list-filters">
        <div className="incident-list-row">
          <div className="incident-list-field">
            <label>Service</label>
            <select
              value={filters.service}
              onChange={(e) =>
                setFilters({ ...filters, service: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="Auth">Auth</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Database">Database</option>
            </select>
          </div>

          <div className="incident-list-field">
            <label>Severity</label>
            <select
              value={filters.severity}
              onChange={(e) =>
                setFilters({ ...filters, severity: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="SEV1">SEV1</option>
              <option value="SEV2">SEV2</option>
              <option value="SEV3">SEV3</option>
              <option value="SEV4">SEV4</option>
            </select>
          </div>
        </div>

        <div className="incident-list-row">
          <div className="incident-list-field">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="OPEN">OPEN</option>
              <option value="MITIGATED">MITIGATED</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="incident-list-search"
          />

          <button className="secondary-btn small-btn" onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>

      <hr className="incident-list-divider" />

      <table className="incident-list-table">
        <thead>
          <tr>
            <th>Title</th>

            <th
              onClick={() => handleSort("service")}
              style={{ cursor: "pointer" }}
            >
              Service {renderSortIcon("service")}
            </th>

            <th
              onClick={() => handleSort("severity")}
              style={{ cursor: "pointer" }}
            >
              Severity {renderSortIcon("severity")}
            </th>

            <th
              onClick={() => handleSort("status")}
              style={{ cursor: "pointer" }}
            >
              Status {renderSortIcon("status")}
            </th>

            <th
              onClick={() => handleSort("createdAt")}
              style={{ cursor: "pointer" }}
            >
              Created At {renderSortIcon("createdAt")}
            </th>

            <th>Owner</th>
          </tr>
        </thead>

        <tbody>
          {incidents.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No incidents found
              </td>
            </tr>
          ) : (
            incidents.map((incident) => (
              <tr
                key={incident._id}
                className="clickable-row"
                onClick={() => navigate(`/update/${incident._id}`)}
              >
                <td>{incident.title}</td>
                <td>{incident.service}</td>
                <td>{incident.severity}</td>
                <td>
                  <span
                    className={`incident-status ${incident.status.toLowerCase()}`}
                  >
                    {incident.status}
                  </span>
                </td>
                <td>{new Date(incident.createdAt).toLocaleDateString()}</td>
                <td>{incident.owner || "-"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="incident-list-pagination">
        <span>
          Page {pagination.page || 1} of {pagination.totalPages || 1}
        </span>

        <div className="incident-list-pages">
          <button
            className="secondary-btn small-btn"
            disabled={page === 1}
            onClick={() => setPage(1)}
          >
            {"<<"}
          </button>

          <button
            className="secondary-btn small-btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <button className="secondary-btn small-btn active">
            {pagination.page || 1}
          </button>

          <button
            className="secondary-btn small-btn"
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

          <button
            className="secondary-btn small-btn"
            disabled={page === pagination.totalPages}
            onClick={() => setPage(pagination.totalPages)}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
};

export default IncidentTable;
