describe('Register Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
    });

    it('should render the register form with all required elements', () => {
        cy.get('form').should('exist');
        cy.get('input[id="name"]').should('exist');
        cy.get('input[id="email"]').should('exist');
        cy.get('input[id="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
        cy.contains('Already have an account?').should('exist');
        cy.get('a[href="/login"]').should('exist');
    });

    it('should successfully submit the form with valid data', () => {
        cy.intercept('POST', '/api/register', { statusCode: 200 }).as(
            'registerUser',
        );

        cy.get('input[id="name"]').type('John Doe');
        cy.get('input[id="email"]').type('john.doe@example.com');
        cy.get('input[id="password"]').type('password123');

        cy.get('button[type="submit"]').click();

        cy.wait('@registerUser').its('response.statusCode').should('eq', 200);
        cy.url().should('include', '/login');
        cy.contains('Registration successful').should('exist');
    });

    it('should not submit the form and show validation errors if some fields are missing', () => {
        cy.intercept('POST', '/api/register').as('registerUser');

        cy.get('input[id="name"]').type('John Doe');
        cy.get('input[id="email"]').type('john.doe@example.com');
        cy.get('button[type="submit"]').click();

        cy.get('p')
            .should('contain.text', 'Password is required')
            .should('exist');
    });
});
