const ConsentService = module.exports

const ConsentRepository= require('../repositories/consent.repository')
const Consent = require('../models/Consent')

ConsentService.createConsent = async (consent) => {
  const newConsent = new Consent(
    null,
    consent.name,
    consent.consent_url,
    null,
    null
  )
  return ConsentRepository.insertConsent(newConsent)
};

ConsentService.updateConsentVersion = async (targetId, consentUrl) => {
  const lastConsentVersion = await ConsentRepository.getLastVersionConsentById(targetId)

  if (!lastConsentVersion) {
    throw new Error('No previous version found')
  }

  const newConsentVersion= new Consent(
    targetId, 
    lastConsentVersion.name,
    consentUrl,
    (lastConsentVersion.version+1)
  )

  return ConsentRepository.insertConsentWithUuid(newConsentVersion)
};


ConsentService.getConsentById = async (id) => {
  return ConsentRepository.getConsentById(id)
  
};

ConsentService.getAllConsents = async (req, res, next) => {
  return ConsentRepository.getAllConsents()
};