import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types'
import { editProduct } from '../../api'

import { Modal, Form, Button } from 'semantic-ui-react';

export const EditProduct = ({ product, onEditProduct }) => {
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(product);

  const onChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      if (name === 'height') {
        setEditingProduct(prev => ({
          ...prev,
          size: {
            height: value,
          },
        }))
      }

      if (name === 'width') {
        setEditingProduct(prev => ({
          ...prev,
          size: {
            width: value,
          },
        }))
      }
      setEditingProduct(prev => ({
        ...prev,
        [name]: value
      }))
    }, []
  )

  const onSubmit = useCallback(
    () => {
      editProduct(product.id, editingProduct);
      onEditProduct(editingProduct);
      setEditingProduct(product);
      setOpen(false);
    }, [editingProduct]
  )

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Edit</Button>}
    >
      <Modal.Header>Edit</Modal.Header>
      <Modal.Content image>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Input
            onChange={event => onChange(event)}
            value={editingProduct.name}
            name="name"
            type="text"
            label='Product name'
            placeholder='Product name'
          />
          <Form.Input
            onChange={event => onChange(event)}
            value={editingProduct.imageUrl}
            name="imageUrl"
            type="text"
            label='Image Url'
            placeholder='Image Url'
          />
        </Form.Group>
        <Form.Group >
          <Form.Input
            onChange={event => onChange(event)}
            value={editingProduct.count}
            name="count"
            type="number"
            label='Count'
            placeholder='Count'
          />
          <Form.Input onChange={event => onChange(event)} value={editingProduct.size.width} name="width" type="number" label='Width' placeholder='Width' />
        </Form.Group>
        <Form.Group>
          <Form.Input
            onChange={event => onChange(event)}
            value={editingProduct.size.height}
            name="height"
            type="number"
            label='Height'
            placeholder='Height'
          />
          <Form.Input
            onChange={event => onChange(event)}
            value={editingProduct.weight}
            name="weight"
            type="text"
            label='Weight'
            placeholder='Weight'
          />
        </Form.Group>
        <Button type='submit'>Submit</Button>
        <Button onClick={() => setOpen(false)} type='reset'>Cancel</Button>
      </Form>
      </Modal.Content>
    </Modal>
  )
}

EditProduct.propTypes = {
  product: PropTypes.object,
  onEditProduct: PropTypes.func,
}
