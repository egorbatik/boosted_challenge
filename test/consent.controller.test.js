const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../index')
const { expect } = chai;
const ConsentRepository = require('../src/repositories/consent.repository')

const Consent = require('../src/models/Consent')

describe('Consent Controller', () => {
  const sandbox = sinon.createSandbox()
  
  afterEach(()=> sandbox.restore())
  
  it('Get all consents', () => {
    sandbox.stub(ConsentRepository, 'getAllConsents').returns([])
    return chai.request(app).get('/consent/target')
      .then(res => {
        expect(res.body).to.eql([]);
      })
  })

  it('Get all consent for specific ID', () => {
    sandbox.stub(ConsentRepository, 'getConsentById').withArgs('aaaa').returns({})
    return chai.request(app).get('/consent/target/aaaa')
      .then(res => {
        expect(res.body).to.eql({});
      })
  })

  it('Create a new Consent', () => {    
    const newConsentRequestDto = new Consent(
      null,
      "pharmacy.allow_marketing_emails_2",
      "http://example.com/marketing_terms",
      null,
      null
    )
    const newConsent = {
      "name": "pharmacy.allow_marketing_emails_2",
      "consent_url": "http://example.com/marketing_terms",
      "date": "2022/11/26",
      "id":"aaaa"
    }
    
    sandbox.stub(ConsentRepository, 'insertConsent').withArgs(newConsentRequestDto).returns(newConsent)
    
    return chai.request(app).post('/consent/target').send({
      "name": "pharmacy.allow_marketing_emails_2",
      "consent_url": "http://example.com/marketing_terms"
    })
    .then(res => {
      expect(res.body).to.eql(newConsent);
    })
  })


  it('Create a new Consent Version', () => {
    
    
    const newConsentRequestDto = new Consent(
      "aaaa",
      "pharmacy.allow_marketing_emails_2",
      "http://example.com/marketing_terms",
      1,
      undefined
    )

    const oldConsent = {
      "name": "pharmacy.allow_marketing_emails_2",
      "consent_url": "http://example.com/marketing_terms",
      "date": "2022/11/26",
      "version":0,
      "id":"aaaa"
    }

    const newConsent = {
      "name": "pharmacy.allow_marketing_emails_2",
      "consent_url": "http://example.com/marketing_terms",
      "date": "2022/11/26",
      "version":1,
      "id":"aaaa"
    }
    sandbox.stub(ConsentRepository, 'getLastVersionConsentById').withArgs(newConsentRequestDto.id).returns(oldConsent)

    sandbox.stub(ConsentRepository, 'insertConsentWithUuid').withArgs(newConsentRequestDto).returns(newConsent)
    
    return chai.request(app).patch(`/consent/target/${newConsentRequestDto.id}`).send({
      "name": "pharmacy.allow_marketing_emails_2",
      "consent_url": "http://example.com/marketing_terms"
    })
      .then(res => {
        expect(res.body).to.eql(newConsent);
      })
  })

  
})