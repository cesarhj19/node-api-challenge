const projectDb = require('../data/helpers/projectModel');

async function validateProjectId(req, res, next) {
  try {
    await projectDb.get(req.params.id)
      .then((project) => {
        if (project) {
          req.project = { ...project, ...req.project };
          next();
        } else {
          res.status(404).json({ message: 'invalid project id' });
        }
      });
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while retrieving the project from the database',
      message: err.message,
    });
  }
}

module.exports = validateProjectId;
