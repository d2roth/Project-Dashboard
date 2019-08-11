const mongoose = require( 'mongoose' );

// Our Schema
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teamworkId: {
    type: String,
    required: false,
  },
  togglId: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'ARCHIVED'],
    default: 'ACTIVE'
  },
  teamworkProject: {
    type: JSON,
    required: false
  },
  estimatedHours: {
    type: String,
    required: false
  },
  actualHours: {
    type: String,
    required: false
  }
},
{
  timestamps: true
});

// Query Helpers
ProjectSchema.query.active = function () {
  return this.where({
    status: 'ACTIVE'
  });
}

ProjectSchema.query.archived = function () {
  return this.where({
    status: 'ARCHIVED'
  });
}

module.exports = mongoose.model( 'Project', ProjectSchema );