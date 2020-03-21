function validateProject(req, res, next) {
  const project = req.body;
  if (typeof project === 'undefined') res.status(400).json({ message: 'missing project data' });
  else if (typeof project.name === 'undefined' || typeof project.description === 'undefined') res.status(400).json({ message: 'missing required name and/or description field' });
  else {
    if (typeof project.completed === 'undefined' || project.completed === '') req.project = { ...project, completed: false };
    else {
      req.project = { ...project };
    }
    next();
  }
}

module.exports = validateProject;
