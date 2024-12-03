import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.componnent";
import './sign-in-form.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const signInWithGoogle = async () => {
      await signInWithGooglePopup();
        
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password)
            
            resetFormFields();

 
        }catch(error){
            if(error.code === "auth/invalid-credential"){
                alert('incorrect email or password')
            }
            console.log(error)

        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})

    }

    return( 
        <div className="sign-up-container">
            <h2>already have an account?</h2>
            <span>sign in with email and pswrd</span>
            <form onSubmit={handleSubmit}>

                <FormInput label='email' type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label='password' type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                   <Button type="submit">sign in</Button>
                   <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;