describe('list', () => {


    beforeEach(() => {

        cy.visit('/list');

        cy.get('button[data-testid="button"]').contains('button', 'Добавить в head').should('be.exist').as('addHead_button');
        cy.get('button[data-testid="button"]').contains('button', 'Добавить в tail').should('be.exist').as('addTail_button');
        cy.get('button[data-testid="button"]').contains('button', 'Удалить из tail').should('be.exist').as('deleteTail_button');
        cy.get('button[data-testid="button"]').contains('button', 'Удалить из head').should('be.exist').as('deleteHead_button');
        cy.get('button[data-testid="button"]').contains('button', 'Добавить по индексу').should('be.exist').as('addIndex_button');
        cy.get('button[data-testid="button"]').contains('button', 'Удалить по индексу').should('be.exist').as('deleteIndex_button');


        cy.get('input[class^="input_input"][placeholder="Введите значение"]').should('be.exist').as('inputValue');
        cy.get('input[class^="input_input"][placeholder="Введите индекс"]').should('be.exist').as('inputIndex');
    })

    it('Доступность кнопок', () => {
        cy.get('@inputValue').clear();
        cy.get('@inputIndex').clear();

        cy.get('@addHead_button').should('be.disabled');
        cy.get('@addTail_button').should('be.disabled');
        cy.get('@addIndex_button').should('be.disabled');
        cy.get('@deleteIndex_button').should('be.disabled');

        cy.get('@inputValue').type('abc');
        cy.get('@addHead_button').should('be.enabled');
        cy.get('@addTail_button').should('be.enabled');

        cy.get('@inputIndex').type(0);
        cy.get('@addIndex_button').should('be.enabled');
        cy.get('@deleteIndex_button').should('be.enabled');

        cy.get('@inputValue').clear();
        cy.get('@inputIndex').clear();
    })

    it('Корректность функциональности', () => {

        const DELAY = 200;

        cy.log('Начальная отрисовка');
        cy.get('[data-testid="circle_value"]').should('be.exist');

        cy.log('Добавление элемента в head');
        cy.get('@inputValue').type('abc');

        cy.clock();
        cy.get('@addHead_button').click();

        cy.get('[class^="item_item"]:nth-child(1) > [data-testid="circle"]')
            .as('container')
            .find('[data-testid="circle"] [class^="circle_circle"]')
            .as('head_circle');

        cy.get('@head_circle')
            .should('be.exist')
            .should('have.css', 'border', '4px solid rgb(210, 82, 225)'); //малый круг в head

        cy.get('@container')
            .find('>[class^="circle_circle"]')
            .as('current_circle')
            .should('have.css', 'border', '4px solid rgb(210, 82, 225)'); //in-progress

        cy.tick(DELAY);

        cy.get('@head_circle').should('not.be.exist');

        cy.get('@current_circle').should('have.css', 'border', '4px solid rgb(127, 224, 81)'); //модифицирован        

        cy.tick(DELAY);

        cy.get('@current_circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)'); //default
        cy.get('@current_circle').contains('abc').should('be.exist');

        cy.tick(DELAY);
        cy.clock().invoke('restore');

        cy.log('Добавление элемента в tail');

        cy.get('@inputValue').type('zzz');
        cy.get('@addTail_button').click();

        cy.get('@deleteTail_button').should('be.enabled');

        cy.get('[data-testid="circle_value"]').last().contains('zzz');

        cy.log('Добавление элемента по индексу');

        cy.get('@inputValue').type('in1');
        cy.get('@inputIndex').type(0);
        cy.get('@addIndex_button').should('be.enabled').click();

        cy.get('@deleteHead_button').should('be.enabled');
        cy.get('[data-testid="circle_value"]').first().contains('in1');


        cy.log('Удаление элемента по индексу');

        cy.get('@inputIndex').type(0);
        cy.get('@deleteIndex_button').should('be.enabled').click();
        
        cy.get('@deleteHead_button').should('be.enabled');
        cy.get('[data-testid="circle_value"]').first().should('not.have.value', 'in1');

        cy.log('Удаление head');

        cy.get('@deleteHead_button').should('be.enabled').click();
        cy.get('@deleteHead_button').should('be.enabled');
        cy.get('[data-testid="circle_value"]').first().should('not.have.value', 'abc');


        cy.log('Удаление tail');

        cy.get('@deleteTail_button').should('be.enabled').click();
        cy.get('@deleteHead_button').should('be.enabled');
        cy.get('[data-testid="circle_value"]').last().should('not.have.value', 'zzz');        
    })
})