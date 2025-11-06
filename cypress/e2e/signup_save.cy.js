describe('Signup and Save Flow', ()=>{
  it('allows user to signup and save an article', ()=>{
    cy.visit('/signup')
    cy.get('input[name=name]').type('Tester')
    cy.get('input[name=email]').type('tester@example.com')
    cy.get('input[name=password]').type('password123')
    cy.contains('Create Account').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    // Wait for home to load articles and click first Save
    cy.wait(1000)
    cy.get('.article-card').first().within(()=>{ cy.contains('Save').click() })
    cy.visit('/saved')
    cy.contains('Saved Articles')
    cy.get('[data-test-saved]').should('exist')
  })
})
