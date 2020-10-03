import React, { Component } from 'react';
import './Login.css'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'coconut' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) { this.setState({ value: event.target.value }); }
    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class='label'>Enjoy Learning With Us</div>
                <div class='div-form'>
                    <label>Student_Id <span>*</span> </label>
                    <input type="text" name="Student_Id" placeholder="Student Id" required />

                    <label>Password  <span>*</span></label>
                    <input type="password" name="Password" placeholder="Password" required />

                    <div class="g-recaptcha" data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ">
                    </div>
                    <input type="submit" value="Join Now" class='submit' />
                </div>
            </form>
        );
    }
}

export default Login; 