class Converter {
    constructor(amount, from, to) {
        this.amont = amount;
        this.from = from;
        this.to = to;
    }

    //Validate
    validate() {
        let msg = 'This field is required!';
        if (!this.amount) {
            this.outputErr(msg, 'amount');
        } else if (!this.from) {
            this.outputErr(msg, 'from');
        } else if (!this.to) {
            this.outputErr(msg, 'to');
        } else {
            this.convert();
        }

    }

    //encode
    encodeUri() {
        let fromCurrency = encodeURIComponent(this.from);
        let toCurrency = encodeURIComponent(this.to);
        return `${fromCurrency}_${toCurrency}`;
    }

    //api request for currencies
    async getCurrencies() {
        let parentFrom = this.getElement('from');
        let parentTo = this.getElement('to');
        let currStream = await fetch(`https://free.currconv.com/api/v7/currencies?apiKey=16ef1ff68cbc6fe7bdae`);
        let currencies = await currStream.json();
        for (const currency of Object.values(currencies.results)) {

            this.appendOptns(parentFrom, parentTo, currency);

        }
    }

    //get element
    getElement(id) {
        return document.getElementById(id);
    }

    //Append currency options
    appendOptns(parentFrom, parentTo, content) {
        const childNodeFrom = document.createElement('option');
        const childNodeTo = document.createElement('option');
        childNodeFrom.innerHTML = content.currencyName;
        childNodeTo.innerHTML = content.currencyName;
        parentFrom.append(childNodeFrom);
        parentTo.append(childNodeTo);
    }

    //api request for rate
    async getRate() {
        try{
        let currStream = await fetch(`https://free.currconv.com/api/v7/convert?q=${this.encodeUri()}&compact=ultra&apiKey=16ef1ff68cbc6fe7bdae`);
        let rate = await currStream.json();
console.log('running smooth')
        return rate.this.encodeUri();
        }catch(e){
            console.log(e);
        }
    }

    //convert
    convert() {
        try{
            console.log('running smooth too')
        let display = this.getElement('display');
        let result = this.getRate * this.amount;
        display.innerText = `Exchanges to ${result}`;
        }catch(e){
            console.log(e);
        }
        //console.log(result);
    }

    //Output
    outputErr(msg, id) {
        let displayErr = this.getElement(id);
        displayErr.innerHTML = msg;
    }
}