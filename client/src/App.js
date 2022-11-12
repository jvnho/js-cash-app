import React, {useEffect, useState} from 'react'
import {Article} from './utils/Article'

class ArticleButton extends React.Component{
  render(){
    const available = (this.props.obj.quantity > 0);
    let button;
    if (available) {
      button = <button onClick={() => 
        this.props.onArticleClicked(new Article(this.props.obj.name, this.props.obj.price, 1))
        }>
        {this.props.obj.name} {this.props.obj.price}€</button>
    } else {
      button = <button disabled={true}>{this.props.obj.name} {this.props.obj.price}€</button>
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
      <p>{name} {price}€ {quantity} {price*quantity}€</p>
    )
  }
}

class Catalog extends React.Component{

  constructor(props){
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(article){
    this.props.onArticleClicked(article)
  }

  render(){
    return(
      <ul>
      {this.props.articles.map((object, i) => <li key={i}><ArticleButton obj={object} onArticleClicked={this.addToCart} /></li>)}
      </ul>
    )
  }
}

class Cart extends React.Component{
  render(){
    return(
      <ul>
      {this.props.cart.map((object, i) => <li key={i}><ArticleCart obj={object}/></li>)}
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

  /** Mutation function (TO CHANGE)
   * Handler that allows user to add an article to the cart state array 
   * @param article to add
   */
  addToCart(article){
    var l = this.state.cart.concat(article)
    this.setState((state,props) => ({
      cart: l,
      total: state.total + article.getPrice(),
    }));
  }

  getIndex(articles, name){
    for(let i = 0; i < articles.length(); i++){
      if(articles[i].getName() === "name"){
        return i;
      }
    }
    return -1;
  }

  /** Mutation function (TO CHANGE)
   * Handler that allows user to remove article from the cart state array
   * @param article to add
   */
  removeFromCart(article){
    var l = this.state.cart;
    var quantity = 0;
    if (article.getQuantity() > 1){
      quantity = article.getQuantity() -1;
    } else {
      var idx = this.getIndex(this.state.cart, article);
      var l1 = l.slice(0,idx);
      var l2 = l.slice(idx,l.length());
      l = l1.concat(l2);

    }
    this.setState((state,props) => ({
      cart: l
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
          <Cart cart={this.state.cart}/>
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