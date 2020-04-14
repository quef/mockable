const mockableUrl = Cypress.env('mockableUrl') || 'http://localhost:3001/_mock'

Cypress.Commands.add('startServerMock', () => {
    cy.request('POST', `${mockableUrl}/start`)
})
Cypress.Commands.add('stopServerMock', () => {
    cy.request('POST', `${mockableUrl}/stop`)
})

Cypress.Commands.add('mockRequest', mock => {
    return cy.request('POST', `${mockableUrl}/mocks`, mock)
})