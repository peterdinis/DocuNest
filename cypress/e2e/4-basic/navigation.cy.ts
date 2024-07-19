describe('Navigation Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should render the navigation bar', () => {
        cy.get('nav').should('exist');
    });

    it('should navigate to the register page', () => {
        cy.contains('Sign Up').click();
        cy.visit('http://localhost:3000/register');
    });

    it('should navigate to the login page', () => {
        cy.contains('Login').click();
        cy.visit('http://localhost:3000/login');
    });
});
