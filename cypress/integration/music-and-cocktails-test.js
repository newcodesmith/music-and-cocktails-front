describe('Music and Cocktails', () => {
    it('.should() - asses the page works properly', () => {
        cy.visit('http://localhost:3001/home');

        cy.title()
            .should('include', 'Music+Cocktails');

        (cy.get('#footer-buttons > ul > li'))
            .click();
        (cy.url().should('contain', '/admin'))

        cy.get('#admin-page > :nth-child(2) > :nth-child(2) > :nth-child(1)')
            .should('contain', 'Update Rock-POP Album');

        cy.get('.buttons')
            .click();

        cy.get('#add-drink-form > .drink_title')
            .type('Drink 1');

        cy.get('#add-drink-form > .drink_description')
            .type('An Awesome Drink');

        cy.get('#add-drink-form > .direction')
            .type('Mix it UP!');

        cy.get('#add-drink-form > .drink_pic_url')
            .type('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-164770405-1-1508961546.jpg?crop=1xw:1xh;center,top&resize=980:*')

        cy.get('#add-drink')
            .click();

            cy.get('#add-drink-form > .drink_title')
        .should ('contain', '')

    });
});