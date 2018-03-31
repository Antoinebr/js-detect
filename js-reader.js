const request = require('request');

const cheerio = require('cheerio')

const { URL } = require('url');

const chalk = require('chalk');



const init = (domain) => {

    return new Promise( (resolve, reject) => {  
         
        request( `http://${domain}`, (error, response, body)  => {

            if( typeof response === "undefined" ||  error ) return reject(error);
        
            if( ! response.statusCode === 200 && ! body ) return reject('Wrong satus code or body response');
                
            const jsFiles = getJsUrlfromDocument(body,domain);
    
            if( !jsFiles && !jsFiles.length > 0) return reject('No JavaScript files');
    
            const proms = requestsJS( jsFiles );

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




const requestsJS = (jsList) => {

    var promises = [ ];
    
    jsList = excludeScripts(jsList);

    jsList.forEach( s => console.log( chalk.grey( "👉 Script detected ", s ) ) );

    jsList.forEach( jsUrl => promises.push(  requestAndSearch(jsUrl) ) );

    return promises;

}




const requestAndSearch = (jsUrl) => {

    return new Promise( (resolve, reject) => { 

        request( jsUrl , (error, response, body)  => {
        
            if( typeof response == "undefined" ||  error ) return reject(error);
    
            if( ! response.statusCode === 200 && ! body )  return reject('Wrong satus code or body response');
                    
            return resolve({
                url : jsUrl,
                adyen : (/adyen\.encrypt/).test(body),
                payplug : (/payplug/).test(body),
                stripe : (/Stripe\.version/).test(body),
                braintree : (/Braintree\.version/).test(body),
                paypal : (/PAYPAL/).test(body),
                laterpay: (/.laterpay\.net/).test(body),
                 //  window\.adyen
            });
        
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




const formatUrl = (src,domain) => {

    let scriptUrl = new URL( src , `http://${domain}` );

    return scriptUrl.href;

}



const excludeScripts = urls => {

    const excluded =  ['jquery','optimizely','abtasty','googleadservices.com','bootstrap','googleapis.com','addthis.com','jsdelivr.net','fontawesome.com','trustpilot.com'];
    
    return urls.filter( u => {
  
        let foundExclusion = false;
    
        excluded.forEach( e => {
            
            if( foundExclusion === true ) return true; 
             
            foundExclusion =  u.includes(e) 
            
        });
        
        return ! foundExclusion;
  

    });

 
}





module.exports = {
    init : init
}