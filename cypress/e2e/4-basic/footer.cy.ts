describe('Footer Component', () => {
    beforeEach(() => {
      // Visit the page where the Footer component is rendered
      cy.visit('http://localhost:3000'); // Adjust this URL to your application's route where Footer is present
    });
  
    it('should render the Footer component and handle animation correctly', () => {
      // Check if the footer is rendered
      cy.get('footer').should('exist');
  
      // Verify the initial state of the footer
      cy.get('footer')
        .should('have.class', 'relative')
        .and('have.class', 'mt-4')
        .and('have.class', 'dark:bg-background');
  
      // Verify the text inside the footer
      cy.get('footer').contains('&copy; Docu Nest 2024').should('be.visible');
  
      // Check if the footer is initially hidden due to animation
      cy.get('footer').should('have.css', 'opacity', '0');
  
      // Use Cypress's built-in wait to account for animation delay
      cy.wait(500); // Wait for animation delay
  
      // Verify the footer is visible after the animation
      cy.get('footer').should('have.css', 'opacity', '1');
    });
  
    it('should scale the text on hover', () => {
      // Verify the text scaling effect
      cy.get('footer')
        .find('span')
        .should('have.css', 'transform', 'none'); // Initial state without scale
  
      // Hover over the span
      cy.get('footer')
        .find('span')
        .trigger('mouseover')
        .should('have.css', 'transform', 'matrix(1.1, 0, 0, 1.1, 0, 0)'); // Check for scale effect on hover
  
      // Remove hover
      cy.get('footer')
        .find('span')
        .trigger('mouseout')
        .should('have.css', 'transform', 'none'); // Check for original transform
    });
  });