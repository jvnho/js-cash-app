export class Article{
    constructor(name, price, quantity){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    equals(other){
        return this.name === other.getName();
    }

    getName(){
        return this.name;
    }

    getPrice(){
        return this.price;
    }

    getQuantity(){
        return this.quantity;
    }

    setQuantity(n){
        this.quantity = n;
    }

    increaseQuantity(){
        this.quantity = this.quantity+1;
    }

    decreaseQuantity(){
        this.quantity = this.quantity-1;
    }
}