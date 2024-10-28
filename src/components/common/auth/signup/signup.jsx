'use client';
import React, { useState, useEffect } from "react";
import '@styles/common/auth/Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged } from "firebase/auth";
import { ref, set } from 'firebase/database';
import { auth, database } from '@firebase'; // Adjust this path based on your actual file structure
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import validator from 'email-validator';
import { getIdToken } from 'firebase/auth'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state

    const router = useRouter();

    useEffect(() => {
        // Check if user is already logged in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Redirect if user is already logged in and login process is completed
                router.back(); // Redirect to home or another page
            } else {
                setLoading(false); // Set loading to false when done
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [router]);

    const validateEmail = (value) => {
        if (!validator.validate(value)) {
            return "Please enter a valid email address.";
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            return "Please enter a proper email address.";
        }

        return '';
    };

    const validatePassword = (value) => {
        if (value.length < 8) {
            return "Password should be at least 8 characters long.";
        }
        return '';
    };

    const checkEmailExists = async (email) => {
        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            return signInMethods.length > 0;
        } catch (error) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError('');
        setEmailError('');
        setPasswordError('');

        let emailErrorMessage = validateEmail(email);
        let passwordErrorMessage = validatePassword(password);

        if (emailErrorMessage || passwordErrorMessage) {
            setEmailError(emailErrorMessage);
            setPasswordError(passwordErrorMessage);
            return;
        }

        // Check if email already exists
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            setGeneralError('An account with this email already exists. Please log in.');
            return;
        }

        // Create new user account
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            
            const idtoken = await user.getIdToken();
            console.log("User ID Token:", idtoken);

            const userRef = ref(database, 'usersData/' + user.uid);
            await set(userRef, {
                uid: user.uid,
                email: user.email,
                firstName: email.split('@')[0],
            });

            router.back();

            const response = await fetch('http://localhost:5000/api/createSessionCookie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken: idtoken }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                // Store the session cookie in the browser
                document.cookie = `authToken=${data.sessionCookie}; path=/; domain=.yourdomain.com`;
    
                // You can now redirect or perform other actions
                router.push('/');
            } else {
                setGeneralError('Failed to create a session. Please try again.');
            }
            
            

            
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setGeneralError('An account with this email already exists. Please log in.');
            } else {
                setGeneralError('An error occurred. Please try again.');
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            
            const idtoken = await user.getIdToken();
            console.log("User ID Token:", idtoken);
    
            // Check if the user data already exists in the Firebase Realtime Databas
           
            
            const userRef = ref(database, 'usersData/' + user.uid);
            await set(userRef, {
                uid: user.uid,
                email: user.email,
                firstName: user.email.split('@')[0],
            });

            console.log('Google Sign-In successful and user data stored:', user);
            router.back();

            const response = await fetch('http://localhost:5000/api/createSessionCookie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idToken: idtoken }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                // Store the session cookie in the browser
                document.cookie = `authToken=${data.sessionCookie}; path=/; domain=.yourdomain.com`;
    
                // You can now redirect or perform other actions
                router.push('/');
            } else {
                setGeneralError('Failed to create a session. Please try again.');
            }

            
        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setGeneralError("Email or password is incorrect. Please try again.");
            } else {
                setGeneralError("An error occurred. Please try again.");
            }
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };


    return (
        <div className="signup">
            <div className="signup-container">
                <div className="signup-heading">
                    <h1>Create Your Account</h1>
                    {generalError && <p style={{ color: "red", paddingBottom: "6px", textAlign: "center", fontSize: "13px", fontFamily: "Inter" }}>{generalError}</p>}
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <Box component="div" className="email" noValidate autoComplete="off">
                        <TextField
                            id="outlined-email"
                            label="Email"
                            variant="outlined"
                            className="custom-text-field"
                            error={!!emailError}
                            helperText={emailError}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                    <Box component="div" className="password" noValidate autoComplete="off">
                        <TextField
                            id="outlined-password"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            className="custom-text-field"
                            error={!!passwordError}
                            helperText={passwordError}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <span className="eye" onClick={togglePasswordVisibility}>
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                ),
                            }}
                        />
                    </Box>
                    <div className="signup-button">
                        <button className="signup-btn" type="submit">Sign Up</button>
                    </div>
                    <div className="google-signin">
                        <button
                            type="button"
                            className="login-with-google-btn"
                            onClick={handleGoogleSignIn}
                        >
                            Sign up with Google
                        </button>
                        <div>
                            <p style={{ fontSize: "12px", lineHeight: "150%", fontFamily: "Inter", textAlign: "center", paddingTop: "12px" }}>
                                By signing up, you agree to our <Link href="/terms-of-service">Terms of services</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.
                            </p>
                            <p style={{ fontSize: "14px", fontFamily: "Inter", textAlign: "center", paddingTop: "12px" }}>
                                Already have an account? <Link href="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
