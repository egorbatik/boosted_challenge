const express = require('express')
const router = express.Router();

const ConsentController= require("./controllers/consent.controller")

router.post('/consent/target', ConsentController.postConsent)

router.patch('/consent/target/:targetId', ConsentController.patchConsent)

router.get('/consent/target/:targetId', ConsentController.getConsentById)

router.get('/consent/target', ConsentController.getAllConsents)

module.exports = router;