// 'use client';
// import React, { useState } from "react";
// import '@styles/common/auth/login.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
// import { ref, set } from 'firebase/database';
// import { auth, database } from '@firebase'; // Adjust this path based on your actual file structure
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [generalError, setGeneralError] = useState('');

//     const router = useRouter();

//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const handleEmailChange = (e) => {
//         setEmail(e.target.value);
//         setEmailError(''); // Clear email error on change
//         setGeneralError(''); // Clear general error on change
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//         setPasswordError(''); // Clear password error on change
//         setGeneralError(''); // Clear general error on change
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setGeneralError('');
//         setEmailError('');
//         setPasswordError('');
//         let valid = true;

//         if (!email || !validateEmail(email)) {
//             setEmailError('Invalid email address');
//             valid = false;
//         }

//         if (!password) {
//             setPasswordError('Password is required');
//             valid = false;
//         }

//         if (!valid) {
//             return;
//         }

//         try {
//             const userCredential = await signInWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Store user data in Firebase Realtime Database
//             const userRef = ref(database, 'usersData/' + user.uid);
//             await set(userRef, {
//                 uid: user.uid,
//                 email: user.email,
//                 firstName: user.email.split('@')[0],
//             });

//             router.push('/');
//         } catch (error) {
//             if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
//                 setGeneralError("Email or password is incorrect. Please try again");
//             } else {
//                 setGeneralError("An error occurred. Please try again.");
//             }
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleGoogleSignIn = async () => {
//         try {
//             const provider = new GoogleAuthProvider();
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;

//             // Store user data in Firebase Realtime Database
//             const userRef = ref(database, 'usersData/' + user.uid);
//             await set(userRef, {
//                 uid: user.uid,
//                 email: user.email,
//                 firstName: user.email.split('@')[0],
//             });

//             router.push('/');
//         } catch (err) {
//             if (err.code === 'auth/cancelled-popup-request') {
//                 setGeneralError('Unable to get profile information from Google.');
//             } else if (err.code !== 'auth/popup-closed-by-user') {
//                 setGeneralError(err.message);
//             }
//         }
//     };

//     return (
//         <div className="login">
//             <div className="login-container">
//                 <div className="login-heading">
//                     <h1>Login</h1>
//                     {generalError && <div className="error-message" style={{ paddingTop: "6px" }}>{generalError}</div>}
//                 </div>
//                 <form className="form" onSubmit={handleSubmit}>
//                     <Box component="div" noValidate autoComplete="off" className="email">
//                         <TextField
//                             id="outlined-email"
//                             label="Email"
//                             variant="outlined"
//                             className="custom-text-field"
//                             error={!!emailError}
//                             helperText={emailError}
//                             value={email}
//                             onChange={handleEmailChange}
//                         />
//                     </Box>

//                     <Box component="div" noValidate autoComplete="off" className="password">
//                         <TextField
//                             id="outlined-password"
//                             label="Password"
//                             variant="outlined"
//                             type={showPassword ? "text" : "password"}
//                             className="custom-text-field"
//                             error={!!passwordError}
//                             helperText={passwordError}
//                             value={password}
//                             onChange={handlePasswordChange}
//                             InputProps={{
//                                 endAdornment: (
//                                     <span className="eye" onClick={togglePasswordVisibility}>
//                                         <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                                     </span>
//                                 ),
//                             }}
//                         />
//                         <div className="forgot-password" style={{ width: "100%", display: "flex", justifyContent: "end", fontSize: "12px", fontFamily: "Inter", paddingTop: "6px" }}>
//                             <Link href="/forgot-password">Forgot Password?</Link>
//                         </div>
//                     </Box>

//                     <div className="login-button">
//                         <button className="login-btn" type="submit">Login</button>
//                     </div>

//                     <div className="google-signin">
//                         <button type="button" className="login-with-google-btn" onClick={handleGoogleSignIn}>Login with Google</button>
//                         <p style={{ fontFamily: "Inter", fontSize: "13px", paddingTop: "16px", textAlign: "center" }}>Don't have an account? <Link href="/signup">Sign up</Link></p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;

'use client';
import React, { useState, useEffect } from "react";
import '@styles/common/auth/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from 'firebase/database';
import { auth, database } from '@firebase'; // Adjust this path based on your actual file structure
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

    // Retrieve the previous page from local storage
    const previousPage = typeof window !== 'undefined' ? localStorage.getItem('previousPage') || '/' : '/';

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(''); // Clear email error on change
        setGeneralError(''); // Clear general error on change
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(''); // Clear password error on change
        setGeneralError(''); // Clear general error on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError('');
        setEmailError('');
        setPasswordError('');
        let valid = true;

        if (!email || !validateEmail(email)) {
            setEmailError('Invalid email address');
            valid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        }

        if (!valid) {
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user data in Firebase Realtime Database
            const userRef = ref(database, 'usersData/' + user.uid);
            await set(userRef, {
                uid: user.uid,
                email: user.email,
                firstName: user.email.split('@')[0],
            });

            // Update authentication status
            setIsAuthenticated(true);
        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setGeneralError("Email or password is incorrect. Please try again");
            } else {
                setGeneralError("An error occurred. Please try again.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Store user data in Firebase Realtime Database
            const userRef = ref(database, 'usersData/' + user.uid);
            await set(userRef, {
                uid: user.uid,
                email: user.email,
                firstName: user.email.split('@')[0],
            });

            // Update authentication status
            setIsAuthenticated(true);
        } catch (err) {
            if (err.code === 'auth/cancelled-popup-request') {
                setGeneralError('Unable to get profile information from Google.');
            } else if (err.code !== 'auth/popup-closed-by-user') {
                setGeneralError(err.message);
            }
        }
    };

    useEffect(() => {
        // Store the current page URL before redirecting to login
        if (typeof window !== 'undefined') {
            localStorage.setItem('previousPage', window.location.pathname);
        }
    }, []);

    useEffect(() => {
        // Redirect to previous page or home if authenticated
        if (isAuthenticated) {
            router.push(previousPage);
        }
    }, [isAuthenticated, previousPage, router]);

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-heading">
                    <h1>Login</h1>
                    {generalError && <div className="error-message" style={{ paddingTop: "6px" }}>{generalError}</div>}
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <Box component="div" noValidate autoComplete="off" className="email">
                        <TextField
                            id="outlined-email"
                            label="Email"
                            variant="outlined"
                            className="custom-text-field"
                            error={!!emailError}
                            helperText={emailError}
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </Box>

                    <Box component="div" noValidate autoComplete="off" className="password">
                        <TextField
                            id="outlined-password"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            className="custom-text-field"
                            error={!!passwordError}
                            helperText={passwordError}
                            value={password}
                            onChange={handlePasswordChange}
                            InputProps={{
                                endAdornment: (
                                    <span className="eye" onClick={togglePasswordVisibility}>
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                ),
                            }}
                        />
                        <div className="forgot-password" style={{ width: "100%", display: "flex", justifyContent: "end", fontSize: "12px", fontFamily: "Inter", paddingTop: "6px" }}>
                            <Link href="/forgot-password">Forgot Password?</Link>
                        </div>
                    </Box>

                    <div className="login-button">
                        <button className="login-btn" type="submit">Login</button>
                    </div>

                    <div className="google-signin">
                        <button type="button" className="login-with-google-btn" onClick={handleGoogleSignIn}>Login with Google</button>
                        <p style={{ fontFamily: "Inter", fontSize: "13px", paddingTop: "16px", textAlign: "center" }}>Don't have an account? <Link href="/signup">Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
