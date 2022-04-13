import React, { useState } from 'react';
import { Container, FloatingLabel, Form } from 'react-bootstrap';
import "./SignIn.css";
import google from '../../images/google.png'
import facebook from '../../images/facebook.png'
import useFirebase from '../../hooks/useFirebase';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const { handleSignInWithGoogle, handleSignInWithFacebook, handleSignInWithPassword, myError, handleResetPassword } = useFirebase();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleEmailBlur = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmitSignIn = event => {
        event.preventDefault();
        const myEmail = event.target.email.value;
        const password = event.target.password.value;
        handleSignInWithPassword(myEmail, password, from);
        // navigate(from, { replace: true });
    }

    const handleReset = () => {
        handleResetPassword(email);
    }
    return (
        <Container className="d-flex justify-content-center align-items-center mainFormContainer">
            <div className='shadow mx-auto formContainer'>
                <h3 className='text-primary mb-3'>Sign In</h3>
                <Form onSubmit={handleSubmitSignIn}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control onBlur={handleEmailBlur} name="email" type="email" placeholder="name@example.com" required />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control name="password" type="password" placeholder="Password" required />
                    </FloatingLabel>
                    {
                        myError && <p className="text-center text-danger">{myError}</p>
                    }
                    <button type="submit" className='submitBtn button'>Sign In</button>
                </Form>
                <button className='button' onClick={handleReset}>Password Reset</button>
                <p>You Have No Account? <Link to="/signup">Create Acoount</Link> </p>

                <h5 className="text-center mt-3">OR</h5>
                <button className='button googleBtn' onClick={() => handleSignInWithGoogle(from)}>
                    <img src={google} alt="" className="buttonImg" />
                    Sign In Google
                </button>

                <button className='button facebookBtn' onClick={() => handleSignInWithFacebook(from)}>
                    <img src={facebook} alt="" className="buttonImg" />
                    Sign In Facebook
                </button>

                <button className='button' onClick={() => navigate("/")}>
                    Back To Home
                </button>
            </div>
        </Container>
    );
};

export default SignIn;