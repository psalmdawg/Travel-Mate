import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <fieldset className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <input className="form-control" {...input} type={type}/>
    { touched && error && <span className="text-danger">{error}</span> }
  </fieldset>
)

class Signup extends Component{
  constructor(){
    super()

  }

  //form submit will not be allowed if errors are present. In built with redux form using the validate function!
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    // console.log(formProps)
    this.props.signupUser(formProps, this.props.history); //pass in history from react router 4 (for redirect));
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }

 //handle submit is built in with reduxform
  render(){
    // console.log(this.props)
    const {fields: { email, password, confirmPassword }, handleSubmit} = this.props;
    return(
      <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this) ) }>

        <h4>Sign Up</h4>
        <Field name="email" component={renderField} type="email" label="Email"/>

        <Field name="password" type="password" label="Password" component={renderField} />

        <Field name="confirmPassword" type="password" label="Confirm Password" component={renderField} />
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">
          Sign Up
        </button>

      </form>
    )
  }


}

function validate(formProps){
  const errors = {}
  // console.log(formProps)

  if (!formProps.email || formProps.email.trim() === '') {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password || formProps.password.trim() === '') {
    errors.password = 'Please enter a password';
  }

  if (!formProps.confirmPassword) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.confirmPassword) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state){
  return{
    errorMessage:state.auth.error,
  }
}

const reduxFormSignup = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'confirmPassword'],
  validate
})(Signup);



export default connect(mapStateToProps, actions)( withRouter(reduxFormSignup) )
