const mongoose = require('mongoose');
const Incident = require('../src/models/incident.model');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const services = ['Auth', 'Backend', 'Frontend', 'Database'];
const severities = ['SEV1', 'SEV2', 'SEV3', 'SEV4'];
const statuses = ['OPEN', 'MITIGATED', 'RESOLVED'];
const owners = ['Rahul', 'Aman', 'Priya', 'Sneha', 'Arjun', 'Neha'];

const incidentTitles = [
  'Login failure affecting multiple users',
  'Database replication lag',
  'Frontend page load error',
  'API response timeout',
  'Authentication token expired',
  'Unexpected server restart',
  'Memory leak detected',
  'High CPU usage on backend',
  'Service outage reported by monitoring',
  'Failed deployment in production'
];

const incidentSummaries = [
  'Users are experiencing login failures across the platform.',
  'Replication between primary and secondary databases is delayed.',
  'Certain pages are not loading due to a frontend error.',
  'API calls are timing out intermittently.',
  'Authentication tokens are expiring prematurely causing login issues.',
  'Server restarted unexpectedly, causing temporary downtime.',
  'Memory usage is increasing abnormally over time.',
  'CPU utilization is above 90% for the backend service.',
  'Monitoring system reported a service outage.',
  'Deployment failed, rollback initiated.'
];

const randomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const randomDate = () => {
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  date.setSeconds(Math.floor(Math.random() * 60));
  return date;
};

const generateIncidents = (count = 50) => {
  const incidents = [];

  for (let i = 0; i < count; i++) {
    const titleIndex = Math.floor(Math.random() * incidentTitles.length);
    const date = randomDate();

    incidents.push({
      title: incidentTitles[titleIndex],
      service: randomItem(services),
      severity: randomItem(severities),
      status: randomItem(statuses),
      owner: randomItem(owners),
      summary: incidentSummaries[titleIndex],
      createdAt: date,
      updatedAt: date
    });
  }

  return incidents;
};

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Incident.deleteMany({});
    console.log('Old incidents removed');

    const incidents = generateIncidents(200);

    await Incident.insertMany(incidents);

    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
