import React from 'react'
import styled from 'styled-components'

import { Media } from 'react-bootstrap'

const Styles = styled.div`
  .mediaBody {
    background-color: white;
    opacity: 1;
    width: 382px;
    margin-left: auto;
  }
  .title {
    background-color: #ffa50094;
    font-size: large;
  }
  .titlesource {
    font-size: small;
    color: #3b1d1d;
  }
`

function NewsArticle(props) {
  
  const {source, author, title, description, url, urlToImage, publishedAt} = props.article 

  return (
    <Styles>
      {(() => {
        if (urlToImage) {
          return (
            <img
              width={385}
              height={150}
              className="mx-auto"
              src={urlToImage}
              alt="Generic placeholder"
            />
          );
        }
      })()}
      <Media.Body>
        <div className="mediaBody">
          <h4 className="title">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <strong>{source.name}</strong> {title}
            </a>
            <br />
            <div className="titlesource">
              &gt; {author} {new Date(publishedAt).toLocaleString()}
            </div>
          </h4>
          <p>{description}</p>
        </div>
      </Media.Body>
    </Styles>
  );
}

NewsArticle.defaultProps = {
  article: {}
}

export default NewsArticle