const ConsentRepository = module.exports

const  DB  = require('../utils/DB');

const CONSENTS='consents'

const Consent= require('../models/Consent')

ConsentRepository.getAllConsents= () => DB.instance(CONSENTS)
  .select('*')

ConsentRepository.insertConsent= (newConsent) => DB.instance(CONSENTS)
  .insert({
    name: newConsent.name,
    consent_url: newConsent.consentUrl,    
  })
  .returning('*')

ConsentRepository.insertConsentWithUuid= (newConsent) => DB.instance(CONSENTS)
  .insert({
    id: newConsent.id,
    version: newConsent.version,
    name: newConsent.name,
    consent_url: newConsent.consentUrl,
    created_at: newConsent.createdAt
  })
  .returning('*')

ConsentRepository.getConsentById= (id) => DB.instance(CONSENTS)
  .select('*')
  .where(DB.instance.raw(`id::text = '${id}'`))
  .orderBy("version", "desc")

ConsentRepository.getLastVersionConsentById= async (id) => DB.instance(CONSENTS)
  .select('*')
  .where(DB.instance.raw(`id::text = '${id}'`))
  .orderBy("version", "desc")
  .first()