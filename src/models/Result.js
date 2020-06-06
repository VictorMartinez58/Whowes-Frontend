class Result {
    constructor(title, user_id, totalPrice, products){
        this.title = title;
        this.user_id = user_id;
        this.totalPrice = totalPrice;
        this.products = products;

    }
}



/* 
title: String,
user_id: { type: Schema.ObjectId, ref: 'User' },
totalPrice: Number,
products: [String],
date: {type: Date, default: Date.now},
closed: {type: Boolean, default: false}, */

export default Result;