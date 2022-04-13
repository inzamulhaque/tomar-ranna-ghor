import React from 'react';
import useFitebase from '../../hooks/useFirebase';
import { Container, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const { handleSignUpWithPassword, myError } = useFitebase();

    const handleSubmitSignUp = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const cpassword = event.target.cpassword.value;
        handleSignUpWithPassword(email, password, cpassword);
    }
    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center mainFormContainer">
                <div className='shadow mx-auto formContainer'>
                    <h3 className='text-primary mb-3'>Sign Up</h3>
                    <Form onSubmit={handleSubmitSignUp}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control name="email" type="email" placeholder="name@example.com" required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control name="password" type="password" placeholder="Password" required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                            <Form.Control name="cpassword" type="password" placeholder="Confirm Password" required />
                        </FloatingLabel>
                        {
                            myError && <p className="text-center text-danger">{myError}</p>
                        }
                        <button type="submit" className='submitBtn button'>Sign Up</button>
                        <p>You Have Account? <Link to="/signin">Sign In</Link> </p>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default SignUp;