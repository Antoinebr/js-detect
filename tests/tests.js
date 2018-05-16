const assert = require('assert');
const siteReader = require('../site-reader');
const _ = require('lodash');
const fs = require('fs');

const chalk = require('chalk');




describe('Tests different websites for payment processors ' , function() {

   
    it('should find Adyen in redmart.com files ', function(done) {
        
        this.timeout(105000);

        const url = "redmart.com"
    
        siteReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['adyen', true ] );

                assert.equal(script.adyen, true);

            })
            .then(done, done)

    });




    it('should find Ogone in collectorsquare.com HTML ', function(done) {
        
        this.timeout(105000);

        const url = "collectorsquare.com";
    
        siteReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['ogoneIngenico', true ] );

                assert.equal(script.ogoneIngenico, true);

            })
            .then(done, done)
    });




    it('should find be2bill in maliterie.com  ', function(done) {
    
        this.timeout(105000);

        const url = "maliterie.com";
    
        siteReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['be2bill', true ] );

                assert.equal(script.be2bill, true);

            })
            .then(done, done)
    });



    it('should find hipay in fr.wikomobile.com ', function(done) {
    
        this.timeout(105000);

        const url = "fr.wikomobile.com ";
    
        siteReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['hipay', true ] );

                assert.equal(script.hipay, true);

            })
            .then(done, done)
    });



    it('should find hipay in alltricks.fr ', function(done) {
    
        this.timeout(105000);

        const url = "www.alltricks.fr";
    
        siteReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['hipay', true ] );

                assert.equal(script.hipay, true);

            })
            .then(done, done)
    });


    it('should find hipay in marionnaud.fr', function(done) {
    
        this.timeout(105000);

        const url = "marionnaud.fr";
    
        siteReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['hipay', true ] );

                assert.equal(script.hipay, true);

            })
            .then(done, done)
    });



    it('should find Payone in hawesko.de', function (done){

        this.timeout(105000);

        siteReader.init('hawesko.de')
            .then( r => {
                    
                let script = _.find( r, ['payone', true ] );

                assert.equal(script.payone, true);

            })
            .then(done, done)

    });



    it('should find Payone in hawesko.de', function (done){

        this.timeout(105000);

        siteReader.init('hawesko.de')
            .then( r => {
                    
                let script = _.find( r, ['payone', true ] );

                assert.equal(script.payone, true);

            })
            .then(done, done)

    });


    it('should find Klarna in getinspired.no', function (done){

        this.timeout(105000);

        siteReader.init('getinspired.no')
            .then( r => {
                    
                let script = _.find( r, ['klarna', true ] );

                assert.equal(script.klarna, true);

            })
            .then(done, done)

    });



    it.skip('should find Gestpay in luisaviaroma.com', function (done){

        this.timeout(105000);

        //  I didn't find this file from the home page
        siteReader.init('luisaviaroma.com')
            .then( r => {
                    
                let script = _.find( r, ['gestpay', true ] );

                assert.equal(script.gestpay, true);

            })
            .then(done, done)

    });




    it('should find Atos in m.lahalle.com ', function(done) {
        
        // issue with char encoding 

        this.timeout(105000);

        const url = "m.lahalle.com";
    
        siteReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['atos', true ] );

                assert.equal(script.atos, true);

            })
            .then(done, done)
    });



    it.skip('should find paybox in feuvert.fr', function(done) {
        
        // issue with Captcha

        this.timeout(105000);

        const url = "www.feuvert.fr";
    
        siteReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['paybox', true ] );

                assert.equal(script.paybox, true);

            })
            .then(done, done)
    });





});





describe('Reading Files' , function() {

    it('should find 6 CSS files ', function() {

        let body = fs.readFileSync(process.cwd()+'/tests/assets/index.html');

        const r = siteReader.test.getCSSfromDocument(body,'monbraceletnato.fr');

        assert.equal(r.length, 6);
            
    });


});
    

