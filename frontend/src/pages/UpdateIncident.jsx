import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import IncidentForm from "../components/IncidentForm";
import { getIncidentById, updateIncident } from "../api/incidentApi";

const UpdateIncident = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const data = await getIncidentById(id);
        setIncident(data);
      } catch (error) {
        toast.error("Failed to load incident");
        navigate("/");
      } finally {
        setPageLoading(false);
      }
    };

    fetchIncident();
  }, [id, navigate]);

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);
      await updateIncident(id, formData);
      toast.success("Incident updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Failed to update incident");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="page-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <IncidentForm
      mode="update"
      initialData={incident}
      onSubmit={handleUpdate}
      loading={loading}
    />
  );
};

export default UpdateIncident;
