
module.exports = {

    addProductService :async(discountPercentage,price)=>{
        return price - (price * discountPercentage / 100);

    }
}