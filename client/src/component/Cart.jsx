import React from 'react'
import ArticleCart from './ArticleCart'

class Cart extends React.Component{
    render(){
      return(
        <ul id="cart-list-container">
        {
        this.props.cart.map((object, i) =>
          <li className="cart-list-element" key={i}><ArticleCart obj={object} onArticleClicked={(article) => this.props.onArticleClicked(article)}/></li>
        )}
        </ul>
      )
    }
}

export default Cart;