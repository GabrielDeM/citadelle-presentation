import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';

export default class Loading extends React.Component {
  state = {
    canRedirect: false,
  }

  componentDidUpdate = prevProps => {
    const { redirect, completed, timeout } = this.props;
    if(redirect && completed && completed !== prevProps.completed) { // si il y a une redirection et si le chargement est fini
      // 'completed !== prevProps.completed' is used to avoid more setState than necessary
      setTimeout(() => this.setState({ canRedirect: true }), timeout || 1500);
    }
  }

  render() {
    const { color, size, thickness, message, completed, loading, redirect } = this.props;
    const { canRedirect } = this.state;

    if(loading && !completed)
      return (
        <div>
          <br />
          <CircularProgress color={color || 'secondary'} size={size || 40} thickness={thickness || 5} />
        </div>
      );
    else if(completed)
      return (
        <p style={{ color: '#129a37' }}>
          { message }
          { canRedirect && <Redirect to={redirect} /> }
        </p>
      );
    else return null;
  }
}
