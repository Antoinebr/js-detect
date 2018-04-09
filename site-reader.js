const request = require('request');

const cheerio = require('cheerio')

const { URL } = require('url');

const chalk = require('chalk');

const _ = require('lodash');




/**
 *  init a test
 * 
 * @param {string} domain the domain which you cant to explore
 * 
 * @returns {Promise<Response>} Will return a promise containing the 
 * results of the test
 * 
 */
const init = (domain) => {

    return new Promise( (resolve, reject) => {  
         
        request( `http://${domain}`, (error, response, body)  => {

            if( typeof response === "undefined" ||  error ) return reject(error);
        
            if( ! response.statusCode === 200 && ! body ) return reject('Wrong satus code or body response');
                
            const jsFiles = getJsUrlfromDocument(body,domain);

            const cssFiles = getCSSfromDocument(body,domain);

           
            // We push the promises in a promise array

            let  proms = []

            if( cssFiles ) proms.push( requestsURI( cssFiles) );

            if( jsFiles )  proms.push( requestsURI( jsFiles) );

            proms.push(searchInHTML(body,domain));

            proms = _.flatten(proms);


            Promise
                .all(proms)
                .then( results  => {
       
                    return resolve(results);
                })
                .catch( error  => {
                    
                    return reject(error);

                });
                      
  
        
        });


    })
        
};



 
/**
 *  Requests URI test and search a what contains
 *  each url
 * 
 * @param {array} list array containing the urls
 * @param {bool} verbose displays the 
 * @returns {Promise<Response>} returns an array of promise 
 */
const requestsURI = (list, verbose = false) => {

    var promises = [ ];
    
    list = excludeScripts(list);

    if( verbose ) list.forEach( s => console.log( chalk.grey( "👉 File detected ", s ) ) );

    list.forEach( url => promises.push(  requestAndSearch(url) ) );

    return promises;

}




const requestAndSearch = (url) => {

    return new Promise( (resolve, reject) => { 

        request({
            url : url,
            encoding : 'utf-8'

        }, (error, response, body)  => {
        
            if( typeof response == "undefined" ||  error ) return reject(error);
    
            if( response.statusCode !== 200 && ! body )  return reject('Wrong status code or body response');
            
            let searchResult = searchForFootprint(body)

            searchResult.url = url

            return resolve(searchResult);
        
        });

    });

} 



const getJsUrlfromDocument  = (body,domain) => {

    const $ = cheerio.load(body);

    var scripts = [];
        
    try {
        
        $('script').each( function(i, elem){

            const src = $(this).attr('src');
        
            if( typeof src !== "undefined"){

                scripts.push( formatUrl(src,domain) );

            }  
            
        });


    } catch (error) {

        console.log( chalk.red('Cheerio failed ', error ) )

    }


    return ( scripts.length > 0 ) ? scripts : false;

}



const getCSSfromDocument  = (body,domain) => {

    const $ = cheerio.load(body);

    var css = [];
        
    try {
        
        $('link[rel=stylesheet]').each( function(i, elem){

            const href = $(this).attr('href');
        
            if( typeof href !== "undefined"){

                css.push( formatUrl(href,domain) );

            }  
            
        });


    } catch (error) {

        console.log( chalk.red('Cheerio failed ', error ) )

    }


    return ( css.length > 0 ) ? css : false;

}




const formatUrl = (src,domain) => {

    let scriptUrl = new URL( src , `http://${domain}` );

    return scriptUrl.href;

}



const excludeScripts = urls => {

    const excluded =  ['jquery','optimizely','abtasty','googleadservices.com','bootstrap','googleapis.com','addthis.com','jsdelivr.net','fontawesome.com','trustpilot.com'];
    

    if( urls.includes("tricks")) console.log("________", urls);

    return urls.filter( u => {
  
        let foundExclusion = false;
    
        excluded.forEach( e => {
            
            if( foundExclusion === true ) return true; 
             
            foundExclusion =  u.includes(e) 
            
        });
        
        return ! foundExclusion;
  

    });

 
}



const searchInHTML = (body,url) =>{

    const prom = new Promise( (resolve, reject) =>{

        let footPrint = searchForFootprint(body);
        footPrint.url = url;
        
        resolve(footPrint);

    });
    
    return [prom];

}



const searchForFootprint = (body,url) =>{


    return {
            adyen : (/adyen\.encrypt/).test(body),
            payplug : (/payplug/i).test(body),
            stripe : (/Stripe\.version/).test(body),
            braintree : (/Braintree\.version/).test(body),
            //paypal : (/PAYPAL/).test(body),
            laterpay: (/.laterpay\.net/).test(body),
            ogoneIngenico: (/(ogone|ingenico)/i).test(body),
            be2bill: (/be2bill/i).test(body),
            hipay: (/hipay/i).test(body),
            payline: (/payline/i).test(body),
            atos: (/atos/).test(body), // css #atosPaymentFrame
            paybox: (/paybox/).test(body),
        }
}



const readPaymentResult = (response, verbose = false)=> {


    let results = [];

    const processors = ['adyen' ,'payplug',
    'stripe', 'braintree', 'laterpay','ogoneIngenico','be2bill','hipay','payline','atos','paybox'];

    processors.forEach( processor => {

        let script = _.find( response, [processor, true ] );
        
        if( script ) results.push({url : script.url,found : processor});

        if( verbose ){

            let res = script ? chalk.green(`We found ${processor} in ${script.url}`) : chalk.yellow(`We didn't find ${processor} `);

            console.log(res);
        }
       
    });


    return results;
    
}


module.exports = {
    init : init,
    readPaymentResult : readPaymentResult,
    test : {
        getCSSfromDocument : getCSSfromDocument
    }
}