describe('Строка', () => {

    before(() => {
        cy.visit('/recursion');
    });

    it('Кнопка не доступна, если инпут пуст', () => {

        cy.get('input[class^="input_input"]').first().as('input');
        cy.get('button[data-testid="button"]').first().as('submit_button');

        cy.log('При открытии кнопка заблокирована');
        cy.get('@submit_button').should('exist').and('be.disabled');

        cy.log('Если input не пустой, то кнопка доступна');
        cy.get('@input').type('a');
        cy.get('@submit_button').should('be.enabled');

        cy.log('Если input пустой, то кнопка недоступна');
        cy.get('@input').clear();
        cy.get('@submit_button').should('be.disabled');
    });

    it('Строка разворачивается корректно', () => {

        cy.clock();
        const DELAY = 500;

        cy.get('input[class^="input_input"]').type('ab');
        cy.get('button[data-testid="button"]').should('be.enabled').click();

        cy.get('div[class*="circle_circle"]').first().should('be.exist').as("firstCircle");
        cy.get('div[class*="circle_circle"]').last().should('be.exist').as("lastCircle");

        cy.get('p[data-testid="circle_value"]').first().as('firstValue');
        cy.get('p[data-testid="circle_value"]').last().as('lastValue');

        cy.log('Начальное состояние');
        cy.get('@firstValue').should('be.exist').contains('a');
        cy.get('@lastValue').should('be.exist').contains('b');

        cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');
        cy.get('@lastCircle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');

        cy.log('Шаг 1 - 1 круг in-progress');
        cy.tick(DELAY);
        cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');

        cy.log('Шаг-2 - 2 in-progress');
        cy.tick(DELAY);
        cy.get('@lastCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');

        cy.log('шаг-3 - 1 круг изменен, значения финальные');
        cy.tick(DELAY);
        cy.get('@firstCircle').should('have.css', 'border', '4px solid rgb(127, 224, 81)');
        cy.get('@firstValue').contains('b');
        cy.get('@lastValue').contains('a');

        cy.log('Шаг - 4 - Стиль 2 круг изменен');
        cy.tick(DELAY);
        cy.get('@lastCircle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');
        cy.tick(DELAY);        
        cy.get('@lastCircle').should('have.css', 'border', '4px solid rgb(127, 224, 81)');

        cy.clock().invoke('restore');
    });
});