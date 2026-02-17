import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import IncidentForm from "../components/IncidentForm";
import { createIncident } from "../api/incidentApi";

const CreateIncident = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      await createIncident(formData);
      toast.success("Incident created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Failed to create incident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IncidentForm mode="create" onSubmit={handleCreate} loading={loading} />
  );
};

export default CreateIncident;
