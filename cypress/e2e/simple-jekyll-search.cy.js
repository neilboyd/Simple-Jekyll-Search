describe('Simple Jekyll Search', function () {
  it('Searching a Post', function () {
    cy.visit('/')

    cy.get('#search-input')
      .type('This')

    cy.get('#results-container')
      .contains('This is just a test')
  })

  it('Searching a Post follows link with query', function () {
    cy.visit('/')

    cy.get('#search-input')
      .type('This')

    cy.get('#results-container')
      .contains('This is just a test')
      .click()

    cy.url().should('include', '?query=This')
  })

  it('No results found', function () {
    cy.visit('/')

    cy.get('#search-input')
      .type('404')

    cy.contains('No results found')
  })

  it('Search Turkish highlights correct text', function () {
    cy.visit('/')

    cy.get('#search-input')
      .type('test')

    cy.get('b').contains('test').should('have.length', 1)
    cy.get('b').contains('test').should('have.text', 'test')
  })
})
