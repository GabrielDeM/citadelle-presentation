import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';

import './Login.scss';
import { mapDynamicState } from '../../../../global/utils';
import { temp } from '../../../../global/store/site/actions';
import { auth } from '../../../../global/store/site/actions';
import FormValidator from '../../../../global/components/FormValidator';
import { fields, validations } from '../../../data/loginFields';
import Field from '../../../../global/components/Field';

const {
  setFormData,
} = temp;

const {
  logging,
} = auth;

const mapStateToProps = mapDynamicState('site: temp: logged errorMessage');
const mapDispatchToProps = dispatch => ({
  setFormData: formData => dispatch(setFormData(formData, 'login')),
  logging: () => dispatch(logging()),
})

class Login extends React.Component {

  validator = new FormValidator(validations);

  state = {
    email: '',
    password: '',
    validation: this.validator.valid(),
    errorMessage: '',
    submitted: false,
  }

  componentDidMount = () => {
    console.error(`security warning:
      componentDidMount to remove:
      /src/site/components/specifics/Login${__filename}:39`);
    window.z = () => {
      this.setState({ email: 'zougui@gmail.com', password: 'fefenou91' });
      this.login();
    }
  }


  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.logged === false && this.props.logged === true) {
      this.props.logging();
    }
  }

  handleInputChange = e => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation, submitted: true });

    if(validation.isValid) {
      this.login();
    }
  }

  login = () => {
    const { email, password } = this.state;
    const { setFormData } = this.props;
    const formData = {
      email,
      password,
    };
    setFormData(formData);
  }

  render() {
    const { handleSubmit, handleInputChange, validator } = this;
    const { submitted } = this.state;
    const { logged, errorMessage } = this.props;
    let validation = submitted ?
      validator.validate(this.state) :
      this.state.validation

    return (
      <div className="Login">
        <div className="new-index">
            <h2>Rejoignez votre citadelle!</h2>
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
            <button className="login-button" variant="contained" color="primary" type="submit">Login</button>
            <br />
            <span className="userError">{errorMessage}</span>
            <br/>
            <Link className="forgot-mdp" to="/signup">Vous n'avez pas encore de compte?</Link>
            {logged
              ? <Redirect to="/" />
              : false}
          </form>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
