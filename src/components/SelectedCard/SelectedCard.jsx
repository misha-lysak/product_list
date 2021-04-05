import React, { useEffect, useState } from 'react';
import uniqueKey from 'unique-key';
import PropTypes from 'prop-types';

import { productData, removeComment } from '../../api'

import { Icon, Card, Image } from 'semantic-ui-react';
import { AddComment } from '../AddComment';
import { EditProduct } from '../EditProduct';

export const SelectedCard = ({ closeDescription, selectedProduct }) => {
  const [product, setProduct] = useState(null);

  useEffect(async() => {
    setProduct(await productData(selectedProduct))
  }, [])

  const handlerRemove = (productId, commentId) => {
    removeComment(productId, commentId)
  }

  console.log(product);

  return (
    <>
      {product && (
        <>
        <div className="card">
            <Card key={uniqueKey('card')}>
              <Image key={uniqueKey('img')} src={product.imageUrl} alt="product img" />
              <Card.Content key={uniqueKey('card-content')}>
                <Card.Header key={uniqueKey('product-header')}>{product.name}</Card.Header>
                <Card.Meta key={uniqueKey('product-meta')}>
                  <span key={uniqueKey('product-description')}>{`Count: ${product.count} | width: ${product.size.width} | height: ${product.size.height} | ${product.weight}`}</span>
                </Card.Meta>
                <h4 key={uniqueKey('comments-text')}>Comments</h4>
                {product.comments ? product.comments.map(comment => (
                  <>
                  <Card.Description key={uniqueKey(comment.description)}>
                    {comment.description}
                  </Card.Description>
                  <button onClick={() => handlerRemove(product.id, comment.id)} key={uniqueKey('delete')} className="delete">Delete</button>
                  <hr />
                  </>
                )) : ''}
              </Card.Content>
              <Card.Content key={uniqueKey('content-extra')} extra>
                <a key={uniqueKey('total-comments')}>
                  <Icon/>
                  {`Total comments: ${product.comments.length}`}
                </a>
              </Card.Content>
              <AddComment key={uniqueKey('add-comment')} productId={product.id} />
              <EditProduct product={product} key={uniqueKey('add-comment')} productId={product.id} />
            </Card>
          </div>
          <button key={uniqueKey('close')} className="close" onClick={closeDescription}>Close</button>
        </>
      )}
    </>
  )
}

SelectedCard.propTypes = {
  closeDescription: PropTypes.func.isRequired,
  selectedProduct: PropTypes.string.isRequired,
}

// selectedProduct: PropTypes.shape({
//   id: PropTypes.string.isRequired,
//   imageUrl: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   count: PropTypes.string.isRequired,
//   size: PropTypes.shape({
//     height: PropTypes.number.isRequired,
//     width: PropTypes.number.isRequired,
//   }),
//   weight: PropTypes.string.isRequired,
//   comments: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       productId: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       date: PropTypes.number.isRequired,  
//     }),
//   ),
// })