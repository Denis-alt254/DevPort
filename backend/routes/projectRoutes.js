const {getAllProjects, getProjectsByUser, creatProject, updateProject, deleteProject} = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware')
const express = require('express');
const routerP = express.Router();

routerP.get('/', getAllProjects);
routerP.get('/user/:userId', getProjectsByUser);
routerP.post('/add', authMiddleware, creatProject);
routerP.put('/edit/:id', authMiddleware, updateProject);
routerP.delete('/delete/:id', authMiddleware, deleteProject);

module.exports = routerP;