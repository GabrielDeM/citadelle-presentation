import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import uploadcare from 'uploadcare-widget';

import './Signup.scss';
import { mapDynamicState } from '../../../../global/utils';
import { temp } from '../../../../global/store/site/actions';
import Field from '../../../../global/components/Field';
import FormValidator from '../../../../global/components/FormValidator';
import { fields, validations } from '../../../data/signupFields';

const {
  setFormData,
} = temp;

const mapStateToProps = mapDynamicState({
  global: 'auth: logged',
  site: 'temp: userCreated errorMessage userCreated',
});

const mapDispatchToProps = dispatch => ({
  setFormData: formData => dispatch(setFormData(formData, 'signup')),
})

class Signup extends React.Component {

  validator = new FormValidator(validations);

  state = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: null,
    resume: '',
    validation: this.validator.valid(),
    submitted: false,
    uploadComplete: false,
  }

  handleInputChange = e => {
    e.preventDefault();
    const { name, value, files } = e.target;

    this.setState({
      [name]: name === 'avatar' ? files[0] : value
    });
  }

  handleSubmit = e => {
    const { avatar } = this.state;
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation, submitted: true });

    if(validation.isValid) {
      if(avatar) this.uploadImage();
      else this.signup();
    }
  }

  uploadImage = () => {
    const {
      avatar,
    } = this.state;
    const fileUpload = uploadcare.fileFrom('object', avatar);

    fileUpload.done(file => {
      const avatar = `${file.uuid}/${file.sourceInfo.file.name}`;
      this.signup(avatar);
    })
  }

  signup = avatar => {
      const {
        username,
        password,
        email,
        resume,
      } = this.state;
      const { setFormData } = this.props;
      let formData = {
        username,
        password,
        email,
      };
      if(resume) formData = { ...formData, resume };
      if(avatar) formData = { ...formData, avatar };

      setFormData(formData);
      this.setState({ uploadCompleted: true });
  }

  render() {
    const { handleSubmit, handleInputChange, validator } = this;
    const { submitted } = this.state;
    const { userCreated, errorMessage } = this.props;
    let validation = submitted ?
      validator.validate(this.state) :
      this.state.validation;

    return (
      <div className="Signup">
        <div className="new-index">
          <h2>Inscription</h2>
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
            <input
              id="image"
              type="file"
              name="avatar"
              accept="image/*"
              onChange={files => handleInputChange(files)}
            />
            <label id="image-label" htmlFor="image">
              <button onClick={() => document.getElementById('image').click()} type="button" className="signup-button">
                Avatar
              </button>
            </label>
            <br/>

            <button className="signup-button" type="submit">S'inscrire</button>
            <br />
            <span className="userError">{errorMessage}</span>
            <br/>
            <Link className="link-login" to="/login">Vous avez déjà un compte?</Link>
            {
                userCreated
                ? <Redirect to="/login" />
                : ''
            }
          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
