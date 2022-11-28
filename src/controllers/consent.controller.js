const ConsentController = module.exports

const ConsentService = require('../services/consent.service')

ConsentController.postConsent = async (req, res, next) => {
  const consent = req.body
  const response = await ConsentService.createConsent(consent)
  res.status(201).send(response)
};

ConsentController.patchConsent = async (req, res, next) => {
  const { targetId }  = req.params
  
  if (!targetId){
    res.status(400).send('targetId in the [route] is Missing' )  
  }

  const { consent_url: consentUrl } = req.body

  if (!consentUrl){
    res.status(400).send('consent_url in the [Body] is Missing' )  
  }

  const response = await ConsentService.updateConsentVersion(targetId, consentUrl)
  res.status(201).send(response)
};


ConsentController.getConsentById = async (req, res, next) => {
  const { targetId }  = req.params
  
  if (!targetId){
    res.status(400).send('targetId is Missing' )  
  }

  const response = await ConsentService.getConsentById(targetId)
  res.status(200).send(response)
};

ConsentController.getAllConsents = async (req, res, next) => {
  const response = await ConsentService.getAllConsents()
  res.status(200).send(response)
};