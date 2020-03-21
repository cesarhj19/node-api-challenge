const express = require('express');
const actionDb = require('../data/helpers/actionModel');
const projectDb = require('../data/helpers/projectModel');
const { validateAction, validateActionId, validateProjectId } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await actionDb.get()
      .then((action) => {
        res.status(200).json(action);
      });
  } catch (err) {
    res.status(500).json({
      error: 'The action information could not be retrieved.',
      message: err.message,
    });
  }
});

router.get('/:id', validateActionId, async (req, res) => {
  res.status(200).json(req.action);
});

router.post('/:id/projects', validateAction, validateProjectId, async (req, res) => {
  try {
    const newAction = { project_id: req.project.id, ...req.action };
    await actionDb.insert(newAction)
      .then(() => res.status(201).json(req.action));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while saving the action to the database.',
      message: err.message,
    });
  }
});

router.put('/:id', validateActionId, validateAction, async (req, res) => {
  try {
    await actionDb.update(req.params.id, req.action)
      .then(() => res.status(200).json(req.action));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while updating action from the database',
      message: err.message,
    });
  }
});

router.delete('/:id', validateActionId, async (req, res) => {
  try {
    actionDb.remove(req.action.id)
      .then(() => res.status(204).json({ message: 'Action has been deleted' }));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while removing the action from the database',
      message: err.message,
    });
  }
});

module.exports = router;
