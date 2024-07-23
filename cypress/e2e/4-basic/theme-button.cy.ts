describe('ThemeButton Component', () => {
    beforeEach(() => {
      // Visit the page where the ThemeButton is used
      cy.visit('http://localhost:3000'); // Adjust this to the correct route
    });
  
    it('should toggle between light and dark themes', () => {
      // Ensure the theme button is rendered
      cy.get('[data-cy="theme-button"]').should('exist');
  
      // Verify initial state (assuming initial theme is light)
      cy.get('[data-cy="theme-button"]').should('have.class', 'bg-teal-500'); // Check initial background color for light theme
      cy.get('#toggleBtnTheme').should('have.class', 'translate-x-8'); // Check initial position for light theme
  
      // Simulate a click to toggle theme
      cy.get('[data-cy="theme-button"]').click();
  
      // Verify the theme button state after click
      cy.get('[data-cy="theme-button"]').should('have.class', 'bg-gray-700'); // Check background color for dark theme
      cy.get('#toggleBtnTheme').should('have.class', 'translate-x-0'); // Check position for dark theme
  
      // Simulate another click to toggle back
      cy.get('[data-cy="theme-button"]').click();
  
      // Verify the theme button state after the second click
      cy.get('[data-cy="theme-button"]').should('have.class', 'bg-teal-500'); // Check background color for light theme again
      cy.get('#toggleBtnTheme').should('have.class', 'translate-x-8'); // Check position for light theme again
    });
  });