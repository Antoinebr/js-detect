const siteReader = require('./js-reader.js');

const chalk = require('chalk');

const _ = require('lodash');



let urls = [
    "redmart.com","marionnaud.fr","alltricks.fr"
];



urls.forEach( url =>{


    siteReader.init(url)
        .then( response => {
            
            const res = siteReader.readPaymentResult(response);
            console.log(res);
        })
        .catch( e => console.log( "💀 ", chalk.blue(e) ) );


});
