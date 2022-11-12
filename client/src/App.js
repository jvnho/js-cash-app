import React, {useEffect, useState} from 'react'
import {Article} from './utils/Article'
import {formatPrice} from './utils/Functions'

class ArticleButton extends React.Component{
  render(){
    const article = this.props.obj;
    const available = (article.quantity > 0);
    let button;
    if (available) {
      button = <button onClick={() => 
        this.props.onArticleClicked(new Article(this.props.obj.name, this.props.obj.price, 1))
        }>
        {this.props.obj.name} {formatPrice(this.props.obj.price)}</button>
    } else {
      button = <button disabled={true}>{this.props.obj.name} {formatPrice(this.props.obj.price)}</button>
    }
    return button;
  }
}

class ArticleCart extends React.Component{
  render(){
    const article = this.props.obj;
    const name = article.getName();
    const price = article.getPrice();
    const quantity = article.getQuantity();
    return (
      <div>
        <p>{name} {price}€ {quantity} {formatPrice(price*quantity)}</p>
        <button onClick={() => this.props.onArticleClicked(article)}>
          -
        </button>
      </div>
    )
  }
}

class Catalog extends React.Component{

  render(){
    return(
      <ul>
      {
      this.props.articles.map((object, i) =>
        <li key={i}><ArticleButton obj={object} onArticleClicked={(article) => this.props.onArticleClicked(article)}/></li>
      )}
      </ul>
    )
  }
}

class Cart extends React.Component{
  render(){
    return(
      <ul>
      {
      this.props.cart.map((object, i) =>
        <li key={i}><ArticleCart obj={object} onArticleClicked={(article) => this.props.onArticleClicked(article)}/></li>
      )}
      </ul>
    )
  }
}


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
   * Returns a new list of articles while replacing article with a new quantity, allowing function to be pure.
   * @param articles list of articles
   * @param article Article to be add or remove
   * @param add boolean indicates if it's a add or remove operation
   */
  updateCartState(article, add){
    const articles = this.state.cart;
    const idx = this.getIndex(article);
    var quantity = 1;
    if(idx === -1){ // No such article in the cart list
      quantity = 1;
    } else {
      quantity = (add ? articles[idx].getQuantity()+1 : articles[idx].getQuantity()-1);
    }
    var newArticle = new Article(article.getName(), article.getPrice(), quantity);
    var newList = []
    for(var i = 0; i < articles.length; i++){
      if(i !== idx){
        newList.push(articles[i]);
      } else {
        newList.push(newArticle);
      }
    }
    if(idx === -1){ // Article didn't exist so we add it to the end
      newList.push(newArticle);
    }
    this.setState((state,props) => ({
      cart: newList
    }));
  }

  /**
   * Handler that allows user to add an article to the cart state array 
   * @param article to add
   */
  addToCart(article){
    const articles = this.state.cart;
    const idx = this.getIndex(article);
    var quantity = 1;
    if(idx === -1){ // No such article in the cart list
      quantity = 1;
    } else {
      quantity = articles[idx].getQuantity()+1 
    }
    var newArticle = new Article(article.getName(), article.getPrice(), quantity);
    var newList = []
    for(var i = 0; i < articles.length; i++){
      if(i !== idx){
        newList.push(articles[i]);
      } else {
        newList.push(newArticle);
      }
    }
    if(idx === -1){ // Article didn't exist so we add it to the end
      newList.push(newArticle);
    }
    this.setState((state,props) => ({
      cart: newList,
      total: state.total + parseFloat(article.getPrice()),
    }));
  }

  /**
   * Handler that allows user to remove article from the cart state array
   * @param article to add
   */
  removeFromCart(article){
    const articles = this.state.cart;
    var idx = this.getIndex(article);
    var quantity = articles[idx].getQuantity()-1
    var newArticle = new Article(article.getName(), article.getPrice(), quantity);
    var newList = []
    for(var i = 0; i < articles.length; i++){
      if(i !== idx){
        newList.push(articles[i]);
      } else {
        if(quantity > 0) newList.push(newArticle);
      }
    }
    this.setState((state,props) => ({
      cart: newList,
      total: state.total - parseFloat(article.getPrice()),
    }));
  }

  render(){
    return (
      <div id="container">
        <p>{this.props.data.companyName}</p>
        <p>{this.props.data.companyAddress}</p>
        <p>{this.props.data.companyPhoneNumber}</p>
        <p>{this.props.data.companyMail}</p>
        
        <div id="catalog">
          <Catalog articles={this.props.data.articles} onArticleClicked={this.addToCart}/>
        </div>
        <div id="cart"> 
          <Cart cart={this.state.cart} onArticleClicked={this.removeFromCart}/>
          <p>{formatPrice(this.state.total)}</p>
          <button>ORDER</button>
        </div>
      </div>
    );
  }
}

function App(){
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/datas/").then(
      response => response.json()
    ).then(
      data =>{
        setBackendData(data)
      }
    )
  }, [])

  return(
    <div>
      {(typeof backendData.companyName === "undefined") ? (
        <p>Loading...</p>
      ) :
      <Container data={backendData}/>}
    </div>
  )
}

export default App