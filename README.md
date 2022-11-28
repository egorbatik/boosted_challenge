# boosted_challenge

## About the solution
I choose nodejs as it have some advantages vs java
    - Faster for intensive IO apps like this challenge
    - Faster to develop
    - In a production environment uses less resources than a JVM

Disadvantages:
    - No Depency Injection like Java
    - No contract (classes/interfases/typing)

'In any case, I can develop the solution in java as well if needed, but in the challenge it wasn't specified

## Database
1. docker pull postgres:latest
2. docker run --name postgres-consent-db -e POSTGRES_PASSWORD=consent -e POSTGRES_USER=consent -e POSTGRES_DB=consent -p 5432:5432 -d postgres

## Local environment
1. NodeJS => v12.22.1
2. npm install (will install knex for DB)

## Data migrations
1. knex migrate:latest

## Curls

- `GET /consent/target`
    - Get all versions of all targets

curl --location --request GET 'http://localhost:8080/consent/target'

- `GET /consent/target/:targetId`
    - Returns all version of a specific target

curl --location --request GET 'http://localhost:8080/consent/target/faad4d02-6e4b-11ed-843b-0242ac110002'

- `POST /consent/target`
    - Creates a new Consent
curl --location --request POST 'http://localhost:8080/consent/target/' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "pharmacy.allow_marketing_emails_b",
  "consent_url": "http://example.com/marketing_terms"
}'

- `PATCH` `/consent/target/:targetId`
    - Update the latest version of `targetId`
        - A new target will be added to the target ledger with an incremented version
        - The date this new version was added will also be changed to reflect the date when the request was made.
        - The previous version will be unchanged

 curl --location --request PATCH 'http://localhost:8080/consent/target/faad4d02-6e4b-11ed-843b-0242ac110002' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "pharmacy.allow_marketing_emails_2",
  "consent_url": "http://example.com/marketing_terms"
}
'       

' In case to try to update other user's task it will not update as the update requires to match userId and taskId


## Tests
1. npm run test
' The tests have the repository "stubbed", without the stubbed repository, the test will go against the database.

