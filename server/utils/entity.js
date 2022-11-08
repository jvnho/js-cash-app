class Company{
    constructor(name, address, phoneNumber, mail){
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.mail = mail;
        this.catalog = null;
    }

    setCatalog(catalog){
        this.catalog = catalog;
    }
}

class Catalog{
    constructor(){
        this.catalog = [];
    }

    add(article){
        this.catalog.push(article);
    }
}

class Article{
    constructor(name, price, quantity){
        this.name = name;
        this.price = price;
        this.quantity = quantity;
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

class Cart{

    constructor(){
        this.cart = [];
    }

    add(article){
        this.cart.push(article);
    }
}

export {Company}
export {Catalog}
export {Article}