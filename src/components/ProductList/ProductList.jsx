import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import uniqueKey from 'unique-key';

import { ModalWindow } from './../ModalWindow';

export const ProductList = ({ product, openProduct, onDelete}) => (
  <Item.Group key={uniqueKey(product.id)} className="card-container">
    <Item key={uniqueKey('card')} className="card">
      <Item.Image
        key={uniqueKey(product.imageUrl)}
        size='small'
        src={product.imageUrl}
      />
      <Item.Content key={uniqueKey('item-content')}>
        <Item.Header key={uniqueKey(product.name)}>
          {product.name}
        </Item.Header>
        <Item.Meta key={uniqueKey('item-meta')}>
          <span
            key={uniqueKey(product.count)}
            className='price'
          >
            {`Count: ${product.count} |`}
          </span>
          <span
            key={uniqueKey(product.weight)}
            className='stay'
          >
            {product.weight}
          </span>
        </Item.Meta>
          <p
            key={uniqueKey('comment')}
            onClick={() => openProduct(product.id)}
            className="comments"
            comments={product.comments}
          >
            Description
          </p>
      </Item.Content>
      <ModalWindow onDelete={onDelete} id={product.id} />
    </Item>
  </Item.Group>
)

ProductList.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    weight: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
  }),
  openProduct: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
}
