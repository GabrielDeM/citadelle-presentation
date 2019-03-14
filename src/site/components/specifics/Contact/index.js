import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames';

import './Contact.scss';
import { mapDynamicState } from '../../../../global/utils';
import { temp } from '../../../../global/store/site/actions';
import FormValidator from '../../../../global/components/FormValidator';
import { fields, validations } from '../../../data/contactFields';
import Field from '../../../../global/components/Field';

const {
  setFormData,
} = temp;

const mapStateToProps = mapDynamicState('site: temp: logged errorMessage');
const mapDispatchToProps = dispatch => ({
  setFormData: formData => dispatch(setFormData(formData, 'contact')),
})

class Contact extends React.Component {

  validator = new FormValidator(validations);

  state = {
    name: '',
    email: '',
    subject: '',
    message: '',
    validation: this.validator.valid(),
    errorMessage: '',
    submitted: false,
    emptyTextarea: true,
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if(prevProps.logged === false && this.props.logged === true) {
  //     this.props.logging();
  //     console.log('cDU log')
  //   }
  // }

  handleInputChange = e => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleTextareaChange = e => {
    if(e.target.value.length > 0) this.setState({ emptyTextarea: false });
    else this.setState({ emptyTextarea: true });
    this.handleInputChange(e);
  }

  handleSubmit = e => {
    e.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation, submitted: true });

    if(validation.isValid) {
      console.log('contact sent');
      this.contact();
      //emit.contact({ email, password });
      //on.logged(() => {
      //    this.props.contact(email);
      //    localStorage.setItem('email', email);
      //    this.setState({logged: true});
      //});
      //on.dordIncorrect((message) => this.setState({ errorMessage: message }));
      //on.userNotFound((message) => this.setState({ errorMessage: message }));
    }
  }

  contact = () => {
    const { name, email, subject, message } = this.state;
    const { setFormData } = this.props;
    const formData = {
      name,
      email,
      subject,
      message,
    };
    setFormData(formData);
  }

  render() {
    const { handleSubmit, handleInputChange, validator } = this;
    const { submitted } = this.state;
    const { errorMessage } = this.props;
    let validation = submitted ?
      validator.validate(this.state) :
      this.state.validation

    return (
      <div className="Contact">
        <div className="new-index">
            <h2>Envoyez nous un message !</h2>
          <form onSubmit={handleSubmit}>
            {fields.map(field => (
              <Field
                key={field.field}
                field={field.field}
                content={field.content}
                type={field.type || 'text'}
                validation={validation}
                handleInputChange={handleInputChange}
              />
            ))}
            <textarea name="message" onChange={this.handleTextareaChange} className="contact-textarea" placeholder="Message" cols="30" rows="10"></textarea>
            <label className={classNames('contact-label', 'contact-label-message', {
              'field-has-content': this.state.emptyTextarea === false
            })}>Message</label>
            <button className="contact-button" variant="contained" color="primary" type="submit">Envoyer</button>
            <br />
            <span className="userError">{errorMessage}</span>
            <br/>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
