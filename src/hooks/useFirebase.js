import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import auth from '../firebase.init'
import { useNavigate } from 'react-router-dom';

const useFirebase = () => {
    const [user, setUser] = useState([]);
    const [myError, setMyError] = useState([]);
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user);
        });
    }, []);

    const handleSignInWithGoogle = (from) => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user);
                setMyError("");
                navigate(from, { replace: true });
            })
            .catch(error => {
                const errorMessage = error.message;
                setMyError(errorMessage);
            });
    }

    const handleSignInWithFacebook = (from) => {
        signInWithPopup(auth, facebookProvider)
            .then(result => {
                const user = result.user;
                setUser(user);
                setMyError("");
                navigate(from, { replace: true });
            })
            .catch(error => {
                const errorMessage = error.message;
                setMyError(errorMessage);
            });
    }

    const handleSignUpWithPassword = (email, password, confirmPassword) => {
        if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
            setMyError("please enter valid email");
            return;
        }

        if (password !== confirmPassword) {
            setMyError("password and confirm password are not same");
            return;
        }

        if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)) {
            setMyError("your password must contain one number and one special character and password length 6-16.");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                setMyError("");
                navigate("/signin");
            })
            .catch(error => {
                const errorMessage = error.message;
                setMyError(errorMessage);
            });

        sendEmailVerification(auth.currentUser)
            .then(() => setMyError("check your email"))
            .catch(error => {
                const errorMessage = error.message;
                setMyError(errorMessage);
            });
    }

    const handleSignInWithPassword = (email, password, from) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                setMyError("");
                console.log(user);

                navigate(from, { replace: true });
            })
            .catch(error => {
                const errorMessage = error.message;
                setMyError(errorMessage);
            });
    }

    const handleResetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMyError("");
            })
            .catch(error => {
                const errorMessage = error.message;
                setMyError(errorMessage);
            });
    }

    const handleSignOut = () => {
        signOut(auth)
            .then()
            .catch(error => {
                const errorMessage = error.message;
                setMyError(errorMessage);
            });
    }

    return { user, myError, handleSignInWithGoogle, handleSignInWithFacebook, handleSignUpWithPassword, handleSignInWithPassword, handleSignOut, handleResetPassword };
};

export default useFirebase;