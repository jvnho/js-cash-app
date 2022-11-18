import React from 'react'
import {Article} from '../utils/Article'
import {formatPrice} from '../utils/Functions'
import Catalog from './Catalog'
import Cart from './Cart'

class Container extends React.Component{

    constructor(props){
        super(props);
        this.state ={
        cart: [],
        total: 0.0, //Total price of the cart
        }
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }
  
    /**
     * Returns the index of the article in the list 
     * @param articles list of articles
     * @param article to be find
    */
    getIndex(article){
      const articles = this.state.cart;
      for(let i = 0; i < articles.length; i++){
        if(articles[i].equals(article)){
          return i;
        }
      }
      return -1;
    }

    /**
     * Handler that allows user to add an article to the cart state array 
     * Function will either add an article if it's not already in the list or will replace it with a new object with a new quantity
     * @param article to add
     */
    addToCart(article){
      const articles = this.state.cart;
      const idx = this.getIndex(article);
      var quantity = (idx === -1 ? 1 : articles[idx].getQuantity()+1);
      var newArticle = new Article(article.getName(), article.getPrice(), quantity);
      var newList = []
      for(var i = 0; i < articles.length; i++){
        (i !== idx ? newList.push(articles[i]) : newList.push(newArticle));
      }
      if(idx === -1) newList.push(newArticle); // Article didn't exist so we add it to the end
      this.setState((state,props) => ({
        cart: newList,
        total: state.total + parseFloat(article.getPrice()),
      }));
    }
  
    /**
     * Handler that allows user to remove article from the cart state array
     * Function will either remove an article if its new quantity is zero or will replace it with a new object with a new quantity
     * @param article to remove
     */
    removeFromCart(article){
      const articles = this.state.cart;
      var idx = this.getIndex(article);
      var quantity = articles[idx].getQuantity()-1
      var newArticle = new Article(article.getName(), article.getPrice(), quantity);
      var newList = []
      for(var i = 0; i < articles.length; i++){
        if(i !== idx)
          newList.push(articles[i]);
        else 
          if(quantity > 0) newList.push(newArticle);
      }
      this.setState((state,props) => ({
        cart: newList,
        total: state.total - parseFloat(article.getPrice()),
      }));
    }
  
    render(){
      return (
        <div id="app-container">
          <p className="shop-information">{this.props.data.companyName}</p>
          <p className="shop-information">{this.props.data.companyAddress}</p>
          <p className="shop-information">{this.props.data.companyPhoneNumber}</p>
          <p className="shop-information">{this.props.data.companyMail}</p>
          
          <div id="catalog-container">
            <Catalog articles={this.props.data.articles} onArticleClicked={this.addToCart}/>
          </div>
          <div id="cart-container"> 
            <Cart cart={this.state.cart} onArticleClicked={this.removeFromCart}/>
            <button id="order-cart-button">ORDER {formatPrice(this.state.total)}</button>
          </div>
        </div>
      );
    }
}

export default Container;
