import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import './ProfilePage.scss';
import { mapDynamicState } from '../../../../global/utils';
import { temp } from '../../../../global/store/site/actions';
import { fields, validations } from '../../../data/profileFields';
import Field from '../../../../global/components/Field';
import FormValidator from '../../../../global/components/FormValidator';
import uploadcare from 'uploadcare-widget';

const {
  setFormData,
} = temp;

const mapStateToProps = mapDynamicState({
  global: 'auth: logged user',
  site: 'temp: userCreated errorMessage userCreated',
});

const mapDispatchToProps = dispatch => ({
  setFormData: formData => dispatch(setFormData(formData, 'profile')),
});

class ProfilePage extends React.Component {

  validator = new FormValidator(validations);

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    avatar: '',
    resume: '',
    validation: this.validator.valid(),
    errorMessage: '',
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
    this.setState({ validation, submitted: true })

    if(validation.isValid) {
      console.log('user changed')
      if(avatar) this.uploadImage();
      else this.change();
    }
  }

  uploadImage = () => {
    const {
      avatar,
    } = this.state;
    const fileUpload = uploadcare.fileFrom('object', avatar);

    fileUpload.done(file => {
      const avatar = `${file.uuid}/${file.sourceInfo.file.name}`;
      this.change(avatar);
    })
  }

  change = avatar => {
    const {
      email,
      password,
      confirmPassword,
      username,
      resume,
    } = this.state;

    const { setFormData, user } = this.props;
    let formData = {
      id: user._id,
      username,
      password,
      confirmPassword,
      email,
    };
    if(resume) formData = { ...formData, resume };
    if(avatar) formData = { ...formData, avatar };

    setFormData(formData);
    this.setState({ uploadCompleted: true });
  }

  render() {
    const { handleSubmit, handleInputChange, validator } = this;
    const { submitted, errorMessage, user } = this.props;
    let validation = submitted ?
      validator.validate(this.state) :
      this.state.validation;
    return (
      <div className="ProfilePage">
        <div className="profilepage">
        <h2>Bonjour {user.username}</h2>
          <form onSubmit={handleSubmit}>
            {fields.map(field => (
              <Field
                key={field.field}
                field= {field.field}
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
            <label htmlFor="image">
              <button className="profile-button" variant="contained" component="span">
                Avatar
              </button>
            </label>
            <br/>
            <button className="modify-button" variant="contained" color="primary" type="submit">
              Enregistrer
            </button>
            <br/>
            <span className="userError">{errorMessage}</span>
            <br/>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
