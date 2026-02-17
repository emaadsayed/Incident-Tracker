import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IncidentForm = ({
  mode,
  initialData = null,
  onSubmit,
  loading = false,
}) => {
  const navigate = useNavigate();
  const isUpdate = mode === "update";

  const [formData, setFormData] = useState({
    title: "",
    service: "",
    severity: "",
    status: "OPEN",
    owner: "",
    summary: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        service: initialData.service || "",
        severity: initialData.severity || "",
        status: initialData.status || "OPEN",
        owner: initialData.owner || "",
        summary: initialData.summary || "",
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!isUpdate && !formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.service) {
      newErrors.service = "Service is required";
    }

    if (!formData.severity) {
      newErrors.severity = "Severity is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="incident-wrapper">
      {loading && (
        <div className="overlay-loader">
          <div className="spinner"></div>
        </div>
      )}

      <div className="card">
        <div className="card-header">Incident Tracker</div>

        <div className="card-body">
          <h3 className="form-title">
            {isUpdate ? formData.title : "Create New Incident"}
          </h3>

          <form onSubmit={handleSubmit}>
            {!isUpdate && (
              <div className="form-group">
                <label>Title *</label>
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <p className="error-text">{errors.title}</p>}
              </div>
            )}

            <div className="form-group">
              <label>Service {!isUpdate && "*"}</label>
              {isUpdate ? (
                <div className="form-value">{formData.service}</div>
              ) : (
                <>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select Service</option>
                    <option value="Auth">Auth</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Database">Database</option>
                  </select>
                  {errors.service && (
                    <p className="error-text">{errors.service}</p>
                  )}
                </>
              )}
            </div>

            <div className="form-group">
              <label>Severity *</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
              >
                <option value="">Select Severity</option>
                <option value="SEV1">SEV1</option>
                <option value="SEV2">SEV2</option>
                <option value="SEV3">SEV3</option>
                <option value="SEV4">SEV4</option>
              </select>
              {errors.severity && (
                <p className="error-text">{errors.severity}</p>
              )}
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="OPEN">OPEN</option>
                <option value="MITIGATED">MITIGATED</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>

            <div className="form-group">
              <label>Owner</label>
              <input
                name="owner"
                type="text"
                value={formData.owner}
                onChange={handleChange}
              />
            </div>

            {isUpdate && initialData?.createdAt && (
              <div className="form-group">
                <label>Occurred At</label>
                <div className="form-value">
                  {new Date(initialData.createdAt).toDateString()}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Summary</label>
              <textarea
                name="summary"
                rows="3"
                value={formData.summary}
                onChange={handleChange}
              />
            </div>

            <div className="button-group">
              <button type="submit" className="primary-btn" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : isUpdate
                    ? "Save Changes"
                    : "Create Incident"}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/")}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IncidentForm;
