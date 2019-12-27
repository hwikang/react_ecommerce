import React from 'react';
import FormInput from '../form-input/form-input.component'
import {signInWithGoogle} from '../../firebase/firebase.util';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss'
class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state={
            'email':'',
            'password':''
        }
    }
    handleSubmit = e =>{
        e.preventDefault();
        this.setState({
            email:'',
            password:''
        })
    }
    handleChange = e=>{
        const {value , name } =e.target;  //name=inputname , value
        console.log(name);
        this.setState({
            [name]:value
        });
    }
    render(){
        return(
            <div className='sign-in'>
                <h2>I already have account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <FormInput label='email' name='email' type='email' value={this.state.email} handleChange={this.handleChange} required/>
                    <label>Password</label>
                    <FormInput label='password' name='password' type='password' value={this.state.password} handleChange={this.handleChange} required/>
                 
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick ={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default SignIn;