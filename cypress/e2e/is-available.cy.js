const { wait } = require("@testing-library/user-event/dist/utils");

describe('app works correctly with routes', () => {

  before(() => {
    cy.visit('/');
  });

  it('Приложение поднялось', () => {
    cy.get('h1').contains('МБОУ АЛГОСОШ');
  })

  it('Тестирование переходов по страницам', () => {

    cy.get('main a[href]').each(page=>{
      cy.request(page.prop('href'));
    });
  });
})

