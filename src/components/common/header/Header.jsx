"use client";
import "@styles/common/header/NavBar.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import whiteLogo from "@public/assets/Images/comman/header/blackLogo.png";
import trafyIcon from "@public/assets/Images/comman/header/trafy icon.png";
import close1 from "@public/assets/Images/comman/header/close.svg";
import blackHamburger from "@public/assets/Images/comman/header/hamburger.svg";
import { UserAuth } from "@context/AuthContext";
import Default from "@public/assets/Images/comman/header/default.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const timeoutRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null); // New ref for dropdown
  const router = useRouter();
  const { user, logOut, loading } = UserAuth();

  useEffect(() => {
    const handlePopState = () => {
      setMenuOpen(false);
      setHover(false);
      document.body.classList.remove("overflow");
    };
  
    window.addEventListener("popstate", handlePopState);
  
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        document.body.classList.remove("overflow");
      }
      // Close the dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHover(false);
      }
    };

    if (menuOpen || hover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, hover]);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
    setHover(false);
    document.body.classList.toggle("overflow");
  }

  function handleNavigation(targetPath) {
    if (targetPath.startsWith("#")) {
      setMenuOpen(false);
      setHover(false);
      document.body.classList.remove("overflow");
      const element = document.querySelector(targetPath);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (targetPath.startsWith("http")) {
      window.location.href = targetPath;
    } else if (router.pathname !== targetPath) {
      setMenuOpen(false);
      setHover(false);
      document.body.classList.remove("overflow");
      router.push(targetPath);
    }
  }

  const handleDropDown = () => {
    setHover(!hover);
  };

//   const handleLogOut = async () => {
//     try {
//         // Call the logout function
//         await logOut();
        
//         // Optionally reset hover state or other UI elements
//         setHover(false);

//         // Make a request to invalidate the session cookie on the backend
//         const response = await fetch('http://localhost:5000/api/createSessionCookie', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ idToken: null }),  // Ensure your backend handles this case correctly
//         });

//         // Check if the response is OK
//         if (!response.ok) {
//             throw new Error('Failed to invalidate session cookie');
//         }

//         // Redirect to home page (choose either `router.push` or `router.reload`)
//         router.push("/");
//     } catch (error) {
//         console.error('Error during logout:', error);
//     }
// };

const handleLogOut = async () => {
  try {
    // Call the logout function
    await logOut(); // Sign out the user

    // Notify the backend to clear the session cookie
    const response = await fetch('http://localhost:5000/api/clearSessionCookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clearSession: true }), // Indicate the session should be cleared
    });

    if (!response.ok) {
      throw new Error('Failed to clear session cookie');
    }

    // Redirect to home page
    router.push("/");
  } catch (error) {
    console.error('Error during logout:', error);
  }
};


  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-log">
          <Link href="/">
            <Image src={trafyIcon} className="trafy-icon" />
            <Image src={whiteLogo} alt="trafy logo" className="trafy-logo" />
          </Link>
        </div>

        <div className="menu-lg">
          <div className="menu-left">
            <Link
              href="/courses"
              className="menu-pathway"
              onClick={() => handleNavigation("/courses")}
            >
              Pathway
            </Link>
            <Link
              href="/"
              className="menu-pathway"
              onClick={() => handleNavigation("/")}
            >
              Masterclass
            </Link>
            <Link
              href=" http://localhost:3001"
              className="menu-resources"
              onClick={() => handleNavigation("https://blog.trafyai.com")}
            >
              Resources
            </Link>
          </div>
          <div className="menu-right-d">
            {!loading && !user ? (
              <Link
                href="/signup"
                className="menu-signup"
                onClick={() => handleNavigation("/signup")}
              >
                Get Started
              </Link>
            ) : (
              <div className="menu-profile" ref={dropdownRef}>
                <div onClick={handleDropDown}>
                <div className="user-profile-image-container"
                      >
                        <Image className="user-profile-image"
                          src={user?.profilePicURL || Default}
                          alt="Profile"
                          width={28} // Set this to match the container size
                          height={28} // Set this to match the container size
                          layout="fixed"
                         objectFit="cover"
                          quality={100}
                        />
                      </div>
                </div>

                {hover && (
                  <div className="menu-user-dropdown">
                    <Link
                      href="/account-settings"
                      onClick={() => handleNavigation("/account-settings")}
                    >
                      <p>Profile</p>
                    </Link>
                    <Link
                      href="/account-security"
                      onClick={() => handleNavigation("/account-security")}
                    >
                      <p>Security</p>
                    </Link>
                    <p onClick={handleLogOut}>Logout</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="menu-mobile">
          <Link
            href="/courses"
            className="menu-pathway"
            onClick={() => handleNavigation("/courses")}
            style={{ paddingRight: "16px" }}
          >
            Pathway
          </Link>
          <Image
            src={blackHamburger}
            alt=""
            className={`hamburger ${menuOpen ? "hide" : ""}`}
            onClick={toggleMenu}
          />
          <Image
            src={close1}
            alt=""
            className={`exit-icon ${menuOpen ? "show" : ""}`}
            onClick={toggleMenu}
          />

          {menuOpen && (
            <div className="menu-mobile-contents" ref={menuRef}>
              <div className="menu-top-contents">
                <Link
                  href="/"
                  className="menu-pathway"
                  onClick={() => handleNavigation("/")}
                >
                  Masterclass
                </Link>
                <Link
                  href="http://localhost:3001"
                  className="menu-resources"
                  onClick={() => handleNavigation("https://blog.trafyai.com")}
                >
                  Resources
                </Link>
                {user && (
                  <hr
                    style={{
                      borderBottom: "0",
                      borderTop: "1px solid var(--box-border)",
                      borderRightWidth: "0",
                      borderLeftWidth: "0",
                    }}
                  />
                )}
                {user && (
                  <Link
                    href="/account-settings"
                    className="menu-account-settings"
                    onClick={() => handleNavigation("/account-settings")}
                  >
                    Account Settings
                  </Link>
                )}
                {user && (
                  <Link
                    href="/account-security"
                    className="menu-account-security"
                    onClick={() => handleNavigation("/account-security")}
                  >
                    Security
                  </Link>
                )}
                {user && (
                  <p className="menu-account-logout" onClick={handleLogOut}>
                    Logout
                  </p>
                )}
              </div>
              {user && (
                <hr
                  style={{
                    borderBottom: "0",
                    borderTop: "1px solid var(--box-border)",
                    borderRightWidth: "0",
                    borderLeftWidth: "0",
                  }}
                />
              )}
              <div className="menu-right">
                {!loading && !user ? (
                  <Link
                    href="/signup"
                    className="menu-signup"
                    onClick={() => handleNavigation("/signup")}
                  >
                    Get Started
                  </Link>
                ) : (
                  <div className="menu-profile">
                    <Link href="/account-settings"
                      onClick={() => handleNavigation("/account-settings")}
>
                      <div className=""
                        style={{
                          width: "28px",
                          height: "2px",
                          borderRadius: "100%",
                          backgroundColor: "#f8f8f8",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          fontFamily: "Inter",
                        }}
                      >
                        <Image
                          src={user?.profilePicURL || Default}
                          alt="Profile"
                          width="23"
                          height="23"
                          style={{ borderRadius: "50%" , width:"100%", height:"100%"}}
                        />
                      </div>
                    </Link>

                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
