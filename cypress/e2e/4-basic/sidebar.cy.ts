describe('Sidebar Component', () => {
    beforeEach(() => {
      // Visit the page where the Sidebar component is rendered
      cy.visit('http://localhost:3000/dashboard'); // Adjust this URL to your application's route where Sidebar is present
    });
  
    it('should render the Sidebar component and handle collapse/expand', () => {
      // Check if the sidebar is initially rendered and not collapsed
      cy.get('div.grid').should('exist');
      cy.get('button').contains('XCircle').should('exist'); // Ensure that the expanded icon is present
  
      // Check if the sidebar is expanded
      cy.get('div').contains('Docu Nest').should('be.visible');
      cy.get('button').contains('Logout').should('be.visible');
      cy.get('button').contains('Create new document').should('be.visible');
      cy.get('button').contains('Create new folder').should('be.visible');
      cy.get('button').contains('All my folders').should('be.visible');
      cy.get('button').contains('All my documents').should('be.visible');
      cy.get('button').contains('Settings').should('be.visible');
  
      // Click the collapse button
      cy.get('button').contains('XCircle').click();
  
      // Check if the sidebar is collapsed
      cy.get('button').contains('Menu').should('exist');
      cy.get('div').contains('Docu Nest').should('not.exist');
      cy.get('button').contains('Logout').should('not.exist');
      cy.get('button').contains('Create new document').should('not.exist');
      cy.get('button').contains('Create new folder').should('not.exist');
      cy.get('button').contains('All my folders').should('not.exist');
      cy.get('button').contains('All my documents').should('not.exist');
      cy.get('button').contains('Settings').should('not.exist');
  
      // Click the expand button
      cy.get('button').contains('Menu').click();
  
      // Check if the sidebar is expanded again
      cy.get('button').contains('XCircle').should('exist');
      cy.get('div').contains('Docu Nest').should('be.visible');
      cy.get('button').contains('Logout').should('be.visible');
      cy.get('button').contains('Create new document').should('be.visible');
      cy.get('button').contains('Create new folder').should('be.visible');
      cy.get('button').contains('All my folders').should('be.visible');
      cy.get('button').contains('All my documents').should('be.visible');
      cy.get('button').contains('Settings').should('be.visible');
    });
  
    it('should navigate to the correct pages', () => {
      // Test navigation for the sidebar links
      cy.get('button').contains('Create new document').click();
      cy.url().should('include', '/documents/new');
  
      cy.visit('http://localhost:3000'); // Return to the main page
  
      cy.get('button').contains('Create new folder').click();
      cy.get('button').contains('Create new folder').click(); // This will open the modal
      cy.get('div').contains('Create Folder Modal').should('exist'); // Adjust this to match your modal content
  
      cy.get('button').contains('All my folders').click();
      cy.url().should('include', '/folders/all');
  
      cy.visit('http://localhost:3000'); // Return to the main page
  
      cy.get('button').contains('All my documents').click();
      cy.url().should('include', '/dashboard');
  
      cy.visit('http://localhost:3000'); // Return to the main page
  
      cy.get('button').contains('Settings').click();
      cy.url().should('include', '/settings');
    });
  
    it('should handle tooltips correctly in the collapsed state', () => {
      // Collapse the sidebar
      cy.get('button').contains('XCircle').click();
  
      // Check tooltip visibility
      cy.get('button').contains('Logout').trigger('mouseover');
      cy.get('.nextui-tooltip').should('contain', 'Logout');
  
      cy.get('button').contains('Create new folder').trigger('mouseover');
      cy.get('.nextui-tooltip').should('contain', 'Create new folder');
  
      cy.get('button').contains('Create new document').trigger('mouseover');
      cy.get('.nextui-tooltip').should('contain', 'Create new document');
  
      cy.get('button').contains('All my folders').trigger('mouseover');
      cy.get('.nextui-tooltip').should('contain', 'All my folders');
  
      cy.get('button').contains('All my documents').trigger('mouseover');
      cy.get('.nextui-tooltip').should('contain', 'All my documents');
  
      cy.get('button').contains('Settings').trigger('mouseover');
      cy.get('.nextui-tooltip').should('contain', 'Settings page');
    });
  });