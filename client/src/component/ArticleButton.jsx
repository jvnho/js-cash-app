import React from 'react'
import {formatPrice} from '../utils/Functions'
import {Article} from '../utils/Article'

class ArticleButton extends React.Component{
    render(){
      const article = this.props.obj;
      const available = (article.quantity > 0);
      return (<button className="article-add-btn" disabled={!available} onClick={() => 
          this.props.onArticleClicked(new Article(this.props.obj.name, this.props.obj.price, 1))}>
          {this.props.obj.name} {formatPrice(this.props.obj.price)}</button>)
    }
}

export default ArticleButton;