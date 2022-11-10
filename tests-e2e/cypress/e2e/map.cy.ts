describe('Map operations', () => {
  const inputCoordnatesPath = 'input.cyCoordinatesIn';
  const inputFilesPath = 'input.cyFilesIn';
  const inputMapRangePath = 'input.cyMapRange';
  const buttonReadDataPath = 'input.cyReadData';
  const buttonMapRangeCheckPath = 'input.cyMapRangeCheck';
  const buttonMapShowPath = 'button.cyMapShow';
  const buttonMapHidePath = 'button.cyMapHide';
  const outputMapContainerPath = 'fieldset.cyMapContainer';
  const outputTableRowPath = 'tr.cyOutputTableRow';
  const outputTableRowCheckerPath = '[data-label="Map"] input';

  beforeEach(() => {
    cy.visit('/');

    cy.get(inputCoordnatesPath).type('50.0427275,14.5305269');

    cy.get(inputFilesPath).selectFile('cypress/fixtures/inputFile2.txt');

    cy.get(buttonMapRangeCheckPath).should('be.disabled');

    cy.get(buttonMapShowPath).should('be.disabled');

    cy.get(buttonMapHidePath).should('be.disabled');

    cy.get(buttonReadDataPath).click();

    cy.get(outputTableRowPath)
      .should('exist')
      .should('be.visible')
      .should('have.length', 8);

    cy.get(inputMapRangePath).should('exist').should('be.visible');

    cy.get(buttonMapRangeCheckPath).should('not.be.disabled');

    cy.get(buttonMapShowPath).should('not.be.disabled');

    cy.get(buttonMapHidePath).should('not.be.disabled');
  });

  it('Should check places in certain distance from input coordinates', () => {
    cy.get(outputTableRowPath).should((tableRows) => {
      tableRows.each((pos, row) => {
        const checker = cy.$$(outputTableRowCheckerPath, row);

        expect(checker).to.be.visible;

        expect(checker).not.to.be.checked;
      });
    });

    cy.get(inputMapRangePath).clear().type('{selectall}-10');

    cy.get(buttonMapRangeCheckPath).click();

    cy.get(outputTableRowPath).should((tableRows) => {
      tableRows.each((pos, row) => {
        const checker = cy.$$(outputTableRowCheckerPath, row);

        expect(checker).to.be.visible;

        expect(checker).not.to.be.checked;
      });
    });

    cy.get(inputMapRangePath).clear().type('{selectall}120');

    cy.get(buttonMapRangeCheckPath).click();

    cy.get(outputTableRowPath).should((tableRows) => {
      tableRows.each((pos, row) => {
        const checker = cy.$$(outputTableRowCheckerPath, row);

        expect(checker).to.be.visible;

        if (pos < 3) {
          expect(checker).to.be.checked;
        } else {
          expect(checker).not.to.be.checked;
        }
      });
    });

    cy.get(inputMapRangePath).clear().type('{selectall}100000');

    cy.get(buttonMapRangeCheckPath).click();

    cy.get(outputTableRowPath).should((tableRows) => {
      tableRows.each((pos, row) => {
        const checker = cy.$$(outputTableRowCheckerPath, row);

        expect(checker).to.be.visible;

        expect(checker).to.be.checked;
      });
    });
  });

  it('Should show map with input coordinates and selected points from table and then hide the map', () => {
    cy.get(inputMapRangePath).clear().type('{selectall}120');

    cy.get(buttonMapRangeCheckPath).click();

    cy.get(outputMapContainerPath).should('not.exist');

    cy.get(buttonMapShowPath).click();

    cy.get(outputMapContainerPath).should('exist').should('be.visible');

    cy.get(outputMapContainerPath + ' .leaflet-marker-pane img')
      .should('exist')
      .should('have.length', 4);

    cy.get(buttonMapHidePath).click();

    cy.get(outputMapContainerPath).should('not.exist');
  });
});
