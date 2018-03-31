const jsReader = require('./js-reader.js');

const chalk = require('chalk');

const _ = require('lodash');



let urls = [
    "redmart.com"
];



urls.forEach( url =>{


    jsReader
        .init(url)
            .then( r => {

             readPaymentResult(r);

            })
            .catch( e => console.log( "💀 ", chalk.blue(e) ) );


});



const readPaymentResult = response => {


    const processors = ['adyen' ,'payplug','stripe', 'braintree', 'laterpay'];

    processors.forEach( processor => {

        let script = _.find( response, [processor, true ] );
        
        let res = script ? chalk.green(`🔥🔥🔥🔥🔥 We found ${processor} in ${script.url}`) : chalk.yellow(`We didn't find ${processor} `);

        console.log(res);

    });


    
}