import React from 'react'
import {formatPrice} from '../utils/Functions'

class ArticleCart extends React.Component{
    render(){
        const article = this.props.obj;
        const name = article.getName();
        const price = article.getPrice();
        const quantity = article.getQuantity();
        return (
        <div className="cart-element-container">
            <p className="article-cart-detail" >{name} {formatPrice(price)}€ {quantity} {formatPrice(price*quantity)}</p>
            <button className="article-remove-btn" onClick={() => this.props.onArticleClicked(article)}>
            -
            </button>
        </div>
        )
    }
}

export default ArticleCart;