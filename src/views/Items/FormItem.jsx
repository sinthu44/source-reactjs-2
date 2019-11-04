import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  FormFeedback,
  Row
} from 'reactstrap';
import React, { Component } from 'react';

class FormItem extends Component {

  static ENABLE = 10;

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: '',
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.state.submitting) {
      return;
    }

    await this.setState({
      submitting: true
    });

    const data = this.state;

    this.props.onSubmit(data).then(async (res) => {
      if (res.payload && (res.payload.status === 201 || res.payload.status === 200)) {
        return this.props.history.push(`/services/${this.props.match.params.service_id}/items`);
      }
      if (res.error && res.error.response) {
        this.setState({
          submitting: false
        });
      }
    }).catch(e => {
      return this.setState({
        submitting: false
      });
    });
  }

  componentWillReceiveProps = (props) => {
    const { item } = props;
    if (item && item !== {}) {
      this.setState({
        name: item.name || '',
        price: item.price || '',
        description: item.description || ''
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      error: ''
    });
  }

  render() {
    return (
      <Card>
      <CardBody>
      <Form autoComplete="off" onSubmit={this.handleSubmit} className="was-validated">
        <FormGroup>
          <InputGroup>
            <Input required type="text" name="name" placeholder="Name" onChange={this.handleChange} value={this.state.name} autoComplete="off" />
            <FormFeedback className="help-block">The name field is required.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input required type="text" name="price" placeholder="Price" onChange={this.handleChange} value={this.state.price} autoComplete="off" />
            <FormFeedback className="help-block">The price must be a number.</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input type="textarea" name="description" placeholder="Description" onChange={this.handleChange} value={this.state.description} autoComplete="off" />
          </InputGroup>
        </FormGroup>
      </Form>
      </CardBody>
      <CardFooter>
        <FormGroup className="form-actions">
          <Button type="submit" onClick={this.handleSubmit} size="sm" className="float-right" color="secondary">Submit</Button>
        </FormGroup>
      </CardFooter>
      </Card>
    )
  }
}

export default FormItem;
