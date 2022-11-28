class Consent {
  constructor(id, name, consentUrl, version, createdAt) {
    this.id = id;
    this.name= name;
    this.consentUrl= consentUrl;
    this.version= version;
    this.createdAt= createdAt;
  }
}

module.exports = Consent