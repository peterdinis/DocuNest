describe('Navigation Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should render the navigation bar', () => {
        cy.get('nav').should('exist');
    });

    it('should navigate to the login page', () => {
        cy.get('nav').contains('Login').click();
        cy.url().should('include', '/login');
    });

    it('should navigate to the register page', () => {
        cy.get('nav').contains('Sign Up').click();
        cy.url().should('include', '/register');
    });

    it('should show services and pricing links for logged-out users', () => {
        cy.get('nav').contains('Services').should('exist');
        cy.get('nav').contains('Pricing').should('exist');
    });

    it('should not show profile and logout options for logged-out users', () => {
        cy.get('nav').contains('Profile').should('not.exist');
        cy.get('nav').contains('Logout').should('not.exist');
    });
});