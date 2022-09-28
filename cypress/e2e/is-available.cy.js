
describe('app works correctly with routes', () => {

  before(() => {
    cy.visit('/');
  });

  it('Приложение поднялось', () => {
    cy.get('h1').contains('МБОУ АЛГОСОШ');
  })

  it('Тестирование переходов по страницам', () => {

    //использовался подход описанный в https://filiphric.com/testing-links-with-cypress
    //указано, что его предпочтительней использовать, чем тот который указан Практикумом

    cy.get('main a[href]').each(page=>{
      cy.request(page.prop('href'));
    });
  });
})

