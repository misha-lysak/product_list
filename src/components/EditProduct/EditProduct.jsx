import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types'
import { editProduct } from '../../api'

import { Modal, Form, Button } from 'semantic-ui-react';

export const EditProduct = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(product);
  const [isAllInputFull, setIsAllInputFull] = useState(true)

  const onChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setIsAllInputFull(true);

      if (name === 'height') {
        setNewProduct(prev => ({
          ...prev,
          size: {
            height: value,
          },
        }))
      }

      if (name === 'width') {
        setNewProduct(prev => ({
          ...prev,
          size: {
            width: value,
          },
        }))
      }
      setNewProduct(prev => ({
        ...prev,
        [name]: value
      }))
    }, []
  )

  console.log(product);

  const onSubmit = useCallback(
    () => {
      if (
        newProduct.name === undefined
        || newProduct.id === undefined
        || newProduct.imageUrl === undefined
        || newProduct.count === undefined
        || newProduct.size.width === undefined
        || newProduct.size.height === undefined
        || newProduct.weight === undefined
      ) {
        setIsAllInputFull(false);
        return;
      }

      editProduct(product.id, newProduct);
      setNewProduct(product);
      setOpen(false);
      setIsAllInputFull(true);
    }, [newProduct]
  )
    console.log('new', newProduct);
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
          <Form.Input onChange={event => onChange(event)} value={newProduct.name} name="name" type="text" label='Product name' placeholder='Product name' />
          <Form.Input onChange={event => onChange(event)} value={newProduct.imageUrl} name="imageUrl" type="text" label='Image Url' placeholder='Image Url' />
        </Form.Group>
        <Form.Group >
          <Form.Input onChange={event => onChange(event)} value={newProduct.count} name="count" type="number" label='Count' placeholder='Count' />
          <Form.Input onChange={event => onChange(event)} value={newProduct.size.width} name="width" type="number" label='Width' placeholder='Width' />
        </Form.Group>
        <Form.Group>
          <Form.Input onChange={event => onChange(event)} value={newProduct.size.height} name="height" type="number" label='Height' placeholder='Height' />
          <Form.Input onChange={event => onChange(event)} value={newProduct.weight} name="weight" type="text" label='Weight' placeholder='Weight' />
        </Form.Group>
        {!isAllInputFull && (
          <div className="error">All input are required</div>
        )}
        <Button type='submit'>Submit</Button>
        <Button onClick={() => setOpen(false)} type='reset'>Cancel</Button>
      </Form>
      </Modal.Content>
      
    </Modal>
  )
}

EditProduct.propTypes = {
  product: PropTypes.object,
}
