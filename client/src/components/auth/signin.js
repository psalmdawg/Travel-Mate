import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


class Signin extends Component {

  componentDidMount(){
    console.log(this.props.history)
  }

  handleFormValues = ({email, password}) => {
    this.props.signinUser({ email, password }, this.props.history); //pass in history from react router 4 (for redirect)
  };


  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className='alert alert-danger'>
          <strong>{this.props.errorMessage}</strong>
        </div>
      )
    }
  }
  //handleSubmit is from redux-form
  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={ handleSubmit(this.handleFormValues) }>

        <h4>Sign in</h4>
        <fieldset className="form-group">

          <Field placeholder="Email" className="form-control" name="email" component="input" type="text" label="Email" />
        </fieldset>

        <fieldset className="form-group">

          <Field placeholder="Password" className="form-control" name="password" component="input" type="password" label="Password" />
        </fieldset>
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">
          Sign in
        </button>

      </form>
    );
  }

}

function mapStateToProps(state){
  return{
    errorMessage:state.auth.error
  }
}

const reduxFormSignin = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin);

// export default reduxForm({ form: 'signin' }, null, actions)(Signin);

export default connect(mapStateToProps, actions)( withRouter(reduxFormSignin))
