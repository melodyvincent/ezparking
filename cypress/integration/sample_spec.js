describe('Look at reservations', () => {
    it('Should have markers on map', () => {
        cy.visit('/search')
        cy.get('div').should('have.class', 'gmnoprint')
        cy.get('div.gmnoprint > img:last').click()
        cy.get('button:last').click()
    })
})
describe('Make a reservation', () => {
    it('View my reservations', () => {
        cy.visit('/search')
        cy.get('img.size:last').click()
        cy.url().should('include', '/reservations')
    })
})
describe('Make a listing', () => {
    it('View my listings', () => {
        cy.visit('/search')
        cy.get('div.nav a:nth-child(2)').click()
        cy.url().should('include', '/mylistings')
    })
    it('Should have an "Add a Listing" button', () => {
        cy.get('button.bigbutton').should('exist').click()
    })
    it('Should type in an address', () => {
        cy.get('input.input').type('777 E 2600 N').should('have.value', '777 E 2600 N')
        cy.get('div.nav img:last').click()
    })
    it('Should have three buttons', () => {
        cy.get('button.smallbutton').should('have.length', 3)
    })
    it('Should have a Residential button', () => {
        cy.get('button').should('contain', 'Residential')
    })
    it('Should have a Business button', () => {
        cy.get('button').should('contain', 'Business')
    })
    it('Should have an Other button', () => {
        cy.get('button').should('contain', 'Other')
    })
})
describe('Make a vehicle', () => {
    it('Open Menu', () => {
        cy.visit('/search')
        cy.get('div.barbox').click()
        cy.get('div').should('have.class', 'icon1')
    })
    it('View my vehicles', () => {
        cy.get('div.icon1').click()
        cy.url().should('include', '/myvehicle')
    })
    it('Should have an "Add a Vehicle" button', () => {
        cy.get('button').should('contain', 'Add a Vehicle')
    })
    it('Should navigate to vehicle creation', () => {
        cy.get('button:first').click()
        cy.get('#addimageicon').should('exist')
    })
    it('Should type in year', () => {
        cy.get('p.ptag input.input[name~=Year]').type('1998').should('have.value', '1998')
    })
    it('Should type in make', () => {
        cy.get('div.card input[name~=Make]').type('Mercury').should('have.value', 'Mercury')
    })
    it('Should type in model', () => {
        cy.get('div.card input[name~=Model]').type('Sable').should('have.value', 'Sable')
    })
    it('Should type in color', () => {
        cy.get('div.card input[name~=Color]').type('White').should('have.value', 'White')
    })
    it('Should type in plate', () => {
        cy.get('div.card input[name~=Plate]').type('W337LN').should('have.value', 'W337LN')
    })
    it('Should have a save button', () => {
        cy.get('div > div:last img:last').should('exist')
    })
    it('Should have a cancel button', () => {
        cy.get('div > div:last img:first').should('exist').click()
    })
    it('Should redirect to my vehicles', () => {
        cy.url().should('include', '/myvehicle')
    })
})