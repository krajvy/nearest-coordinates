describe('Help expander test', () => {
  it('Will expand after Show help clicked and will close after Hide help clicked', () => {
    cy.visitProject();

    const openButtonPath = '.cyHelp button.cyHelpBtnOpen';
    const closeButtonPath = '.cyHelp button.cyHelpBtnClose';
    const helpTextPath = '.cyHelp div.cyHelpText';

    cy.get(helpTextPath).should('not.exist');

    cy.get(closeButtonPath).should('not.exist');

    cy.get(openButtonPath)
      .should('exist')
      .should('be.visible')
      .should('have.length', 1)
      .should('have.text', 'Show help ' + String.fromCharCode(9656));

    cy.get(openButtonPath).click();

    cy.wait(500);

    cy.get(openButtonPath).should('not.exist');

    cy.get(helpTextPath).should('exist').should('be.visible');

    cy.get(closeButtonPath)
      .should('exist')
      .should('be.visible')
      .should('have.length', 2)
      .should((closeButtons) => {
        closeButtons.each((pos, btn) => {
          expect(btn).to.have.text('Hide help ' + String.fromCharCode(9666));
        });
      });

    cy.get(closeButtonPath).should((closeButtons) => {
      closeButtons.eq(1).click();
    });

    cy.wait(500);

    cy.get(helpTextPath).should('not.exist');

    cy.get(closeButtonPath).should('not.exist');

    cy.get(openButtonPath)
      .should('exist')
      .should('be.visible')
      .should('have.length', 1)
      .should('have.text', 'Show help ' + String.fromCharCode(9656));
  });
});
