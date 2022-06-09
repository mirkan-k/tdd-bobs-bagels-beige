const Bagel = require("../src/bagel.js");
const deals = require("../src/deals.js");

class Basket {
    constructor(number = 3) {
        this.contents = []
        this.IDcounter = 0
        this.capacity = number
        this.counts = {}
    }

    addBagel(SKU, numOfBagels = 1) {      
        for (let i = 0; i < numOfBagels; i++) {
            if (!this.basketIsFull()) {
            this.IDcounter++
            const id = this.IDcounter
            let bagelItem = new Bagel(SKU, id)
            this.contents.push(bagelItem)
            }
        }
        return this.contents
    }

    removeBagel(id) {
        for (let i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === id) {
                this.contents.splice([i], 1)
                return this.contents
            }
        } return "Bagel isn't in basket"
    }

    basketIsFull() {
        if (this.contents.length >= this.capacity) {
           return 'basket is full'
        }
        return false
    }

    getPriceOfBagel(SKU) {
        const output = new Bagel(SKU);
        return output.price
    }
/*
    getTotal() {
        let total = 0
        this.checkDeals()
        console.log(this.countBagelsinBasket())
      for (let i = 0; i < this.contents.length; i++) {
         total += this.contents[i].price * 100
      }
     return total/100
    }
*/
    countBagelsInBasket(){
        this.counts = {}
        for (let i = 0; i < this.contents.length; i++){
            const SKU = this.contents[i]['SKU']
            if (!this.counts.hasOwnProperty(SKU)) {
                this.counts[`${SKU}`] = 1
            } else {
                this.counts[`${SKU}`]++;
            }
        }
         return this.counts;
    }

    static getSubtotal(counts,SKU){
        const count = counts[SKU]
        const dealQuantity = deals[SKU][0]
        const dealPrice = deals[SKU][1]
        const bagelPrice = Bagel.getPriceOfBagel(SKU)
        let total = 0

        if (deals.hasOwnProperty(SKU)){
            const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
            const nonDealSum = (count % dealQuantity) * (bagelPrice)
            total += dealSum + nonDealSum
        }
        if (dealQuantity === 1){                                                 // adhoc application of coffee deal saving
            const BOGOFSKU = `${deals[SKU][2]}`
            const numOfDiscounts = counts[BOGOFSKU] % deals[BOGOFSKU][0]
            const saving = Bagel.getPriceOfBagel(BOGOFSKU) - deals[SKU][3]
            total -= numOfDiscounts * saving
        }

        return Number(total.toFixed(2))
    }

    getTotal(){
        const counts = this.counts
        let total = 0
        for (let SKU in counts){
            const count = counts[`${SKU}`]
            const dealQuantity = deals[SKU][0]
            const dealPrice = deals[SKU][1]
            const bagelPrice = Bagel.getPriceOfBagel(SKU)
            if (deals.hasOwnProperty(SKU)){
                const dealSum = Math.floor(count / dealQuantity) * (dealPrice)
                const nonDealSum = (count % dealQuantity) * (bagelPrice)
                total += dealSum + nonDealSum
            }
            if (dealQuantity === 1){                                                 // adhoc application of coffee deal saving
                const BOGOFSKU = `${deals[SKU][2]}`
                const numOfDiscounts = counts[BOGOFSKU] % deals[BOGOFSKU][0]
                const saving = Bagel.getPriceOfBagel(BOGOFSKU) - deals[SKU][3]
                total -= numOfDiscounts * saving
            }
        }
        return Number(total.toFixed(2))
    }
        
        
        
        /*this.contents.filter()
        for(let i = 0; i < this.contents.length; i++){
            for (let j = 0; j < )
        }
    }
    */

}
const basket = new Basket(100)
console.log(basket.addBagel('BGLO', 4))
console.log(basket.addBagel('BGLP', 1))
// console.log(basket.addBagel('BGLP', 15))
// console.log(basket.addBagel('BGLE',7))
// console.log(basket.addBagel('COF',3))
console.log(basket.countBagelsInBasket())
console.log(basket.getTotal())

module.exports = Basket