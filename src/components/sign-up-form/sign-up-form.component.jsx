import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.componnent";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";


const defaultFormFields = {
    displayName:'',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword ) {
            alert("password dsnt match")
                return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)

            

            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();

 
        }catch(error){
            if (error.code ==='auth/email-already-in-use'){
                alert('email already exists')
            }else{

                console.log('user creation error', error)
            }

        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})

    }

    return( 
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>sign up with email and pswrd</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='display name' type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label='email' type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label='password' type="password" required onChange={handleChange} name="password" value={password}/>

                <FormInput label='confirm password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button label='display name' type="submit">sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;