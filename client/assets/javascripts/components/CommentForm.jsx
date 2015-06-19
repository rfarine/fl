import React from 'react/addons';
import Input from 'react-bootstrap/lib/Input';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import FormActions from '../actions/FormActions';
import FormStore from '../stores/FormStore';

const CommentForm = React.createClass({
  displayName: 'CommentForm',

  propTypes: {
    url: React.PropTypes.string.isRequired,
    formData: React.PropTypes.object.isRequired,
    ajaxSending: React.PropTypes.bool.isRequired
  },

  handleSelect(selectedKey) {
    this.setState({formMode: selectedKey});
  },

  handleChange() {
    let obj;

    // This could also be done using ReactLink:
    // http://facebook.github.io/react/docs/two-way-binding-helpers.html
    if (this.state.formMode < 2) {
      obj = {
        author: this.refs.author.getValue(),
        text: this.refs.text.getValue()
      };
    } else {
      obj = {
        // This is different because the input is a native HTML element
        // rather than a React element.
        author: this.refs.inlineAuthor.getDOMNode().value,
        text: this.refs.inlineText.getDOMNode().value
      };
    }

    FormActions.updateComment(obj);
  },

  handleSubmit(e) {
    e.preventDefault();
    FormActions.submitComment(this.props.url, FormStore.getState().comment);
  },

  formHorizontal() {
    return (
      <div>
        <hr/>
        <form className='commentForm form-horizontal' onSubmit={this.handleSubmit}>
          <Input type='text' label='Name' placeholder='Your Name' labelClassName='col-sm-2'
                 wrapperClassName='col-sm-10'
                 ref='author' value={this.props.formData.author} onChange={this.handleChange}
                 disabled={this.props.ajaxSending}/>
          <Input type='textarea' label='Text' placeholder='Say something...'
                 labelClassName='col-sm-2'
                 wrapperClassName='col-sm-10' ref='text' value={this.props.formData.text}
                 onChange={this.handleChange}
                 disabled={this.props.ajaxSending}/>

          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'><input type='submit'
                                                              className='btn btn-primary'
                                                              value='Post'
                                                              disabled={this.props.ajaxSending}/>
            </div>
          </div>
        </form>
      </div>
    );
  },

  render() {
    let inputForm;
    inputForm = this.formHorizontal();
    return (
      <div>
        {inputForm}
      </div>
    );
  }
});

export default CommentForm;
