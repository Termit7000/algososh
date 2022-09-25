
describe('Фибоначчи', ()=>{

    before(()=>{
        cy.visit('/fibonacci');       
    });

    beforeEach(()=>{
        cy.get('button[data-testid="button"]').should('be.exist').as('button');
        cy.get('input[class^="input_input"]').should('be.exist').as('input');
        cy.get('@input').clear();
    });
    
    it('Доступность кнопки добавления',()=>{     
        
        cy.get('@button').should('be.disabled')

        cy.get('@input').type('2');
        cy.get('@button').should('be.enabled');
    });

    it('Корректность генерации', ()=>{

        const res = [1,1,2,3,5];

        cy.get('@input').type(String(res.length));
        cy.get('@button').should('be.enabled');

        cy.get('@button').click();

        cy.get('@button').should('be.enabled');

        cy.get('p[data-testid="circle_value"]').should('have.length', res.length).each((i,index)=>{

            cy.wrap(i).contains(res[index]);

        });
    });
});