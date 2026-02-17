const express = require('express');
const router = express.Router();

const {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident
} = require('../controllers/incident.controller');

router.post('/', createIncident);
router.get('/', getIncidents);
router.get('/:id', getIncidentById);
router.patch('/:id', updateIncident);

module.exports = router;
