const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const { validateProject, validateProjectId } = require('../middleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await projectDb.get()
      .then((projects) => {
        res.status(200).json(projects);
      });
  } catch (err) {
    res.status(500).json({
      error: 'The project information could not be retrieved.',
      message: err.message,
    });
  }
});

router.get('/:id', validateProjectId, async (req, res) => {
  res.status(200).json(req.project);
});

router.get('/:id/actions', validateProjectId, async (req, res) => {
  try {
    projectDb.getProjectActions(req.params.id)
      .then((actions) => {
        if (actions.length !== 0) res.status(200).json(actions);
        else res.status(200).json({ message: 'There are no actions with this specific project id' });
      });
  } catch (err) {
    res.status(500).json({
      error: 'The actions for project could not be retrieved',
      message: err.message,
    });
  }
});

router.post('/', validateProject, async (req, res) => {
  try {
    await projectDb.insert(req.project)
      .then(() => res.status(201).json(req.project));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while saving the project to the database.',
      message: err.message,
    });
  }
});

router.put('/:id', validateProjectId, validateProject, async (req, res) => {
  try {
    await projectDb.update(req.params.id, req.project)
      .then(() => res.status(200).json(req.project));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while updating project from the database',
      message: err.message,
    });
  }
});

router.delete('/:id', validateProjectId, async (req, res) => {
  try {
    projectDb.remove(req.project.id)
      .then(() => res.status(204).json({ message: 'Project has been deleted' }));
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while removing the project from the database',
      message: err.message,
    });
  }
});

module.exports = router;
