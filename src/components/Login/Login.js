import React, { Component } from 'react';
import './Login.css'

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i    
    );
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            email: null,
            password: null,
            errors: {
                
                email: '',
                password: '',
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 8
                        ? 'Password must be at least 8 characters long!'
                        : '';
                break;
            
            default:
                break;
        }

        this.setState({ errors, [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.handleSubmit} noValidate>
                <div class='label'>Enjoy Learning With Us</div>
                <div class='div-form'>
                  

                    <label>Email  <span>*</span></label>
                    <input 
                        type="email" 
                        name="Email" 
                        placeholder="email" 
                        noValidate 
                        onChange={this.handleChange}
                    />
                     {errors.email.length > 0 &&
                        (<label className='err'>{errors.email}</label>)
                    }

                    <label>Password  <span>*</span></label>
                    <input
                     type="password" 
                     name="password" 
                     placeholder="Password" 
                     noValidate
                     onChange={this.handleChange}
                    />
                    {errors.password.length > 0 &&
                        (<label className='err'>{errors.password}</label>)
                    }
                    
                    <input type="submit" value="Join Now" class='submit' />
                </div>
            </form>
        );
    }
}

export default Login; 