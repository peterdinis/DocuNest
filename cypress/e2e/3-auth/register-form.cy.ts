describe('RegisterForm', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
    });

    it('should render the registration form', () => {
        cy.get('form').should('exist');
        cy.get('input#name').should('exist');
        cy.get('input#email').should('exist');
        cy.get('input[type="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist');
    });

    it('should show validation errors for empty fields', () => {
        cy.get('button[type="submit"]').click();

        cy.get('input#name:invalid').should('exist');
        cy.get('input#email:invalid').should('exist');
        cy.get('input[type="password"]:invalid').should('exist');
    });

    it('should show validation errors for invalid email', () => {
        cy.get('input#name').type('John Doe');
        cy.get('input#email').type('invalid-email');
        cy.get('input[type="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.get('input#email:invalid').should('exist');
    });

    it('should register successfully with valid inputs', () => {
        cy.intercept('POST', '/api/register', {
            statusCode: 200,
            body: { message: 'Registration successful' },
        }).as('registerUser');

        cy.get('input#name').type('John Doe');
        cy.get('input#email').type('john.doe@example.com');
        cy.get('input[type="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.wait('@registerUser').then((interception) => {
            expect(interception.response!.statusCode).to.eq(200);
        });

        cy.get('.Toastify__toast--success').should('contain', 'Registration successful');
    });

    it('should handle registration failure', () => {
        cy.intercept('POST', '/api/register', {
            statusCode: 400,
            body: { message: 'Registration failed' },
        }).as('registerUserFail');

        cy.get('input#name').type('John Doe');
        cy.get('input#email').type('john.doe@example.com');
        cy.get('input[type="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.wait('@registerUserFail').then((interception) => {
            expect(interception.response!.statusCode).to.eq(400);
        });

        cy.get('.Toastify__toast--error').should('contain', 'Registration failed');
    });

    it('should toggle password visibility', () => {
        cy.get('input[type="password"]').should('have.attr', 'type', 'password');
        cy.get('button[type="button"]').click();
        cy.get('input[type="text"]').should('have.attr', 'type', 'text');
    });
});