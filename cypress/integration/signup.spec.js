describe('Sign up page', function () {
  beforeEach(() => {
    cy
      .visit('/en/signup')
      .get('[name=email]').type('test@example.com')
      .get('[name=firstname]').type('Micky')
      .get('[name=lastname]').type('Mouse')
      .get('[name=username]').type('mmouse')
  })

  it('can be opened', function () {
    cy.contains('Sign up')
  })

  it('throws an error for non-matching passwords', function () {
    cy
      .get('[name=password]').type('12345678')
      .get('[name=passwordRepeat]').type('123456789')
      .get('[type=submit]').click()

    cy.get('.alert').should('be.visible').contains('The passwords do not match')
  })

  it('throws an error for too short passwords', function () {
    cy
      .get('[name=password]').type('1234567')
      .get('[name=passwordRepeat]').type('1234567')
      .get('[type=submit]').click()

    cy.get('.alert').should('be.visible').contains('The password has to have at least 8 characters')
  })

  it('can create a user account', function () {
    cy
      .get('[name=password]').type('12345678')
      .get('[name=passwordRepeat]').type('12345678')
      .get('[type=submit]').click()

    cy.get('[key=logout]').click()
  })

  it('throws an error if the username already exists', function () {
    cy
      .get('[name=password]').type('12345678')
      .get('[name=passwordRepeat]').type('12345678')
      .get('[type=submit]').click()

    cy.get('.alert').should('be.visible').contains('This username already exists')
  })

  after(function () {
    cy
      .visit('/en/login')
      .get('#usernameOrEmail').type('mmouse')
      .get('#password').type('12345678')
      .get('[type=submit]').click()
      .wait(100)

    cy
      .visit('/profile')
      .get('#deleteAccount').click()
      .wait(300)
      .get('button.confirm').click()

    cy.contains('JW Management')
  })
})
