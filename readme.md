# JS reader 

### How to use it 

```npm install```

```JavaScript 

const url = "redmart.com"

jsReader.init(url)
    .then( r => {
        
        let script = _.find( r, ['adyen', true ] );

        if( script ) console.log(script)

    })
    .catch(error => console.error)

```


### Todo 

* Search signals in CSS files too 


### ✅ signals to test

* ```ogonne && ingenico``` : payment provider : https://payment-services.ingenico.com
