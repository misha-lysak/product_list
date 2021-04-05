import React, { useState, useCallback } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import { createProduct } from './../../api'

export const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState('');
  const [isAllInputFull, setIsAllInputFull] = useState(true);

  const onChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setIsAllInputFull(true);

      setNewProduct(prev => ({
        ...prev,
        id: +new Date(),
        [name]: value
      }))
    }, []
  )

  const onSubmit = useCallback(
    () => {
      if (
        newProduct.productName === undefined
        || newProduct.id === undefined
        || newProduct.imageUrl === undefined
        || newProduct.count === undefined
        || newProduct.width === undefined
        || newProduct.height === undefined
        || newProduct.weight === undefined
      ) {
        setIsAllInputFull(false);
        return;
      }

      createProduct(newProduct);
      setNewProduct('');
      setOpen(false);
      setIsAllInputFull(true);
    }, [newProduct]
  )
    
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Add new product</Button>}
    >
      <Modal.Header>Create product</Modal.Header>
      <Modal.Content image>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Input onChange={event => onChange(event)} value={newProduct.productName} name="productName" type="text" label='Product name' placeholder='Product name' />
          <Form.Input onChange={event => onChange(event)} value={newProduct.imageUrl} name="imageUrl" type="text" label='Image Url' placeholder='Image Url' />
        </Form.Group>
        <Form.Group >
          <Form.Input onChange={event => onChange(event)} value={newProduct.count} name="count" type="number" label='Count' placeholder='Count' />
          <Form.Input onChange={event => onChange(event)} value={newProduct.width} name="width" type="number" label='Width' placeholder='Width' />
        </Form.Group>
        <Form.Group>
          <Form.Input onChange={event => onChange(event)} value={newProduct.height} name="height" type="number" label='Height' placeholder='Height' />
          <Form.Input onChange={event => onChange(event)} value={newProduct.weight} name="weight" type="number" label='Weight' placeholder='Weight' />
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
