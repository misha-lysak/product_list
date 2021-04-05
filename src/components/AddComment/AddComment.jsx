import React, { useState, useCallback } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { createComment } from '../../api'


export const AddComment = ({ productId }) => {
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isAllInputFull, setIsAllInputFull] = useState(true)

  const onChange = useCallback(
    (event) => {
      const { value } = event.target;
      setIsAllInputFull(true);

      setNewComment(({
        description: value,
        id: +new Date(),
        productId,
        date: +new Date(),
      }))
    }, []
  )

  const onSubmit = useCallback(
    () => {
      if (newComment.description === undefined) {
        setIsAllInputFull(false)
        return
      }

      createComment(productId, newComment);
      setNewComment('');
      setOpen(false)
      setIsAllInputFull(true)
    }, [newComment, open]
  )
    
    console.log(newComment);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Add new comment</Button>}
    >
      <Modal.Content>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Input onChange={event => onChange(event)} value={newComment.text} name="text" type="text" label='Comment' placeholder='Comment' />
          {!isAllInputFull && (
            <div className="error">Write some comment</div>
          )}
        </Form.Group>
        <Button type='submit'>Submit</Button>
        <Button onClick={() => setOpen(false)} type='reset'>Cancel</Button>
      </Form>
      </Modal.Content>
      
    </Modal>
  )
}

AddComment.propTypes = {
  productId: PropTypes.string.isRequired,
}
