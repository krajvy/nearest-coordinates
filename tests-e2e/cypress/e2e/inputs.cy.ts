describe('Input coordinates and files test', () => {
  let windowErrorSpy: Cypress.Agent<sinon.SinonSpy>;

  Cypress.on('window:before:load', (win) => {
    windowErrorSpy = cy.spy(win.console, 'error');
  });

  const DELAY = 1000;

  const inputCoordinatesPath = 'input.cyCoordinatesIn';
  const inputFilesPath = 'input.cyFilesIn';
  const buttonReadDataPath = 'input.cyReadData';
  const outputTableRowPath = 'tr.cyOutputTableRow';
  const filesTablePath = 'table.cyFilesTable';
  const outputTableRowCoordinatesPath = '[data-label="Coordinates"]';
  const outputTableRowDistancePath = '[data-label="Distance"]';
  const outputTableRowAzimuthPath =
    '[data-label="Azimuth"] .cyOutputTableRowAzimuth';

  beforeEach(() => {
    cy.visit('/');
  });

  it('Should log an error when no input coordinates and no files are given', () => {
    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', '');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputCoordinatesPath).invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.');

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputFilesPath).invoke('prop', 'validationMessage').should('equal', 'Please select one or more files.');

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when incorrect input coordinates and no files are given', () => {
    cy.get(inputCoordinatesPath).type('this is no coordinates');

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', 'this is no coordinates');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputCoordinatesPath).invoke('prop', 'validationMessage').should('equal', 'Please match the requested format.');

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputFilesPath).invoke('prop', 'validationMessage').should('equal', 'Please select one or more files.');

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when input coordinates are OK and no files given', () => {
    cy.get(inputCoordinatesPath).type('50.0427275,14.5305269');

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', '50.0427275,14.5305269');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputFilesPath).invoke('prop', 'validationMessage').should('equal', 'Please select one or more files.');

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when no input coordinates and file is OK', () => {
    cy.get(inputFilesPath).selectFile('cypress/fixtures/inputFile1.txt');

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', '');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputCoordinatesPath).invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.');

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when incorrect input coordinates and file is OK', () => {
    cy.get(inputFilesPath).selectFile('cypress/fixtures/inputFile1.txt');

    cy.get(inputCoordinatesPath).type('this is no coordinates');

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', 'this is no coordinates');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputCoordinatesPath).invoke('prop', 'validationMessage').should('equal', 'Please match the requested format.');

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when no input coordinates and files are OK', () => {
    cy.get(inputFilesPath).selectFile([
      'cypress/fixtures/inputFile1.txt',
      'cypress/fixtures/inputFile2.txt',
    ]);

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', '');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputCoordinatesPath).invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.');

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when incorrect input coordinates and files are OK', () => {
    cy.get(inputFilesPath).selectFile([
      'cypress/fixtures/inputFile1.txt',
      'cypress/fixtures/inputFile2.txt',
    ]);

    cy.get(inputCoordinatesPath).type('this is no coordinates');

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', 'this is no coordinates');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputCoordinatesPath).invoke('prop', 'validationMessage').should('equal', 'Please match the requested format.');

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when no input coordinates and input file is wrong', () => {
    cy.get(inputFilesPath).selectFile('cypress/fixtures/logo.png');

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', '');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputCoordinatesPath).invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.');

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when incorrect input coordinates and input file is wrong', () => {
    cy.get(inputCoordinatesPath).type('this is no coordinates');

    cy.get(inputFilesPath).selectFile('cypress/fixtures/logo.png');

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', 'this is no coordinates');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputCoordinatesPath).invoke('prop', 'validationMessage').should('equal', 'Please match the requested format.');

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when input coordinates are OK and input file is wrong', () => {
    cy.get(inputCoordinatesPath).type('50.0427275,14.5305269');

    cy.get(inputFilesPath).selectFile('cypress/fixtures/logo.png');

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', '');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', false);

    cy.get(outputTableRowPath).should('not.exist');

    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).to.be.calledTwice;
    });
  });

  it('Should log an error when no input coordinates and one of input files is OK and other is wrong', () => {
    cy.get(inputFilesPath).selectFile([
      'cypress/fixtures/inputFile1.txt',
      'cypress/fixtures/logo.png',
    ]);

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', '');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputCoordinatesPath).invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.');

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when incorrect input coordinates and one of input files is OK and other is wrong', () => {
    cy.get(inputCoordinatesPath).type('this is no coordinates');

    cy.get(inputFilesPath).selectFile([
      'cypress/fixtures/inputFile1.txt',
      'cypress/fixtures/logo.png',
    ]);

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', 'this is no coordinates');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);
    cy.get(inputCoordinatesPath).invoke('prop', 'validationMessage').should('equal', 'Please match the requested format.');

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(outputTableRowPath).should('not.exist');
  });

  it('Should log an error when input coordinates are OK and one of input files is OK and other is wrong', () => {
    cy.get(inputCoordinatesPath).type('50.0427275,14.5305269');

    cy.get(inputFilesPath).selectFile([
      'cypress/fixtures/inputFile1.txt',
      'cypress/fixtures/logo.png',
    ]);

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', '');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', false);

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', false);

    cy.get(outputTableRowPath).should('not.exist');

    cy.wait(DELAY).then(() => {
      expect(windowErrorSpy).to.be.calledTwice;
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
    const inputFileName = 'inputFile1.txt';

    cy.get(inputCoordinatesPath).type('50.0427275,14.5305269');

    cy.get(inputFilesPath).selectFile(`cypress/fixtures/${inputFileName}`);

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', '50.0427275,14.5305269');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(filesTablePath)
      .should('exist')
      .should('be.visible')
      .should('have.length', 1)
      .should((tableRows) => {
        tableRows.each((pos, row) => {
          console.log(row);
          const fileName = cy.$$(`td`, row).first();

          expect(fileName).to.be.visible;
          expect(fileName).to.have.text(inputFileName);
        });
      });

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
    const inputFileNames = ['inputFile1.txt', 'inputFile2.txt'];

    cy.get(inputCoordinatesPath).type('50.0427275,14.5305269');

    cy.get(inputFilesPath).selectFile(inputFileNames.map((fileName) => `cypress/fixtures/${fileName}`));

    cy.get(buttonReadDataPath).click();

    cy.get(inputCoordinatesPath).should('have.value', '50.0427275,14.5305269');
    cy.get(inputCoordinatesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(inputFilesPath).invoke('prop', 'validity').should('have.property', 'valid', true);

    cy.get(filesTablePath)
      .should('exist')
      .should('be.visible')
      .should('have.length', 1)
      .should((tableRows) => {
        tableRows.each((pos, row) => {
          console.log(row);
          const fileName = cy.$$(`td`, row).first();

          expect(fileName).to.be.visible;
          expect(fileName).to.have.text(inputFileNames[pos]);
        });
      });

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
  });
});
