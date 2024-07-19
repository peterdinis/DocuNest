describe('Login Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
        cy.get('form').should('exist');
        cy.get('input[id="name"]').should('exist');
        cy.get('input[id="email"]').should('exist');
        cy.get('input[id="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
        cy.contains('Already have an account?').should('exist');
        cy.get('a[href="/login"]').should('exist');
        cy.visit('http://localhost:3000/login');
    });

    it('should render the login form with all required elements', () => {
        cy.get('form').should('exist');
        cy.get('input[id="email"]').should('exist');
        cy.get('input[id="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
        cy.contains('Don\'t have an account?').should('exist');
        cy.get('a[href="/register"]').should('exist');
    });

    it('should successfully submit the form with valid data', () => {
        cy.intercept('POST', '/api/login', { statusCode: 200 }).as('loginUser');
        
        cy.get('input[id="email"]').type('john.doe@example.com');
        cy.get('input[id="password"]').type('password123');
        
        cy.get('button[type="submit"]').click();

        cy.wait('@loginUser').its('response.statusCode').should('eq', 200);
        cy.url().should('not.include', '/login'); // Assuming a successful login redirects away from /login
        cy.contains('Login successful').should('exist');
    });

    it('should not submit the form and show validation errors if some fields are missing', () => {
        cy.intercept('POST', '/api/login').as('loginUser');

        cy.get('input[id="email"]').type('john.doe@example.com');
        // Leave password field empty

        cy.get('button[type="submit"]').click();

        // Check that the validation error for password is displayed
        cy.get('p').should('contain.text', 'String must contain at least 1 character(s)').should('exist');
        
        // Verify that no request was sent to the server
        cy.wait('@loginUser').then((interception) => {
            expect(interception.response!.statusCode).to.be.oneOf([null, 0]);
        });

        // Optionally, check that the form fields have not been cleared or altered
        cy.get('input[id="email"]').should('have.value', 'john.doe@example.com');
        cy.get('input[id="password"]').should('have.value', '');
    });
});