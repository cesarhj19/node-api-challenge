function validateAction(req, res, next) {
  const action = req.body;
  if (typeof action === 'undefined') res.status(400).json({ message: 'missing action data' });
  else if (typeof action.description === 'undefined' || typeof action.notes === 'undefined') res.status(400).json({ message: 'missing required notes, description field' });
  else {
    if (typeof action.completed === 'undefined' || action.completed === '') req.action = { ...action, completed: false };
    else {
      req.action = { ...action };
    }
    next();
  }
}

module.exports = validateAction;
