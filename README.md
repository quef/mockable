# Mockable
Mock your API with an API.

## Get Started

With npm:
```shell script
npm install mockable-api --save-dev
```
With yarn:
```shell script
yarn add mockable-api --dev
```

Then, simply launch the server:
```shell script
npm run mockable
```
Override default options:
```shell script
DEBUG=false MOCKABLE_PORT=3001 npm run mockable
```

## Use with Cypress

Configure the url of your mockable server with an environment variable in your `cypress.json` file:

```json
{
  "env": {
    "mockableUrl": "http://localhost:3001/_mock"
  }
}
```
**Note:** default url `http://localhost:3001/_mock`

### startServerMock

Use it before each of your test. It ensures no mock is still pending.
```javascript
  beforeEach(() => {
    cy.startServerMock()
  })
```

### stopServerMock

Use it after each of your test. It cleans all active mocks. 
Also, it logs still active mocks before cleaning if you're indebug mode. 
```javascript
  afterEach(() => {
    cy.stopServerMock()
  })
```
### mockRequest

Use it like `cy.route` command. 
```javascript
  cy.mockRequest({
      method: 'GET',
      url: '/api/user',
      status: 200,
      response: {
        username: 'johndoe'
      }
  })
```

