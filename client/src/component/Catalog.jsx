import React from 'react'
import ArticleButton from './ArticleButton'

class Catalog extends React.Component{

    render(){
      return(
        <ul id="catalog-list-container">
        {
        this.props.articles.map((object, i) =>
          <li className="catalog-list-element" key={i}><ArticleButton obj={object} onArticleClicked={(article) => this.props.onArticleClicked(article)}/></li>
        )}
        </ul>
      )
    }
}

export default Catalog;