import React, { Component } from 'react';
import './SignUp.css'

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i    
    );
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentid: null,
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            repassword:null,
            errors: {
                studentid: '',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                repassword:''
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
            case 'studentid':
                errors.studentid =
                     value.length !== 6
                        ? 'Student Id must be at 6 characters' : '';
                break;
            case 'firstname':
                errors.firstname =
                    value.length < 3
                        ? 'firstname is at least 3 characters long' : '';
                break;
            case 'lastname':
                errors.lastname =
                    value.length < 3
                        ? 'lastname is at least 3 characters long' : '';
                break;
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
            case 'repassword':
                errors.repassword = 
                    errors.password === errors.repassword
                ?'password doesn not match ': '';
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
                    <label>Student_Id <span>*</span> </label>
                    
                    <input
                        type="text"
                        name="studentid"
                        placeholder="Student Id"
                        onChange={this.handleChange}
                        noValidate
                    />
                    {errors.studentid.length > 0 &&
                        (<label className='err'>{errors.studentid}</label>)
                    }

                    <label>First_Name  <span>*</span></label>

                    <input 
                        type="text" 
                        name="firstname" 
                        placeholder="FirstName" 
                        noValidate
                        onChange={this.handleChange}
                    />
                    {errors.firstname.length > 0 &&
                        (<label className='err'>{errors.firstname}</label>)
                    }

                    <label>Last_Name  <span>*</span></label>
                    <input
                        type="text" 
                        name="lastname" 
                        placeholder="LastName" 
                        noValidate
                        onChange = {this.handleChange} 
                    />
                    {errors.lastname.length > 0 &&
                        (<label className='err'>{errors.lastname}</label>)
                    }

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
                    
                    <label>Re-Password  <span>*</span></label>
                    <input type="password"
                    name="repassword" 
                    placeholder="Re-Password" 
                    noValidate
                    onChange={this.handleChange}
                    />
                    {errors.repassword.length > 0 &&
                        (<label className='err'>{errors.repassword}</label>)
                    }
                    
                    <input type="submit" value="Join Now" class='submit' />
                </div>
            </form>
        );
    }
}

export default SignUp; 