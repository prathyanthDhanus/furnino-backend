
module.exports = {

    addProductService :async(discountPercentage,price)=>{
        let discountedPrice =  price - (price * discountPercentage / 100);
        return Math.ceil(discountedPrice);

    }
}