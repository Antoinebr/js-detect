# Site reader 

Search strings for a given domain in CSS / JS / HTML files. 

### How to use it 

```npm install```

```npm start````



```JavaScript

const siteReader = require('./js-reader.js');

const chalk = require('chalk');


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

```


### Returns 

```JavaScript 

[ { url: 'http://alltricks.fr/js/alltricks.min.js,q1523258679.pagespeed.jm.RIr_8SYCm3.js',
    found: 'hipay' } ]

[ { url: 'http://marionnaud.fr/_ui/responsive/theme-blue/css/marionnaud.css?v=204-RC1',
    found: 'hipay' } ]
    
[ { url: 'http://redmart.com/js/loader.8e202608.js',
    found: 'adyen' } ]
    
```    


