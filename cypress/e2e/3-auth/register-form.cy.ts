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
        cy.intercept('POST', '/api/register', { statusCode: 200 }).as('registerUser');
        
        cy.get('input[id="name"]').type('John Doe');
        cy.get('input[id="email"]').type('john.doe@example.com');
        cy.get('input[id="password"]').type('password123');
        
        cy.get('button[type="submit"]').click();

        cy.wait('@registerUser').its('response.statusCode').should('eq', 200);
        cy.url().should('include', '/login');
        cy.contains('Registration successful').should('exist');
    });

    it('should show validation errors for invalid form data', () => {
        cy.get('button[type="submit"]').click();
        
        cy.get('p').should('contain.text', 'Name is required');
        cy.get('p').should('contain.text', 'Email is required');
        cy.get('p').should('contain.text', 'Password is required');
    });

    it('should toggle password visibility', () => {
        cy.visit('http://localhost:3000/register');
    
        // Ensure the password input is initially of type 'password'
        cy.get('input[id="password"]').should('have.attr', 'type', 'password');
    
        // Click the visibility toggle button (Eye icon)
        cy.get('button').contains('Eye').click();
    
        // Check if the input type is now 'text'
        cy.get('input[id="password"]').should('have.attr', 'type', 'text');
    
        // Click the visibility toggle button (EyeOff icon)
        cy.get('button').contains('EyeOff').click();
    
        // Check if the input type is back to 'password'
        cy.get('input[id="password"]').should('have.attr', 'type', 'password');
    });

    it('should navigate to the login page when clicking the login link', () => {
        cy.visit('http://localhost:3000/register');
    
        // Click the link to navigate to the login page
        cy.get('a[href="/login"]').click();
    
        // Verify that the URL includes '/login'
        cy.url().should('include', '/login');
    });
});