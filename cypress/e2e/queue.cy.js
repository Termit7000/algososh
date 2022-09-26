const { get } = require("http");

describe('Очередь', ()=>{

    beforeEach(()=>{
        cy.visit('/queue');

        cy.get('button[data-testid="button"]').contains('button', 'Добавить').should('be.exist').as('add_button');
        cy.get('button[data-testid="button"]').contains('button', 'Удалить').should('be.exist').as('delete_button');
        cy.get('button[data-testid="button"]').contains('button', 'Очистить').should('be.exist').as('clear_button');

        cy.get('input[class^="input_input"]').should('be.exist').as('input');
        cy.get('@input').clear();
    });

    it('Доступность кнопки добавления', ()=>{
        cy.get('@add_button').should('be.disabled');
        cy.get('@input').type('abc');
        cy.get('@add_button').should('be.enabled');
    })

    it('Анимация добавления', ()=>{

        cy.clock();
        const DELAY = 200;

        const VALUE = 'abc'; 
        cy.get('@input').type(VALUE);
        cy.get('@add_button').should('be.enabled').click();

        cy.get('[data-testid="circle"]').first().as('testComp');
        cy.get('@testComp').get('[class^="circle_circle"]').first().should('be.exist').as('circle');        

        //In PROGRESS
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');

        //MODIFIED
        cy.tick(DELAY);        
        
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(0, 50, 255)');   
        cy.get('@testComp').contains('head');
        cy.get('@testComp').contains('tail');

        cy.get('@testComp').get('[data-testid="circle_value"]').should('be.visible').contains(VALUE);

        cy.clock().invoke('restore');
    })

    it('Удаление из очереди', ()=>{

        cy.get('[data-testid="circle"]').first().as('testComp');
        cy.get('@testComp').get('[class^="circle_circle"]').first().should('be.exist').as('circle');        

        cy.get('@input').type('abc');
        cy.get('@add_button').should('be.enabled').click();
        cy.get('@testComp').get('[data-testid="circle_value"]').should('be.visible');
       
        cy.get('@delete_button').should('be.enabled').click();
        
        //In PROGRESS
        cy.get('@circle').should('have.css', 'border', '4px solid rgb(210, 82, 225)');

        //FINISH
        cy.get('@testComp').get('[data-testid="circle_value"]').should('not.be.visible');
    });

    it('Очистка очереди', ()=>{

        cy.get('@input').type('abc');
        cy.get('@add_button').should('be.enabled').click();

        cy.get('@input').type('def');
        cy.get('@add_button').should('be.enabled').click();

        cy.get('@clear_button').should('be.enabled'); 

        cy.get('[data-testid="circle_value"]').should((arr)=>{
            const len = [...arr].filter(i=>i.innerHTML!=='').length;            
            expect(len).to.eq(2);
        });

        //ОЧИСТКА
        cy.get('@clear_button').click(); 

        cy.get('[data-testid="circle_value"]').should((arr)=>{
            const len = [...arr].filter(i=>i.innerHTML!=='').length;            
            expect(len).to.eq(0);
        });
    })
})