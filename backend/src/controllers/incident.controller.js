const mongoose = require('mongoose');
const Incident = require('../models/incident.model');
const getPagination = require('../utils/pagination');

const allowedSeverity = ['SEV1', 'SEV2', 'SEV3', 'SEV4'];
const allowedStatus = ['OPEN', 'MITIGATED', 'RESOLVED'];
const allowedServices = ['Auth', 'Backend', 'Frontend', 'Database'];

const createIncident = async (req, res) => {
    try {
        const { title, service, severity, status, owner, summary } = req.body;

        if (!title || !service || !severity || !status) {
            return res.status(400).json({
                message: 'title, service, status and severity are required'
            });
        }

        if (!allowedServices.includes(service)) {
            return res.status(400).json({
                message: 'Invalid service value'
            });
        }

        if (!allowedSeverity.includes(severity)) {
            return res.status(400).json({
                message: 'Invalid severity value'
            });
        }

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: 'Invalid status value'
            });
        }

        const incident = await Incident.create({
            title,
            service,
            severity,
            status,
            owner,
            summary
        });

        return res.status(201).json(incident);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getIncidents = async (req, res) => {
    try {
        const {
            page,
            limit,
            severity,
            status,
            service,
            search,
            sortBy = 'createdAt',
            order = 'desc'
        } = req.query;

        const { skip, limit: parsedLimit, page: parsedPage } =
            getPagination(page, limit);

        const filter = {};

        if (severity) {
            if (!allowedSeverity.includes(severity)) {
                return res.status(400).json({
                    message: 'Invalid severity value'
                });
            }
            filter.severity = severity;
        }

        if (status) {
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({
                    message: 'Invalid status value'
                });
            }
            filter.status = status;
        }

        if (service) {
            if (!allowedServices.includes(service)) {
                return res.status(400).json({
                    message: 'Invalid service value'
                });
            }
            filter.service = service;
        }

        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        const allowedSortFields = [
            'createdAt',
            'severity',
            'status',
            'service'
        ];

        if (!allowedSortFields.includes(sortBy)) {
            return res.status(400).json({
                message: 'Invalid sort field'
            });
        }

        if (!['asc', 'desc'].includes(order)) {
            return res.status(400).json({
                message: 'Invalid order value (asc or desc)'
            });
        }

        const sortOrder = order === 'asc' ? 1 : -1;

        const [incidents, total] = await Promise.all([
            Incident.find(filter)
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(parsedLimit)
                .lean(),
            Incident.countDocuments(filter)
        ]);

        return res.status(200).json({
            data: incidents,
            pagination: {
                total,
                page: parsedPage,
                limit: parsedLimit,
                totalPages: Math.ceil(total / parsedLimit)
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const getIncidentById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid incident ID'
            });
        }

        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                message: 'Incident not found'
            });
        }

        return res.status(200).json(incident);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const updateIncident = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid incident ID'
            });
        }

        if (req.body.status && !allowedStatus.includes(req.body.status)) {
            return res.status(400).json({
                message: 'Invalid status value'
            });
        }

        if (req.body.service && !allowedServices.includes(req.body.service)) {
            return res.status(400).json({
                message: 'Invalid service value'
            });
        }

        if (req.body.severity && !allowedSeverity.includes(req.body.severity)) {
            return res.status(400).json({
                message: 'Invalid severity value'
            });
        }

        req.body.updatedAt = Date.now();

        const incident = await Incident.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!incident) {
            return res.status(404).json({
                message: 'Incident not found'
            });
        }

        return res.status(200).json(incident);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createIncident,
    getIncidents,
    getIncidentById,
    updateIncident
};