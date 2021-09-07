import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap'

class UpdateModal extends React.Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} >
                    <Form onSubmit={this.props.handleSubmit}>
                        <Form.Control type="text" name="name" defaultValue={this.props.selectedObj.name} />
                        <Form.Control type="text" name="image" defaultValue={this.props.selectedObj.image} />
                        <Button variant="primary" >
                            Save Changes
                        </Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default UpdateModal;
