describe('Application Functionality Check', () => {
  it('The application should successfully start up', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1').should('contain', 'МБОУ АЛГОСОШ');
  });
});