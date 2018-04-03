
const assert = require('assert');
const jsReader = require('../js-reader');
const _ = require('lodash');

const chalk = require('chalk');


describe(' Analyze a website ' , function() {

   
    it('should fin Adyen in redmart.com files ', function(done) {
        
        this.timeout(105000);

        const url = "redmart.com"
        
    
        jsReader.init(url)
            .then( r => {
                
                let script = _.find( r, ['adyen', true ] );

                console.log( chalk.grey(script) );

                assert.equal(script.adyen, true);

            })
            .then(done, done)
        
     
        

    });


});