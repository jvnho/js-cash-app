import React, {useEffect, useState} from 'react'
import {Article} from './utils/Article'

class ArticleButton extends React.Component{
  render(){
    const available = (this.props.obj.quantity > 0);
    let button;
    if (available) {
      button = <button>{this.props.obj.name} {this.props.obj.price}€</button>
    } else {
      button = <button disabled={true}>{this.props.obj.name} {this.props.obj.price}€</button>
    }
    return button;
  }
}

class ArticleCart extends React.Component{
  render(){
    const article = (Article) (this.props.obj);
    const name = article.getName();
    const price = article.getPrice();
    const quantity = article.getQuantity();
    return (
      <p>{name} {price}€ {quantity} {price*quantity}€</p>
    )
  }
}

class Catalog extends React.Component{
  render(){
    return(
      <ul>
      {this.props.articles.map((object, i) => <li key={i}><ArticleButton obj={object}/></li>)}
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
      cart: []
    }
  }

  render(){
    return (
      <div id="container">
        <p>{this.props.data.companyName}</p>
        <p>{this.props.data.companyAddress}</p>
        <p>{this.props.data.companyPhoneNumber}</p>
        <p>{this.props.data.companyMail}</p>
        
        <div id="catalog">
          <Catalog articles={this.props.data.articles}/>
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