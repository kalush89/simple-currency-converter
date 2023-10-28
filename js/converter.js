export default class Converter {
    constructor(amount, from, to) {
        this.amount = amount;
        this.from = from;
        this.to = to;
    }

    //Validate
    validate(rate) {
        let msg = 'This field is required!';
        console.log(this.amount);
        if (!this.amount) {
            this.output(msg, 'err-amount');
            return;
        } else if (!this.from ) {
            this.output(msg, 'err-from');
            return;
        }else if(!this.to) {
            this.output(msg, 'err-to');
            return;
        }else{
            let msg = '';
            console.log('good', this.amount);
            this.output(msg, 'err-amount');
            this.output(msg, 'err-from');
            this.output(msg, 'err-to');
            this.convertCurrency(rate);
            }

    }

     //get element
     getElement(id) {
        return document.getElementById(id);
    }

    //Output
    output(msg, id) {
        let display = this.getElement(id);
        display.innerText = msg;
    }

    //encode
    encodeUri = () => {
        let fromCurrency = encodeURIComponent(this.from);
        let toCurrency = encodeURIComponent(this.to);
        return `${fromCurrency}/${toCurrency}`;
    };

    //Sort JSON response in alphabetical order
    sortRes(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    //fetch currencies
    async fetchCurrencies(){
        let currStream = await fetch(`https://v6.exchangerate-api.com/v6/6fc470f0a84d722c73f3165d/codes`);
        let currencies = await currStream.json();
        return currencies.supported_codes;
    }

    //api request for currencies
    // async getCurrencies() {
    //     let parentFrom = this.getElement('from');
    //     let parentTo = this.getElement('to');
    //     let currStream = await fetch(`https://free.currconv.com/api/v7/currencies?apiKey=16ef1ff68cbc6fe7bdae`);
    //     let currencies = await currStream.json();

    //     let sortedCurrs = this.sortRes(Object.values(currencies.results), 'currencyName');
    //     for (const currency of sortedCurrs) {
    //         this.appendOptns(parentFrom, parentTo, currency);

    //     }
    // }

    //Shorten Select options
    truncateOptns(txt) {
        if (txt.length > 25) {
            return txt.slice(0, 25) + '...';
        } else {
            return txt;
        }

    }   

    //Append currency options
    appendOptns(parentFrom, parentTo, content) {
        const childNodeFrom = document.createElement('option');
        const childNodeTo = document.createElement('option');

        childNodeFrom.innerHTML = this.truncateOptns(content[1]);
        childNodeTo.innerHTML = this.truncateOptns(content[1]);

        parentFrom.append(childNodeFrom);
        parentTo.append(childNodeTo);

        childNodeFrom.setAttribute('value', content[0]);
        childNodeTo.setAttribute('value', content[0]);
    }

    //api request for rate
    fetchRate = async() =>{
        try {
            
            const encodedUri = this.encodeUri(); 
            let currStream = await fetch(`https://v6.exchangerate-api.com/v6/6fc470f0a84d722c73f3165d/pair/${encodedUri}`);
            let rate = await currStream.json();
            return [{
                pair: encodedUri,
                rate: rate.conversion_rate
            }];
        } catch (error) {
            console.log('Error fetching rate', error)
        }
        
    }

    //convert
    convertCurrency(rate) {
            let display = this.getElement('display');
            let result = rate * this.amount;
            display.innerText = `${result.toFixed(2)}`;
    }
       
    

    
}