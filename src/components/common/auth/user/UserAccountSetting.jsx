
// 'use client';
// import '@styles/common/auth/user/UserAccountSetting.css';
// import React, { useState, useEffect } from 'react';
// import { auth, database, storage } from '@/firebase';
// import { ref as dbRef, update, get } from 'firebase/database';
// import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { useRouter } from 'next/navigation';
// import { signOut } from 'firebase/auth';
// import { FaPen } from 'react-icons/fa';
// import Image from 'next/image';
// import Default from "@public/assets/Images/comman/header/default.svg"

// export default function UserAccountSetting({ user = {} }) {
//     const [loading, setLoading] = useState(true);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState(user.lastName || '');
//     const [email, setEmail] = useState(user.email || '');
//     const [phone, setPhone] = useState(user.phone || '');
//     const [country, setCountry] = useState(user.country || '');
//     const [profilePic, setProfilePic] = useState(null);
//     const [profilePicURL, setProfilePicURL] = useState(user.profilePicURL || '');
//     const [showPopup, setShowPopup] = useState(false);
//     const [popupMessage, setPopupMessage] = useState('');

//     const router = useRouter();

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const user = auth.currentUser;
//                 if (user) {
//                     const userRef = dbRef(database, 'usersData/' + user.uid);
//                     const snapshot = await get(userRef);
//                     if (snapshot.exists()) {
//                         const data = snapshot.val();
//                         const emailFirstPart = data.email.split('@')[0];
//                         setFirstName(data.firstName || emailFirstPart || '');
//                         setLastName(data.lastName || '');
//                         setEmail(data.email || '');
//                         setPhone(data.phone || '');
//                         setCountry(data.country || '');
//                         setProfilePicURL(data.profilePicURL || '');
//                     }
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         let newProfilePicURL = profilePicURL;

//         if (profilePic) {
//             try {
//                 const storageReference = storageRef(storage, `profilePictures/${auth.currentUser.uid}/${profilePic.name}`);
//                 await uploadBytes(storageReference, profilePic);
//                 newProfilePicURL = await getDownloadURL(storageReference);
//             } catch (error) {
//                 console.error("Error uploading profile picture:", error);
//                 setPopupMessage('Error uploading profile picture');
//                 setShowPopup(true);
//                 setTimeout(() => setShowPopup(false), 3000);
//                 setLoading(false);
//                 return;
//             }
//         }

//         const updates = {
//             firstName,
//             lastName,
//             email,
//             phone,
//             country,
//             profilePicURL: newProfilePicURL,
//         };

//         const userRef = dbRef(database, 'usersData/' + auth.currentUser.uid);
//         update(userRef, updates)
//             .then(() => {
//                 setPopupMessage('Profile updated successfully');
//                 setShowPopup(true);
//                 setTimeout(() => setShowPopup(false), 3000);
//                 setProfilePicURL(newProfilePicURL);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error updating profile:", error);
//                 setPopupMessage('Error updating profile');
//                 setShowPopup(true);
//                 setTimeout(() => setShowPopup(false), 3000);
//                 setLoading(false);
//             });
//     };

//     const handleProfilePicChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setProfilePic(file);
//             const previewURL = URL.createObjectURL(file);
//             setProfilePicURL(previewURL);
//         }
//     };

//     const handleSignOut = () => {
//         signOut(auth).then(() => {
//             router.push('/login');
//         }).catch((error) => {
//             console.error(error);
//         });
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="profile-contents">
//             {showPopup && (
//                 <div className="popup">
//                     <span>{popupMessage}</span>
//                     <button className="close-popup" onClick={() => setShowPopup(false)}>&#x1F5D9;</button>
//                 </div>
//             )}
//             <form className="profile-form" onSubmit={handleUpdate}>
//                 <h2>Profile</h2>
//                 <div className="profile-pic-wrapper">
//                     <Image src={profilePicURL || Default} alt="Profile" className="profile-pic" width={100} height={100}/>
//                     <label htmlFor="profilePic" className="profile-pic-upload">
//                         <FaPen className='profile-pen'/>
//                         <p className='choose-pic'>Choose photo</p>
//                         <input
//                             type="file"
//                             id="profilePic"
//                             onChange={handleProfilePicChange}
//                             accept="image/*"
//                         />
//                     </label>
//                 </div>
//                 <div className="Fname">
//                     <label htmlFor="fname">First name:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter first name"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         className="fname"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="Lname">
//                     <label htmlFor="lname">Last name:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter last name"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         className="lname"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="Pemail">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter email"
//                         value={email}
//                         className="email"
//                         autoComplete="off"
//                         disabled
//                     />
//                 </div>
//                 <div className="Phone">
//                     <label htmlFor="phno">Phone number:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter phone number"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         className="phno"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="Country">
//                     <label htmlFor="country">Country:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         className="country"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="save-button">
//                     <button className="save-changes" type="submit" disabled={loading}>Save</button>
//                 </div>
//             </form>
//         </div>
//     );
// }


// 'use client';
// import '@styles/common/auth/user/UserAccountSetting.css';
// import React, { useState, useEffect, useCallback } from 'react';
// import { auth, database, storage } from '@/firebase';
// import { ref as dbRef, update, get } from 'firebase/database';
// import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { useRouter } from 'next/navigation';
// import { signOut } from 'firebase/auth';
// import { FaPen } from 'react-icons/fa';
// import Image from 'next/image';
// import Default from "@public/assets/Images/comman/header/default.svg";
// import Cropper from 'react-easy-crop';
// import { getCroppedImg } from './cropImage';  // Utility for cropping

// export default function UserAccountSetting({ user = {} }) {
//     const [loading, setLoading] = useState(true);
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState(user.lastName || '');
//     const [email, setEmail] = useState(user.email || '');
//     const [phone, setPhone] = useState(user.phone || '');
//     const [country, setCountry] = useState(user.country || '');
//     const [profilePic, setProfilePic] = useState(null);
//     const [profilePicURL, setProfilePicURL] = useState(user.profilePicURL || '');
//     const [showPopup, setShowPopup] = useState(false);
//     const [popupMessage, setPopupMessage] = useState('');

//     const [crop, setCrop] = useState({ x: 0, y: 0 });
//     const [zoom, setZoom] = useState(1);
//     const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//     const [showCropPopup, setShowCropPopup] = useState(false);

//     const router = useRouter();

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const user = auth.currentUser;
//                 if (user) {
//                     const userRef = dbRef(database, 'usersData/' + user.uid);
//                     const snapshot = await get(userRef);
//                     if (snapshot.exists()) {
//                         const data = snapshot.val();
//                         const emailFirstPart = data.email.split('@')[0];
//                         setFirstName(data.firstName || emailFirstPart || '');
//                         setLastName(data.lastName || '');
//                         setEmail(data.email || '');
//                         setPhone(data.phone || '');
//                         setCountry(data.country || '');
//                         setProfilePicURL(data.profilePicURL || '');
//                     }
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         let newProfilePicURL = profilePicURL;

//         if (profilePic) {
//             try {
//                 const storageReference = storageRef(storage, `profilePictures/${auth.currentUser.uid}/${profilePic.name}`);
//                 await uploadBytes(storageReference, profilePic);
//                 newProfilePicURL = await getDownloadURL(storageReference);
//             } catch (error) {
//                 console.error("Error uploading profile picture:", error);
//                 setPopupMessage('Error uploading profile picture');
//                 setShowPopup(true);
//                 setTimeout(() => setShowPopup(false), 3000);
//                 setLoading(false);
//                 return;
//             }
//         }

//         const updates = {
//             firstName,
//             lastName,
//             email,
//             phone,
//             country,
//             profilePicURL: newProfilePicURL,
//         };

//         const userRef = dbRef(database, 'usersData/' + auth.currentUser.uid);
//         update(userRef, updates)
//             .then(() => {
//                 setPopupMessage('Profile updated successfully');
//                 setShowPopup(true);
//                 setTimeout(() => setShowPopup(false), 3000);
//                 setProfilePicURL(newProfilePicURL);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error updating profile:", error);
//                 setPopupMessage('Error updating profile');
//                 setShowPopup(true);
//                 setTimeout(() => setShowPopup(false), 3000);
//                 setLoading(false);
//             });
//     };

//     const handleProfilePicChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setProfilePic(file);
//             const previewURL = URL.createObjectURL(file);
//             setProfilePicURL(previewURL);
//             setShowCropPopup(true);  // Show cropping popup when image is selected
//         }
//     };

//     const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//         setCroppedAreaPixels(croppedAreaPixels);
//     }, []);

//     const handleCropSave = async () => {
//         try {
//             const croppedImage = await getCroppedImg(profilePicURL, croppedAreaPixels);
//             setProfilePic(croppedImage);  // Set the cropped image
//             setProfilePicURL(URL.createObjectURL(croppedImage));  // Preview cropped image
//             setShowCropPopup(false);  // Close crop popup
//         } catch (error) {
//             console.error("Error cropping image:", error);
//         }
//     };

//     const handleSignOut = () => {
//         signOut(auth).then(() => {
//             router.push('/login');
//         }).catch((error) => {
//             console.error(error);
//         });
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="profile-contents">
//             {showPopup && (
//                 <div className="popup">
//                     <span>{popupMessage}</span>
//                     <button className="close-popup" onClick={() => setShowPopup(false)}>&#x1F5D9;</button>
//                 </div>
//             )}
//             <form className="profile-form" onSubmit={handleUpdate}>
//                 <h2>Profile</h2>
//                 <div className="profile-pic-wrapper">
//                     <Image src={profilePicURL || Default} alt="Profile" className="profile-pic" width={100} height={100}/>
//                     <label htmlFor="profilePic" className="profile-pic-upload">
//                         <FaPen className='profile-pen'/>
//                         <p className='choose-pic'>Choose photo</p>
//                         <input
//                             type="file"
//                             id="profilePic"
//                             onChange={handleProfilePicChange}
//                             accept="image/*"
//                         />
//                     </label>
//                 </div>
//                 {/* Cropping Popup */}
//                 {showCropPopup && (
//                     <div className="crop-popup">
//                         <div className="crop-container">
//                             <Cropper
//                                 image={profilePicURL}
//                                 crop={crop}
//                                 zoom={zoom}
//                                 aspect={1}
//                                 onCropChange={setCrop}
//                                 onZoomChange={setZoom}
//                                 onCropComplete={onCropComplete}
//                             />
//                         </div>
//                         <button onClick={handleCropSave}>Save</button>
//                         <button onClick={() => setShowCropPopup(false)}>Cancel</button>
//                     </div>
//                 )}
//                 <div className="Fname">
//                     <label htmlFor="fname">First name:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter first name"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         className="fname"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="Lname">
//                     <label htmlFor="lname">Last name:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter last name"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         className="lname"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="Pemail">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter email"
//                         value={email}
//                         className="email"
//                         autoComplete="off"
//                         disabled
//                     />
//                 </div>
//                 <div className="Phone">
//                     <label htmlFor="phno">Phone number:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter phone number"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                         className="phno"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="Country">
//                     <label htmlFor="country">Country:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         className="country"
//                         autoComplete="off"
//                     />
//                 </div>
//                 <div className="save-button">
//                     <button className="save-changes" type="submit" disabled={loading}>Save</button>
//                 </div>
//             </form>
//         </div>
//     );
// }





'use client';
import '@styles/common/auth/user/UserAccountSetting.css';
import React, { useState, useEffect } from 'react';
import { auth, database, storage } from '@/firebase';
import { ref as dbRef, update, get } from 'firebase/database';
import { UserAuth } from "@context/AuthContext";
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { FaPen } from 'react-icons/fa';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import Default from "@public/assets/Images/comman/header/default.svg";

// Helper function to create the cropped image
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });


export const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    const image = new window.Image(); // Use the native Image constructor
    image.src = imageSrc;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    return new Promise((resolve, reject) => {
        image.onload = () => {
            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );

            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                resolve(new File([blob], 'croppedImage.jpg', { type: 'image/jpeg' }));
            }, 'image/jpeg');
        };

        image.onerror = (error) => {
            reject(new Error('Error loading image: ' + error));
        };
    });
};

export default function UserAccountSetting() {
    const { user } = UserAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login'); // Redirect to login page if user is null
        }
    }, [user, router]);

    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [country, setCountry] = useState(user?.country || '');
    const [profilePic, setProfilePic] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState(user?.profilePicURL || '');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
  
  // Cropper states
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = dbRef(database, 'usersData/' + user.uid);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            const emailFirstPart = data.email.split('@')[0];
            setFirstName(data.firstName || emailFirstPart || '');
            setLastName(data.lastName || '');
            setEmail(data.email || '');
            setPhone(data.phone || '');
            setCountry(data.country || '');
            setProfilePicURL(data.profilePicURL || '');
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result);
        setShowCropModal(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log('Cropped Area:', croppedArea);
    console.log('Cropped Area Pixels:', croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };
  

  const handleCropSave = async () => {
    if (!croppedAreaPixels) {
      console.error('Cropped area pixels are undefined. Ensure cropping is complete.');
      return;
    }
    
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedImage) {
        console.error('No cropped image returned.');
        return;
      }
  
      const croppedImageUrl = URL.createObjectURL(croppedImage);
      setProfilePicURL(croppedImageUrl);
      setProfilePic(new File([croppedImage], 'cropped-profile.jpg', { type: 'image/jpeg' }));
      setShowCropModal(false);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };
  
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newProfilePicURL = profilePicURL;

    if (profilePic) {
      try {
        const storageReference = storageRef(storage, `profilePictures/${auth.currentUser.uid}/${profilePic.name}`);
        await uploadBytes(storageReference, profilePic);
        newProfilePicURL = await getDownloadURL(storageReference);
        user.profilePicURL = newProfilePicURL;
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        setPopupMessage('Error uploading profile picture');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        setLoading(false);
        return;
      }
    }

    const updates = {
      firstName,
      lastName,
      email,
      phone,
      country,
      profilePicURL: newProfilePicURL,
    };

    const userRef = dbRef(database, 'usersData/' + auth.currentUser.uid);
    update(userRef, updates)
    .then(() => {
      
        setTimeout(() => {
          setShowPopup(false);
          // Refresh the entire application
          window.location.reload();
        }, 3000);
        setProfilePicURL(newProfilePicURL);
        // setPopupMessage('Profile updated successfully');
        // setShowPopup(true);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setPopupMessage('Error updating profile');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        // setLoading(false);
      });
  };


  return (
    <div className="profile-contents">
      {showPopup && (
        <div className="popup">
          <span>{popupMessage}</span>
          <button className="close-popup" onClick={() => setShowPopup(false)}>&#x1F5D9;</button>
        </div>
      )}

      {/* Crop Modal */}
      {showCropModal && (
        <div className="crop-modal">
          <div className="crop-container">
            <div className="cropper-wrapper">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
                showGrid={false}
              />
            </div>
            <div className="crop-controls">
              <div className="zoom-control">
                <label>Zoom</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="zoom-slider"
                />
              </div>
              <div className="button-controls">
                <button onClick={handleCropSave} className="save-btn">
                  Save
                </button>
                <button onClick={() => setShowCropModal(false)} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <form className="profile-form" onSubmit={handleUpdate}>
        <h2>Profile</h2>
        <div className="profile-pic-wrapper">
          <Image src={profilePicURL || Default} alt="Profile" className="profile-pic" width={100} height={100} />
          <label htmlFor="profilePic" className="profile-pic-upload">
            <FaPen className='profile-pen' />
            <p className='choose-pic'>Choose photo</p>
            <input
              type="file"
              id="profilePic"
              onChange={handleProfilePicChange}
              accept="image/*"
            />
          </label>
        </div>
        {/* Rest of the form remains the same */}
        <div className="Fname">
          <label htmlFor="fname">First name:</label>
          <input
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="fname"
            autoComplete="off"
          />
        </div>
        <div className="Lname">
          <label htmlFor="lname">Last name:</label>
          <input
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="lname"
            autoComplete="off"
          />
        </div>
        <div className="Pemail">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            className="email"
            autoComplete="off"
            disabled
          />
        </div>
        <div className="Phone">
          <label htmlFor="phno">Phone number:</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="phno"
            autoComplete="off"
          />
        </div>
        <div className="Country">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="country"
            autoComplete="off"
          />
        </div>
        <div className="save-button">
          <button className="save-changes" type="submit" disabled={loading}>Save</button>
        </div>
      </form>
    </div>
  );
}