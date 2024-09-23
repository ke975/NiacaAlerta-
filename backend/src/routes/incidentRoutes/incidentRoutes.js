const express = require('express');

const IncidentController = require('../../controller/CotrollerIncident/IncidentController');

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/incident',IncidentController.createIncident);
router.get('/incidentUser',IncidentController.InicidentUser);

module.exports = router;