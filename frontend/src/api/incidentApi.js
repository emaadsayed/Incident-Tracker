const BASE_URL = "http://localhost:5000/api/incidents";

export const createIncident = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create incident");

  return res.json();
};

export const getIncidentById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) throw new Error("Failed to fetch incident");

  return res.json();
};

export const updateIncident = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update incident");

  return res.json();
};

export const getIncidents = async (params) => {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${BASE_URL}?${query}`);

  if (!res.ok) throw new Error("Failed to fetch incidents");

  return res.json();
};
