const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    service: {
      type: String,
      enum: ['Auth', 'Backend', 'Frontend', 'Database'],
      required: true
    },
    severity: {
      type: String,
      enum: ['SEV1', 'SEV2', 'SEV3', 'SEV4'],
      required: true
    },
    status: {
      type: String,
      enum: ['OPEN', 'MITIGATED', 'RESOLVED'],
      default: 'OPEN'
    },
    owner: {
      type: String,
      trim: true,
      default: null,
      set: (v) => (v === "" ? null : v)
    },
    summary: {
      type: String,
      trim: true,
      default: null,
      set: (v) => (v === "" ? null : v)
    }
  },
  { timestamps: true }
);

incidentSchema.index({ status: 1 });
incidentSchema.index({ severity: 1 });
incidentSchema.index({ service: 1 });

incidentSchema.index({
  status: 1,
  severity: 1,
  service: 1,
  createdAt: -1
});

incidentSchema.index({ title: "text" });

module.exports = mongoose.model('Incident', incidentSchema);
