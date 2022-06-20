describe('burger constructor page', function () {
  const modal = '[data-cy="modal"]';
  const ingredientId = '[data-cy="60d3b41abdacab0026a733cb"]';
  const secondIngredientId = '[data-cy="60d3b41abdacab0026a733cc"]';
  const constructorList = '[data-cy="constructor_list"]';

  beforeEach(() => {
    cy.viewport(1450, 1100)
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер');
  })

  it('should show & hide ingredient popup', () => {
    cy.get(ingredientId).click();
    cy.location('pathname').should('eq', '/ingredients/60d3b41abdacab0026a733cb');
    cy.get(modal).contains('h3', 'Биокотлета из марсианской Магнолии')
    cy.get(modal).should('exist');
    cy.get(modal).find('svg').first().click();
    cy.get(modal).should('not.exist');
  })

  it('DnD', () => {
    const dnd = new DataTransfer();
    cy.get(ingredientId).trigger('dragstart', { dnd });
    cy.get(constructorList).trigger('drop', { dnd });
    cy.get(secondIngredientId).trigger('dragstart', { dnd });
    cy.get(constructorList).trigger('drop', { dnd });
  })

  it('should create new order', () => {
    cy.contains('Оформить заказ').should('be.enabled').click();
    cy.location('pathname').then(($pathname) => {
      if ($pathname == '/login') {
        cy.contains('Войти');
      } else {
        cy.get(modal).should('exist');
        cy.contains('Ваш заказ начали готовить');
      }
    })
  })
})

describe('auth user', () => {
  beforeEach(() => {
    cy.viewport(1450, 1100)
  })
  const inputEmal = 'input[name=email]';
  const inputPassword = 'input[name=password]';
  const testUser = {
    email: 'tavakay@mail.ru',
    password: '123456'
  }
  it('should authorization user', () => {
    cy.visit('http://localhost:3000/login');
    cy.get(inputEmal).click().type(testUser.email);
    cy.get(inputPassword).click().type(testUser.password);
    cy.contains('button', 'Войти').click();
    cy.location('pathname', { timeout: 1000 }).should('eq', '/');
  })
})