// 'use client';

// import React, { useState, useEffect } from 'react';
// import '@styles/common/auth/masterClassEnquiry.css';

// const MasterClassEnquiryForm = (props) => {
//     const [formData, setFormData] = useState({
//         fname: "",
//         lname: "",
//         email: "",
//         phone: "",
//         city: "",
//         category: "student",
//         message: "",
//     });

//     const [errorMessages, setErrorMessages] = useState({
//         fname: "",
//         lname: "",
//         email: "",
//         phone: "",
//         city: "",
//         message: "",
//     });

//     const [isPopupVisible, setIsPopupVisible] = useState(true);
//     const [showPopup, setShowPopup] = useState(false);
//     const [popupMessage, setPopupMessage] = useState('');
//     const [popupType, setPopupType] = useState('');
//     const [razorpayScriptLoaded, setRazorpayScriptLoaded] = useState(false);

//     useEffect(() => {
//         const loadRazorpayScript = () => {
//             return new Promise((resolve, reject) => {
//                 if (window.Razorpay) {
//                     resolve(true);
//                 } else {
//                     const script = document.createElement("script");
//                     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//                     script.onload = () => {
//                         console.log("Razorpay SDK loaded successfully");
//                         setRazorpayScriptLoaded(true);
//                         resolve(true);
//                     };
//                     script.onerror = () => {
//                         console.error("Failed to load Razorpay SDK");
//                         reject(new Error("Failed to load Razorpay SDK"));
//                     };
//                     document.body.appendChild(script);
//                 }
//             });
//         };

//         loadRazorpayScript().catch(error => {
//             console.error('Error loading Razorpay script:', error);
//         });
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });

//         let errorMessage = "";
//         switch (name) {
//             case "fname":
//             case "lname":
//                 const namePattern = /^[A-Za-z]+$/;
//                 errorMessage = !namePattern.test(value) ? "Should contain alphabetic characters only." : "";
//                 break;
//             case "email":
//                 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 errorMessage = !emailPattern.test(value) ? "Please enter a valid email address." : "";
//                 break;
//             case "phone":
//                 const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//                 errorMessage = !phonePattern.test(value) ? "Please enter a valid phone number." : "";
//                 break;
//             case "city":
//                 errorMessage = !value ? "Please enter your city." : "";
//                 break;
//             default:
//                 break;
//         }

//         setErrorMessages({ ...errorMessages, [name]: errorMessage });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const { fname, lname, email, phone, city, category, message } = formData;

//         const newErrorMessages = {
//             fname: !fname ? "Please enter your first name." : "",
//             lname: !lname ? "Please enter your last name." : "",
//             email: !email ? "Please enter your email address." : "",
//             phone: !phone ? "Please enter your phone number." : "",
//             city: !city ? "Please enter your city." : "",
//             message: "" // No validation for the message field
//         };

//         setErrorMessages(newErrorMessages);

//         if (Object.values(newErrorMessages).some(message => message !== "")) {
//             return;
//         }

//         try {
//             // Step 1: Save form data to Firebase
//             await fetch(`https://masterclass-formdata-default-rtdb.firebaseio.com/enquiries.json`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData), 
//             });

//             // Step 2: Create Razorpay Order
//             const res = await fetch('http://localhost:5000/api/createOrder', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ amount: 199, name: "trafyai-MasterClass", description: "MasterClass Registration" }), // Adjust values as needed
//             });
//             const data = await res.json();

//             if (data.success) {
//                 if (razorpayScriptLoaded) {
//                     const options = {
//                         key: data.key_id,
//                         amount: data.amount,
//                         currency: "INR",
//                         name: data.product_name,
//                         description: data.description,
//                         order_id: data.order_id,
//                         handler: function (response) {
//                             alert("Payment Succeeded");
//                             // Optionally, handle post-payment actions here
//                         },
//                         prefill: {
//                             contact: formData.phone,
//                             name: `${formData.fname} ${formData.lname}`,
//                             email: formData.email,
//                         },
//                         theme: {
//                             color: "#2300a3"
//                         },
//                         image: 'https://firebasestorage.googleapis.com/v0/b/testing-f9c8c.appspot.com/o/trafy%20icon.png?alt=media&token=a14b5cd3-febe-4f10-90d4-9f2073646012',
//                     };
//                     const razorpay = new window.Razorpay(options);
//                     razorpay.on('payment.failed', function (response) {
//                         alert("Payment Failed");
//                     });
//                     razorpay.open();
//                 } else {
//                     alert("Razorpay SDK not loaded. Please try again.");
//                 }
//             } else {
//                 alert(data.msg);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setPopupMessage(`Error: ${error.message}`);
//             setShowPopup(true);
//         }
//     };

//     const closeForm = () => {
//         setIsPopupVisible(false);
//     };

//     return (
//         <>
//             {isPopupVisible && (
//                 <div className="popup-overlay">
//                     <div className="course-enquiry-form-contents">
//                         <button className="close-popup-button" onClick={closeForm}>x</button>
                     
//                         <form className="enquiryform" onSubmit={handleSubmit} autoComplete="off">
//                             <div className="enquiryform-heading">
//                                 <h2>{props.title}</h2>
//                             </div>
//                             <div className="enquiryname">
//                                 <div className="enquiryfname">
//                                     <input type="text" placeholder="First Name" name="fname" className="enquiry-fname" required onChange={handleChange} value={formData.fname} />
//                                     {errorMessages.fname && <p className="error-message">{errorMessages.fname}</p>}
//                                 </div>
//                                 <div className="enquirylname">
//                                     <input type="text" placeholder="Last Name" className="enquiry-lname" name="lname" required onChange={handleChange} value={formData.lname} />
//                                     {errorMessages.lname && <p className="error-message">{errorMessages.lname}</p>}
//                                 </div>
//                             </div>
//                             <div className="enquiryemail">
//                                 <input type="email" placeholder="Email" required className="enquiry-email" name="email" onChange={handleChange} value={formData.email} />
//                                 {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}
//                             </div>
//                             <div className="enquiryphone">
//                                 <input type="tel" placeholder="Phone Number" required className="enquiry-phone" name="phone" onChange={handleChange} value={formData.phone} />
//                                 {errorMessages.phone && <p className="error-message">{errorMessages.phone}</p>}
//                             </div>
//                             <div className="enquirycity">
//                                 <input type="text" placeholder="City" required className="enquiry-city" name="city" onChange={handleChange} value={formData.city} />
//                                 {errorMessages.city && <p className="error-message">{errorMessages.city}</p>}
//                             </div>
//                             <div className="enquirycategory">
//                                 <select name="category" className="enquiry-category" value={formData.category} onChange={handleChange}>
//                                     <option value="student">Student</option>
//                                     <option value="professional">Professional</option>
//                                     <option value="startup_founder">Startup Founder</option>
//                                 </select>
//                             </div>
                           
//                             <button type="submit" className="course-enquiry-button">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {showPopup && (
//                 <div className={`popup ${popupType}`}>
//                     <span>{popupMessage}</span>
//                     <button className="close-popup" onClick={() => setShowPopup(false)}>&#x1F5D9;</button>
//                 </div>
//             )}
//         </>
//     );
// };

// export default MasterClassEnquiryForm;


import React, { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import '@styles/common/auth/masterClassEnquiry.css';

const MasterClassEnquiryForm = (props) => {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        state: "",
        category: "student",
        message: "",
    });

    const [errorMessages, setErrorMessages] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        city: "",
        message: "",
    });

    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('');
    const [razorpayScriptLoaded, setRazorpayScriptLoaded] = useState(false);

    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve, reject) => {
                if (window.Razorpay) {
                    resolve(true);
                } else {
                    const script = document.createElement("script");
                    script.src = "https://checkout.razorpay.com/v1/checkout.js";
                    script.onload = () => {
                        console.log("Razorpay SDK loaded successfully");
                        setRazorpayScriptLoaded(true);
                        resolve(true);
                    };
                    script.onerror = () => {
                        console.error("Failed to load Razorpay SDK");
                        reject(new Error("Failed to load Razorpay SDK"));
                    };
                    document.body.appendChild(script);
                }
            });
        };

        loadRazorpayScript().catch(error => {
            console.error('Error loading Razorpay script:', error);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        let errorMessage = "";
        switch (name) {
            case "fname":
            case "lname":
                const namePattern = /^[A-Za-z]+$/;
                errorMessage = !namePattern.test(value) ? "Should contain alphabetic characters only." : "";
                break;
            case "email":
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                errorMessage = !emailPattern.test(value) ? "Please enter a valid email address." : "";
                break;
            case "phone":
                const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                errorMessage = !phonePattern.test(value) ? "Please enter a valid phone number." : "";
                break;
            case "city":
                errorMessage = !value ? "Please enter your city." : "";
                break;
            default:
                break;
        }

        setErrorMessages({ ...errorMessages, [name]: errorMessage });
    };

    const selectCountry = (val) => {
        setFormData({ ...formData, country: val, state: 'Select State' });
    };

    const selectState = (val) => {
        setFormData({ ...formData, state: val });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fname, lname, email, phone, city, country, state, category, message } = formData;

        const newErrorMessages = {
            fname: !fname ? "Please enter your first name." : "",
            lname: !lname ? "Please enter your last name." : "",
            email: !email ? "Please enter your email address." : "",
            phone: !phone ? "Please enter your phone number." : "",
            city: !city ? "Please enter your city." : "",
            message: "" // No validation for the message field
        };

        setErrorMessages(newErrorMessages);

        if (Object.values(newErrorMessages).some(message => message !== "")) {
            return;
        }

        try {
            await fetch(`https://masterclass-formdata-default-rtdb.firebaseio.com/enquiries.json`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), 
            });

            const res = await fetch('http://localhost:5000/api/createOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 199, name: "trafyai-MasterClass", description: "MasterClass Registration" }),
            });
            const data = await res.json();

            if (data.success) {
                if (razorpayScriptLoaded) {
                    const options = {
                        key: data.key_id,
                        amount: data.amount,
                        currency: "INR",
                        name: data.product_name,
                        description: data.description,
                        order_id: data.order_id,
                        handler: function (response) {
                            alert("Payment Succeeded");
                        },
                        prefill: {
                            contact: formData.phone,
                            name: `${formData.fname} ${formData.lname}`,
                            email: formData.email,
                        },
                        theme: {
                            color: "#2300a3"
                        },
                        image: 'https://firebasestorage.googleapis.com/v0/b/testing-f9c8c.appspot.com/o/trafy%20icon.png?alt=media&token=a14b5cd3-febe-4f10-90d4-9f2073646012',
                    };
                    const razorpay = new window.Razorpay(options);
                    razorpay.on('payment.failed', function (response) {
                        alert("Payment Failed");
                    });
                    razorpay.open();
                } else {
                    alert("Razorpay SDK not loaded. Please try again.");
                }
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error('Error:', error);
            setPopupMessage(`Error: ${error.message}`);
            setShowPopup(true);
        }
    };

    const closeForm = () => {
        setIsPopupVisible(false);
    };

    return (
        <>
            {isPopupVisible && (
                <div className="popup-overlay">
                    <div className="course-enquiry-form-contents">
                        <button className="close-popup-button" onClick={closeForm}>x</button>
                     
                        <form className="enquiryform" onSubmit={handleSubmit} autoComplete="off">
                            <div className="enquiryform-heading">
                                <h2>{props.title}</h2>
                            </div>
                            <div className="enquiryname">
                                <div className="enquiryfname">
                                    <input type="text" placeholder="First Name" name="fname" className="enquiry-fname" required onChange={handleChange} value={formData.fname} />
                                    {errorMessages.fname && <p className="error-message">{errorMessages.fname}</p>}
                                </div>
                                <div className="enquirylname">
                                    <input type="text" placeholder="Last Name" className="enquiry-lname" name="lname" required onChange={handleChange} value={formData.lname} />
                                    {errorMessages.lname && <p className="error-message">{errorMessages.lname}</p>}
                                </div>
                            </div>
                            <div className="enquiryemail">
                                <input type="email" placeholder="Email" required className="enquiry-email" name="email" onChange={handleChange} value={formData.email} />
                                {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}
                            </div>
                            <div className="enquiryphone">
                                <input type="tel" placeholder="Phone Number" required className="enquiry-phone" name="phone" onChange={handleChange} value={formData.phone} />
                                {errorMessages.phone && <p className="error-message">{errorMessages.phone}</p>}
                            </div>
                            <div className="enquirycountry">
                                <CountryDropdown
                                    value={formData.country}
                                    onChange={(val) => selectCountry(val)}
                                    className="country-dropdown"
                                    defaultOptionLabel="Select Country"  // Placeholder text
                                />
                            </div>
                            <div className="enquirystate">
                            {
  formData.country ? (
    <RegionDropdown
      country={formData.country}
      value={formData.state || ""}
      onChange={(val) => selectState(val)}
      className="state-dropdown"
      defaultOptionLabel="Select State"
    />
  ) : (
    <select disabled className="state-dropdown">
      <option>Select State</option> {/* Placeholder for disabled state */}
    </select>
  )
}

                            </div>
                            <div className="enquirycategory">
                                <select name="category"  placeholder="Select Profession" className="enquiry-category" value={formData.category} onChange={handleChange}>
                                    <option value="student">Student</option>
                                    <option value="professional">Professional</option>
                                    <option value="startup_founder">Startup Founder</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                           
                            <button type="submit" className="course-enquiry-button">Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {showPopup && (
                <div className={`popup ${popupType}`}>
                    <span>{popupMessage}</span>
                    <button className="close-popup" onClick={() => setShowPopup(false)}>&#x1F5D9;</button>
                </div>
            )}
        </>
    );
};

export default MasterClassEnquiryForm;
