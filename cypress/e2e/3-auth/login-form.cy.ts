describe('LoginForm', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    });

    it('should render the login form', () => {
        cy.get('form').should('exist');
        cy.get('input#email').should('exist');
        cy.get('input[type="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('should show validation errors for empty fields', () => {
        cy.get('button[type="submit"]').click();

        cy.get('input#email:invalid').should('exist');
        cy.get('input[type="password"]:invalid').should('exist');
    });

    it('should show validation errors for invalid email', () => {
        cy.get('input#email').type('invalid-email');
        cy.get('input[type="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.get('input#email:invalid').should('exist');
    });

    it('should show error for incorrect login details', () => {
        cy.intercept('POST', '/api/auth/callback/credentials', {
            statusCode: 401,
            body: { error: 'Invalid credentials' },
        }).as('loginRequest');

        cy.get('input#email').type('john.doe@example.com');
        cy.get('input[type="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');
        cy.get('.Toastify__toast--error').should('contain', 'Login error: Invalid credentials');
    });

    it('should login successfully with correct details', () => {
        cy.intercept('POST', '/api/auth/callback/credentials', {
            statusCode: 200,
            body: { success: true },
        }).as('loginRequest');

        cy.get('input#email').type('john.doe@example.com');
        cy.get('input[type="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.wait('@loginRequest');
        cy.get('.Toastify__toast--success').should('contain', 'Login successful!');
        cy.url().should('include', '/dashboard');
    });

    it('should toggle password visibility', () => {
        cy.get('input[type="password"]').should('have.attr', 'type', 'password');
        cy.get('button[type="button"]').click();
        cy.get('input[type="text"]').should('have.attr', 'type', 'text');
    });
});