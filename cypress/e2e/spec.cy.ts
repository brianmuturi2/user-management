describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Users')
  })

  it('has the correct title', () => {
    cy.title().should('equal', 'UserManagement');
  });

  it('should have navigation toggle', () => {
    cy.get('[data-testid="menu-button"]').click();
  })

  it('should have dark theme', () => {
    cy.get('[data-testid="mode-button"]').click();
  })

  it('should download users', () => {
    cy.get('[data-testid="csv-button"]').click();
  })
})
