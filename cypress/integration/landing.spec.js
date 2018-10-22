describe('Landing page', function () {
  beforeEach(() => {
    cy.visit('/', { timeout: 180000 })
  })

  it('can be opened', function () {
    cy.contains('JW Management')
  })

  it('has a working signIn button', function () {
    cy.get('#signIn').click()

    cy.location().should(location => {
      expect(location.pathname).to.eq('/en/login')
    })
  })

  it('has a working signUp button', function () {
    cy.get('#signUp').click()

    cy.location().should(location => {
      expect(location.pathname).to.eq('/en/signup')
    })
  })
})
