const assert = require('assert');
const jsReader = require('../js-reader');
const _ = require('lodash');
const fs = require('fs');

const chalk = require('chalk');




describe(' Analyze a website ' , function() {

   
    it('should find Adyen in redmart.com files ', function(done) {
        
        this.timeout(105000);

        const url = "redmart.com"
    
        jsReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['adyen', true ] );

                assert.equal(script.adyen, true);

            })
            .then(done, done)

    });




    it('should find Ogone in collectorsquare.com HTML ', function(done) {
        
        this.timeout(105000);

        const url = "collectorsquare.com";
    
        jsReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['ogoneIngenico', true ] );

                assert.equal(script.ogoneIngenico, true);

            })
            .then(done, done)
    });


    it('should find Ogone in collectorsquare.com HTML ', function(done) {
        
        this.timeout(105000);

        const url = "collectorsquare.com";
    
        jsReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['ogoneIngenico', true ] );

                assert.equal(script.ogoneIngenico, true);

            })
            .then(done, done)
    });




    it('should find be2bill in maliterie.com  ', function(done) {
    
        this.timeout(105000);

        const url = "maliterie.com";
    
        jsReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['be2bill', true ] );

                assert.equal(script.be2bill, true);

            })
            .then(done, done)
    });



    it('should find hipay in fr.wikomobile.com ', function(done) {
    
        this.timeout(105000);

        const url = "fr.wikomobile.com ";
    
        jsReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['hipay', true ] );

                assert.equal(script.hipay, true);

            })
            .then(done, done)
    });



    it('should find hipay in alltricks.fr ', function(done) {
    
        this.timeout(105000);

        const url = "www.alltricks.fr";
    
        jsReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['hipay', true ] );

                assert.equal(script.hipay, true);

            })
            .then(done, done)
    });




    it.skip('should find Atos in m.lahalle.com ', function(done) {
    
        this.timeout(105000);

        const url = "m.lahalle.com";
    
        jsReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['atos', true ] );

                assert.equal(script.atos, true);

            })
            .then(done, done)
    });





});





describe('Reading Files' , function() {

    it('should find 6 CSS files ', function() {

        let body = fs.readFileSync(process.cwd()+'/tests/assets/index.html');

        const r = jsReader.test.getCSSfromDocument(body,'monbraceletnato.fr');

        assert.equal(r.length, 6);
            
    });


});
    

