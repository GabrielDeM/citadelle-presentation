import React from 'react';
import classNames from 'classnames';

class Field extends React.Component {

  state = {
    input: React.createRef(),
    empty: true,
  }

  handleInput = e => {
    if(this.state.input.current.value.length > 0) this.setState({ empty: false });
    else this.setState({ empty: true });
    this.props.handleInputChange(e);
  }

  render() {
    const { field, type, content, validation } = this.props;

    return (
      <span>
        <div className="div-position">
          <input className="contact-field login-field" onChange={this.handleInput} placeholder={content} name={field} id={field} type={type} ref={this.state.input} />
          <label className={classNames('contact-label', 'login-label', {
            'field-has-content': this.state.empty === false
          })}>{content}</label>
        </div>
        {validation ? <span className="help-block">{validation[field].message}</span> : ''}
        <br />
      </span>
    );
  }
}

export default Field;
