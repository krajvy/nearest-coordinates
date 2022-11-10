describe('Input coordinates and files test', () => {
  let windowErrorSpy: Cypress.Agent<sinon.SinonSpy>;

  Cypress.on('window:before:load', (win) => {
    windowErrorSpy = cy.spy(win.console, 'error');
  });

  const DELAY = 1000;

  const inputCoordnatesPath = 'input.cyCoordinatesIn';
  const inputFilesPath = 'input.cyFilesIn';
  const buttonReadDataPath = 'input.cyReadData';
  const outputTableRowPath = 'tr.cyOutputTableRow';
  const outputTableRowCoordinatesPath = '[data-label="Coordinates"]';
  const outputTableRowDistancePath = '[data-label="Distance"]';
  const outputTableRowAzimuthPath =
    '[data-label="Azimuth"] .cyOutputTableRowAzimuth';

  beforeEach(() => {
    cy.visit('/');
  });

  it('Should log an error when no input coordinates and no files are given', () => {
    cy.get(buttonReadDataPath).click();

    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).to.be.calledOnce;
    });

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when input coordinates are OK and no files given', () => {
    cy.get(inputCoordnatesPath).type('50.0427275,14.5305269');

    cy.get(buttonReadDataPath).click();

    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).to.be.calledOnce;
    });

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when no input coordinates given and file is OK', () => {
    cy.get(inputFilesPath).selectFile('cypress/fixtures/inputFile1.txt');

    cy.get(buttonReadDataPath).click();

    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).to.be.calledOnce;
    });

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when no input coordinates given and files are OK', () => {
    cy.get(inputFilesPath).selectFile([
      'cypress/fixtures/inputFile1.txt',
      'cypress/fixtures/inputFile2.txt',
    ]);

    cy.get(buttonReadDataPath).click();

    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).to.be.calledOnce;
    });

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when input coordinates are OK and input file is wrong', () => {
    cy.get(inputCoordnatesPath).type('50.0427275,14.5305269');

    cy.get(inputFilesPath).selectFile('cypress/fixtures/logo.png');

    cy.get(buttonReadDataPath).click();

    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).to.be.calledOnce;
    });
  });

  it('Should log an error when input coordinates are OK and one of input files is OK and other is wrong', () => {
    cy.get(inputCoordnatesPath).type('50.0427275,14.5305269');

    cy.get(inputFilesPath).selectFile([
      'cypress/fixtures/inputFile1.txt',
      'cypress/fixtures/logo.png',
    ]);

    cy.get(buttonReadDataPath).click();

    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).to.be.calledOnce;
    });
  });

  it('Should view a table with data when input coordinates is OK and input file is OK', () => {
    const fixtureFile1Data = [
      {
        coordinates: '50.73611,15.74028',
        distance: '115',
        azimuth: '048',
      },
      {
        coordinates: '43.92833,12.45222',
        distance: '697',
        azimuth: '194',
      },
      {
        coordinates: '48.16,24.50028',
        distance: '754',
        azimuth: '102',
      },
      {
        coordinates: '61.63639,8.3125',
        distance: '1344',
        azimuth: '346',
      },
    ];

    cy.get(inputCoordnatesPath).type('50.0427275,14.5305269');

    cy.get(inputFilesPath).selectFile('cypress/fixtures/inputFile1.txt');

    cy.get(buttonReadDataPath).click();

    cy.get(outputTableRowPath)
      .should('exist')
      .should('be.visible')
      .should('have.length', 4)
      .should((tableRows) => {
        tableRows.each((pos, row) => {
          const coordinates = cy.$$(outputTableRowCoordinatesPath, row);
          const distance = cy.$$(outputTableRowDistancePath, row);
          const azimuth = cy.$$(outputTableRowAzimuthPath, row);

          expect(coordinates).to.be.visible;
          expect(distance).to.be.visible;
          expect(azimuth).to.be.visible;

          expect(coordinates).to.have.text(fixtureFile1Data[pos].coordinates);
          expect(distance).to.have.text(fixtureFile1Data[pos].distance + ' km');
          expect(azimuth).to.have.text(fixtureFile1Data[pos].azimuth + ' °');
        });
      });

    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).not.to.be.called;
    });
  });
  it('Should view a table with data when input coordinates is OK and input files are OK', () => {
    const fixtureFile1Data = [
      {
        coordinates: '50.73289,14.98548',
        distance: '83',
        azimuth: '023',
      },
      {
        coordinates: '50.88902,15.27313',
        distance: '107',
        azimuth: '029',
      },
      {
        coordinates: '50.73611,15.74028',
        distance: '115',
        azimuth: '048',
      },
      {
        coordinates: '50.39646,12.96762',
        distance: '117',
        azimuth: '290',
      },
      {
        coordinates: '48.97882,14.0118',
        distance: '124',
        azimuth: '198',
      },
      {
        coordinates: '50.30131,16.39766',
        distance: '136',
        azimuth: '077',
      },
      {
        coordinates: '49.38319,12.78401',
        distance: '145',
        azimuth: '240',
      },
      {
        coordinates: '48.77139,13.85684',
        distance: '149',
        azimuth: '199',
      },
      {
        coordinates: '50.05676,16.81287',
        distance: '162',
        azimuth: '089',
      },
      {
        coordinates: '43.92833,12.45222',
        distance: '697',
        azimuth: '194',
      },
      {
        coordinates: '48.16,24.50028',
        distance: '754',
        azimuth: '102',
      },
      {
        coordinates: '61.63639,8.3125',
        distance: '1344',
        azimuth: '346',
      },
    ];

    cy.get(inputCoordnatesPath).type('50.0427275,14.5305269');

    cy.get(inputFilesPath).selectFile([
      'cypress/fixtures/inputFile1.txt',
      'cypress/fixtures/inputFile2.txt',
    ]);

    cy.get(buttonReadDataPath).click();

    cy.get(outputTableRowPath)
      .should('exist')
      .should('be.visible')
      .should('have.length', 12)
      .should((tableRows) => {
        tableRows.each((pos, row) => {
          const coordinates = cy.$$(outputTableRowCoordinatesPath, row);
          const distance = cy.$$(outputTableRowDistancePath, row);
          const azimuth = cy.$$(outputTableRowAzimuthPath, row);

          expect(coordinates).to.be.visible;
          expect(distance).to.be.visible;
          expect(azimuth).to.be.visible;

          expect(coordinates).to.have.text(fixtureFile1Data[pos].coordinates);
          expect(distance).to.have.text(fixtureFile1Data[pos].distance + ' km');
          expect(azimuth).to.have.text(fixtureFile1Data[pos].azimuth + ' °');
        });
      });

    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).not.to.be.called;
    });
  });
});
