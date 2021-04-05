import React, { useState } from 'react';
import PropTypes from 'prop-types'

import { Button, Modal } from 'semantic-ui-react';
import { remove } from './../../api';

export const ModalWindow = ({ id }) => {
  const [open, setOpen] = useState(false);
  
  const handleDelete = () => {
    remove(id)
    setOpen(false)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Delete</Button>}
    >
      <Modal.Header>Delete</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <p>
            Are you sure in your choose? 
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          No
        </Button>
        <Button
          content="Yes"
          labelPosition='right'
          icon='archive'
          onClick={() => handleDelete()}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

ModalWindow.propTypes = {
  id: PropTypes.string.isRequired,
}
