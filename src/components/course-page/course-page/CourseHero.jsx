// 'use client';
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import shareBlack from '@public/assets/Images/course-page/hero-section/share.svg';
// import shareWhite from '@public/assets/Images/course-page/hero-section/share-white.png';
// import MasterClassEnquiryForm from '@components/common/auth/masterclass-form/masterClassEnquiry';
// import { useRouter } from "next/navigation";
// import { UserAuth } from "@context/AuthContext";

// export default function CourseHero(props) {
//     const [showShare, setShowShare] = useState(false);
//     const [pageUrl, setPageUrl] = useState('window.location.href');
//     const [showAlert, setShowAlert] = useState(false);
//     const [enquiry,setEnquiry]= useState(false);
//     const [demo,setDemo]= useState(false);
//     const { user, logOut, loading } = UserAuth();
//     const router = useRouter();

//     useEffect(() => {
//         // Check if window object is available
//         if (typeof window !== 'undefined') {
//             setPageUrl(window.location.href);
//         }
//     }, []);

//     useEffect(() => {
//         if (showShare) {
//             document.body.classList.add('overflow-hidden');
//         } else {
//             document.body.classList.remove('overflow-hidden');
//         }
//         return () => {
//             document.body.classList.remove('overflow-hidden');
//         };
//     }, [showShare]);

//     function courseShare() {
//         setShowShare(!showShare);
//     }
//     function showEnquiry(){
//         setEnquiry(!enquiry);
//     }
//     function showDemo(){
//         setDemo(!demo);
//     }

//     function shareToLinkedIn() {
//         const postTitle = encodeURIComponent('UI/UX Designing');
//         const postUrl = encodeURIComponent('https://trafyai.com/uiux-course');
//         window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}&title=${postTitle}`, '_blank', 'width=600,height=400');
//     }

//     function shareToTwitter() {
//         const postTitle = encodeURIComponent('UI/UX Designing');
//         const postUrl = encodeURIComponent('https://trafyai.com/uiux-course');
//         window.open(`https://twitter.com/intent/tweet?text=${postTitle}&url=${postUrl}`, '_blank', 'width=600,height=400');
//     }

//     function shareToFacebook() {
//         const postUrl = encodeURIComponent('https://trafyai.com/uiux-course');
//         window.open(`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`, '_blank', 'width=600,height=400');
//     }

//     function shareToWhatsApp() {
//         const postUrl = encodeURIComponent('https://trafyai.com/uiux-course');
//         window.open(`https://api.whatsapp.com/send?text=${postUrl}`, '_blank');
//     }

//     function copyUrlToClipboard() {
//         navigator.clipboard.writeText(pageUrl)
//             .then(() => {
//                 setShowAlert(true);
//                 setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds

//                 // Select the input element and highlight the text
//                 const inputElement = document.querySelector('.course-share-link input');
//                 inputElement.select();
//                 inputElement.setSelectionRange(0, inputElement.value.length);
//             })
//             .catch(err => {
//                 console.error('Failed to copy: ', err);
//             });
//     }

//     return (
//         <main>
//             <div className="hero-section">
//                 <div className="hero-section-container">
//                     <div className="hero-main">
//                         <div className="hero-label">
//                             <div className="hero-category"><p>{props.category}</p></div>
//                             <div className="hero-popularity"><p>{props.popularity}</p></div>
//                             <div className="share">
//                                 {/* <Image src={shareBlack} alt="" onClick={courseShare} className="course-share-icon-black" /> */}
//                                 <Image src={shareWhite} alt="" onClick={courseShare} className="course-share-icon-white" />
//                             </div>
//                         </div>
//                         <div className="hero-main-heading">
//                             <h1>{props.courseHeading}</h1>
//                         </div>
//                         <div className="hero-description">
//                             <p>{props.courseDescription}</p>
//                         </div>
//                         {/* <div className="hero-rating">
//                             <div className="hero-rating-number">{props.rating}</div>
//                             <div className="hero-rating-star">
//                                 <Image src={props.ratingIcon} alt="" />
//                             </div>
//                         </div> */}
//                         <div className="hero-price">
//                         <p><strong>INR {props.rate}</strong>  <span style={{textDecoration:"line-through",fontWeight:"400"}}>{props.initialRate}</span></p>
//                         </div>
//                         <div className="hero-cta">
//                             <div className="hero-enroll" onClick={showEnquiry}>Join now</div>
//                             <div className="hero-demo" onClick={showDemo}>Free Demo</div>
//                         </div>
//                     </div>
//                     {showShare &&
//                         <div className="course-share">
//                             <div className="course-share-exit">
//                                 <p>Share</p>
//                                 <Image src={props.closeIcon} alt="" onClick={courseShare} />
//                             </div>
//                             <div className="course-share-container">
//                                 <div className="course-share-socials">
//                                     <Image src={props.whatsappIcon} alt="whatsapp" onClick={shareToWhatsApp} />
//                                     <Image src={props.facebookIcon} alt="facebook" onClick={shareToFacebook} />
//                                     <Image src={props.linkedinIcon} alt="linkedin" onClick={shareToLinkedIn} />
//                                     <Image src={props.xIcon} alt="x" onClick={shareToTwitter} />
//                                 </div>
//                                 <div className="course-share-link">
//                                     <input type="text" value={pageUrl} readOnly />
//                                     <button onClick={copyUrlToClipboard}>Copy</button>
//                                 </div>
//                             </div>
//                         </div>
//                     }
//                     {showAlert &&
//                         <div className="alert">Link copied to clipboard</div>
//                     }
//                   {enquiry &&   <MasterClassEnquiryForm title="Get Started" courseFee={`${props.fee} `} courseType={`${props.formtype}`} courseName={`${props.courseName}`} courseDescription={`${props.courseDescription}`} /> }
//                   {demo &&   <MasterClassEnquiryForm title="Join Free Demo" courseFee={`${props.fee} `}/> }
// {/* 
//                     <div className="hero-sub">
//                         <div className="hero-platform">
//                             <div className="platform-heading"><p>{props.platform}</p></div>
//                             <div className="platform-images">
//                                 {props.iphoneIcon && <Image src={props.iphoneIcon} alt="iphone" />}
//                                 {props.macIcon && <Image src={props.macIcon} alt="imac" />}
//                                 {props.tabIcon && <Image src={props.tabIcon} alt="ipad" />}
//                                 {props.visionIcon && <Image src={props.visionIcon} alt="vision" />}
//                                 {props.watchIcon && <Image src={props.watchIcon} alt="iwatch" />}
//                             </div>
//                         </div>
//                         <div className="hero-start-date">
//                             <div className="start-date-heading"><p>{props.startDateH}</p></div>
//                             <div className="start-date"><p>{props.startDate}</p></div>
//                         </div>
//                         <div className="hero-level">
//                             <div className="level-heading"><p>{props.levelH}</p></div>
//                             <div className="level"><p>{props.level}</p></div>
//                         </div>
//                         <div className="hero-duration">
//                             <div className="duration-heading"><p>{props.durationH}</p></div>
//                             <div className="duration"><p>{props.duration}</p></div>
//                         </div>
//                     </div>  */}
//                 </div>
//             </div>
//         </main>
//     );
// }

'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import shareBlack from '@public/assets/Images/course-page/hero-section/share.svg';
import shareWhite from '@public/assets/Images/course-page/hero-section/share-white.png';
import MasterClassEnquiryForm from '@components/common/auth/masterclass-form/masterClassEnquiry';
import Enroll from "@components/common/enroll/Enroll";
import { useRouter } from "next/navigation";
import { UserAuth } from "@context/AuthContext";
import { useCart } from '@context/CartContext';

export default function CourseHero(props) {
    const [showShare, setShowShare] = useState(false);
    const [pageUrl, setPageUrl] = useState('window.location.href');
    const [showAlert, setShowAlert] = useState(false);
    const [enquiry, setEnquiry] = useState(false);
    const [demo, setDemo] = useState(false);
    const { user, logOut, loading } = UserAuth();
    const router = useRouter();

    const { setCartDetails } = useCart();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPageUrl(window.location.href);
        }
    }, []);

    useEffect(() => {
        if (showShare) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [showShare]);

    function courseShare() {
        setShowShare(!showShare);
    }

    function showEnquiry() {
        if (user) {
            // If user is logged in, show the enquiry form
            setCartDetails(props);

            // Navigate to the enroll page
            router.push('/enroll');
        } else {
            // If user is not logged in, redirect to the login page
            router.push('/login'); // Assuming your login page is at /login
        }
    }

    function showDemo() {
        if (user) {
            // If user is logged in, show the demo form
            setDemo(!demo);
        } else {
            // If user is not logged in, redirect to the login page
            router.push('/login');
        }
    }

    function shareToLinkedIn() {
        const postTitle = encodeURIComponent('UI/UX Designing');
        const postUrl = encodeURIComponent('https://trafyai.com/uiux-course');
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}&title=${postTitle}`, '_blank', 'width=600,height=400');
    }

    function shareToTwitter() {
        const postTitle = encodeURIComponent('UI/UX Designing');
        const postUrl = encodeURIComponent('https://trafyai.com/uiux-course');
        window.open(`https://twitter.com/intent/tweet?text=${postTitle}&url=${postUrl}`, '_blank', 'width=600,height=400');
    }

    function shareToFacebook() {
        const postUrl = encodeURIComponent('https://trafyai.com/uiux-course');
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`, '_blank', 'width=600,height=400');
    }

    function shareToWhatsApp() {
        const postUrl = encodeURIComponent('https://trafyai.com/uiux-course');
        window.open(`https://api.whatsapp.com/send?text=${postUrl}`, '_blank');
    }

    function copyUrlToClipboard() {
        navigator.clipboard.writeText(pageUrl)
            .then(() => {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds

                // Select the input element and highlight the text
                const inputElement = document.querySelector('.course-share-link input');
                inputElement.select();
                inputElement.setSelectionRange(0, inputElement.value.length);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }

    return (
        <main>
            <div className="hero-section">
                <div className="hero-section-container">
                    <div className="hero-main">
                        <div className="hero-label">
                            <div className="hero-category"><p>{props.category}</p></div>
                            <div className="hero-popularity"><p>{props.popularity}</p></div>
                            <div className="share">
                                <Image src={shareWhite} alt="" onClick={courseShare} className="course-share-icon-white" />
                            </div>
                        </div>
                        <div className="hero-main-heading">
                            <h1>{props.courseHeading}</h1>
                        </div>
                        <div className="hero-description">
                            <p>{props.courseDescription}</p>
                        </div>
                        <div className="hero-price">
                        <p><strong>INR {props.rate}</strong>  <span style={{textDecoration:"line-through",fontWeight:"400"}}>{props.initialRate}</span></p>
                        </div>
                        <div className="hero-cta">
                            <div className="hero-enroll" onClick={showEnquiry}>Join now</div>
                            <div className="hero-demo" onClick={showDemo}>Free Demo</div>
                        </div>
                    </div>
                    {showShare &&
                        <div className="course-share">
                            <div className="course-share-exit">
                                <p>Share</p>
                                <Image src={props.closeIcon} alt="" onClick={courseShare} />
                            </div>
                            <div className="course-share-container">
                                <div className="course-share-socials">
                                    <Image src={props.whatsappIcon} alt="whatsapp" onClick={shareToWhatsApp} />
                                    <Image src={props.facebookIcon} alt="facebook" onClick={shareToFacebook} />
                                    <Image src={props.linkedinIcon} alt="linkedin" onClick={shareToLinkedIn} />
                                    <Image src={props.xIcon} alt="x" onClick={shareToTwitter} />
                                </div>
                                <div className="course-share-link">
                                    <input type="text" value={pageUrl} readOnly />
                                    <button onClick={copyUrlToClipboard}>Copy</button>
                                </div>
                            </div>
                        </div>
                    }
                    {showAlert &&
                        <div className="alert">Link copied to clipboard</div>
                    }
                    
                    {demo && <MasterClassEnquiryForm title="Join Free Demo" courseFee={`${props.fee} `} />}
                </div>
            </div>
        </main>
    );
}
