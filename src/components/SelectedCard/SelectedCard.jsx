import React, { useEffect, useState, useCallback } from 'react';
import uniqueKey from 'unique-key';
import PropTypes from 'prop-types';
import { Icon, Card, Image } from 'semantic-ui-react';

import { productData, removeComment } from '../../api'
import { AddComment } from '../AddComment';
import { EditProduct } from '../EditProduct';

export const SelectedCard = ({ closeDescription, selectedProduct }) => {
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState(null);
  
  useEffect(async() => {
    setProduct(await productData(selectedProduct));
    setComments(await productData(`${selectedProduct}/comments`))
  }, [])

  const onRemove = useCallback(
    (commentId) => {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    }, []
  )

  const onAddComment = (newComment) => {
    setComments(prev => [...prev, newComment])
  }

  const onEditProduct = (edittingProduct) => {
    setProduct(edittingProduct)
  }
  
  const handlerRemove = useCallback(
    (productId, commentId) => {
      onRemove(commentId);
      removeComment(productId, commentId);
    }, []
  )

  return (
    <>
      {product !== null && (
        <>
        <div className="card">
            <Card key={uniqueKey('card')}>
              <Image
                key={uniqueKey('img')}
                src={product.imageUrl}
                alt="product img"
              />
              <Card.Content key={uniqueKey('card-content')}>
                <Card.Header key={uniqueKey('product-header')}>
                  {product.name}
                </Card.Header>
                <Card.Meta key={uniqueKey('product-meta')}>
                  <span key={uniqueKey('product-description')}>
                    {`Count: ${product.count} | width: ${product.size.width} | height: ${product.size.height} | ${product.weight}`}
                  </span>
                </Card.Meta>
                <h4 key={uniqueKey('comments-text')}>
                  Comments
                </h4>
                {comments
                  ? comments.map(comment => (
                    <>
                      <Card.Description key={uniqueKey(comment.description)}>
                        {comment.description}
                      </Card.Description>
                      <button onClick={() => handlerRemove(product.id, comment.id)} key={uniqueKey('delete')} className="delete">Delete</button>
                      <hr />
                    </>
                  )) : ''
                }
              </Card.Content>
              <Card.Content key={uniqueKey('content-extra')} extra>
                <a key={uniqueKey('total-comments')}>
                  <Icon/>
                  {`Total comments: ${product.comments.length}`}
                </a>
              </Card.Content>
              <AddComment
                onAddComment={onAddComment}
                key={uniqueKey('add-comment')}
                productId={product.id}
              />
              <EditProduct
                onEditProduct={onEditProduct}
                product={product}
                key={uniqueKey('add-comment')}
                productId={product.id}
              />
            </Card>
          </div>
          <button
            key={uniqueKey('close')}
            className="close"
            onClick={closeDescription}
          >
            Close
          </button>
        </>
      )}
    </>
  )
}

SelectedCard.propTypes = {
  closeDescription: PropTypes.func.isRequired,
  selectedProduct: PropTypes.string.isRequired,
}
