describe('Стек', () => {

    beforeEach(() => {
        cy.visit('/stack');
        cy.get('button[data-testid="button"]').contains('button', 'Добавить').should('be.exist').as('add_button');
        cy.get('button[data-testid="button"]').contains('button', 'Удалить').should('be.exist').as('delete_button');
        cy.get('button[data-testid="button"]').contains('button', 'Очистить').should('be.exist').as('clear_button');

        cy.get('input[class^="input_input"]').should('be.exist').as('input');
        cy.get('@input').clear();
    });

    it('Доступность добавления', () => {
        cy.get('@add_button').should('be.disabled');
        cy.get('@input').type('abc');
        cy.get('@add_button').should('be.enabled');
    });

    it('Анимация добавления в стек', () => {

        cy.get('@input').type('abc');
        cy.get('@add_button').should('be.enabled').click();

        cy.get('div[class^="circle_circle"]')
            .should('be.exist')
            .as('value');

        //default
        cy.get('@value').should('have.css', 'border', '4px solid rgb(210, 82, 225)');

        //modified
        cy.get('@value').should('have.css', 'border', '4px solid rgb(0, 50, 255)')
    });

    it('Удаление из стека', () => {

        cy.get('@input').type('efg');
        cy.get('@add_button').should('be.enabled').click();        

        cy.get('[data-testid="circle_value"').should('be.exist').as('value');

        cy.get('@delete_button').click();

        cy.get('div[class^="circle_circle').should('not.be.exist');
    });
    
    it('Кнопка очистить',()=>{

        cy.get('@input').type('a');
        cy.get('@add_button').should('be.enabled').click();

        cy.get('@input').should('be.enabled');
        cy.get('@input').type('b');
        cy.get('@add_button').should('be.enabled').click();

        cy.get('@input').should('be.enabled');
        cy.get('@input').type('c');
        cy.get('@add_button').should('be.enabled').click();

        cy.get('[data-testid="circle_value"]').should('be.exist');

        cy.get('@clear_button').should('be.enabled').click();

        cy.get('[data-testid="circle_value"]').should('not.be.exist');
        cy.get('@clear_button').should('be.disabled');  
    });
})