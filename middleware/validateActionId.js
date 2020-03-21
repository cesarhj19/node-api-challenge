const actionDb = require('../data/helpers/actionModel');

async function validateActionId(req, res, next) {
  try {
    await actionDb.get(req.params.id)
      .then((action) => {
        if (action) {
          req.action = { ...action, ...req.action };
          next();
        } else {
          res.status(404).json({ message: 'invalid action id' });
        }
      });
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while retrieving the action from the database',
      message: err.message,
    });
  }
}

module.exports = validateActionId;
