'use client'
import '@styles/common/header/NavBar.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect, useContext } from "react";
import WhiteLogo from '@public/assets/Images/comman/header/whiteLogo.png';
import BlackLogo from '@public/assets/Images/comman/header/blackLogo.png';
import close from '@public/assets/Images/comman/header/close.png';
import close1 from '@public/assets/Images/comman/header/close (1).png';
import whiteHamburger from '@public/assets/Images/comman/header/wLogo (2).png';
import blackHamburger from '@public/assets/Images/comman/header/bLogo.png';
import { UserAuth } from '@context/AuthContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hover, setHover] = useState(false); 
    const timeoutRef = useRef(null);
    const menuRef = useRef(null);
    const router = useRouter();
    const { user, logOut, loading } = UserAuth();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
                document.body.classList.remove('overflow');
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    function toggleMenu() {
        setMenuOpen(!menuOpen);
        setHover(false); // Ensure dropdown is closed when toggling menu
        document.body.classList.toggle('overflow');
    }

    function handleNavigation() {
        setMenuOpen(false);
        setHover(false); // Ensure dropdown is closed when navigating
        document.body.classList.remove('overflow');
    }

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setHover(true); 
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setHover(false);
        }, 200);
    }

    const getFirstLetter = () => {
        if (user && user.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return '';
    };

    const handleLogOut = async () => {
        try {
            await logOut();
            setHover(false); 
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='navbar'>
            <div className='navbar-container'>
                <div className='navbar-log'>
                    <Link href="/"> <Image src={BlackLogo} alt="trafy logo" height={32} className="trafy-logo" /></Link>
                </div>
                
                <div className='menu-left'>
                        <Link href="/courses" className="menu-pathway" onClick={handleNavigation}>Pathways</Link>
                        <Link href="/blogs" className="menu-resources" onClick={handleNavigation}> Resources </Link>
                        <Link href="/" className="menu-innovation" onClick={handleNavigation}> Innovation Circle </Link>
                    </div>

                <div className='menu-lg'>
                   

                    <div className='menu-right'>
                        {!loading && !user ? 
                            (<div className='menu-no-profile'>
                                <Link href="/login" className="menu-login" onClick={handleNavigation}> Login</Link>
                                <Link href="/signup" className="menu-signup" onClick={handleNavigation}> Sign Up Free</Link>
                            </div>) 
                            :
                            (<div className='menu-profile'>
                                <Link href="/user-dashboard" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <div style={{ width: "36px", height: "36px", borderRadius: "100%", backgroundColor: "grey", display: "flex", justifyContent: "center", alignItems: "center", color: "black", fontFamily: "Inter" }}>{getFirstLetter()}</div>
                                </Link>

                                {hover && 
                                    (<div className="menu-user-dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                        <Link href="/user-dashboard" onClick={handleNavigation}><p>User Dashboard</p></Link>
                                        <p onClick={handleLogOut}>Logout</p>
                                    </div>)
                                }
                            </div>)
                        }
                    </div>
                </div>

                {/* 0------------------------------------Hamburger----------------------------------- */}
                <div className='menu-mobile'>
                    <Image src={blackHamburger} alt="" className={`hamburger ${menuOpen ? 'hide' : ''}`} style={{width:"30px",height:"20px"}} onClick={toggleMenu} />
                    <Image src={close1} alt="" className={`exit-icon ${menuOpen ? 'show' : ''}`} style={{width:"20px",height:"20px"}} onClick={toggleMenu} />

                    {menuOpen &&
                        <div className='menu-mobile-contents' ref={menuRef}>
                            <div className='menu-top-contents'>
                                <Link href="/courses" className="menu-pathway" onClick={handleNavigation}>Pathways</Link>
                                <Link href="/blogs" className="menu-resources" onClick={handleNavigation}> Resources </Link>
                                <Link href="/" className="menu-innovation" onClick={handleNavigation}> Innovation Circle </Link>
                            </div>

                            <div className='menu-bottom-contents'>
                                {!loading && !user ? 
                                    (<div className='menu-no-profile'>
                                        <Link href="/login" className="menu-login" onClick={handleNavigation}> Login</Link>
                                        <Link href="/signup" className="menu-signup" onClick={handleNavigation}> Sign Up Free</Link>
                                    </div>) 
                                    :
                                    (<div className='menu-profile'>
                                        <Link href="/user-dashboard" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleNavigation}>
                                            <div style={{ width: "36px", height: "36px", borderRadius: "100%", backgroundColor: "grey", display: "flex", justifyContent: "center", alignItems: "center", color: "black", fontFamily: "Inter" }}>{getFirstLetter()}</div>
                                        </Link>
                                    </div>)
                                }
                            </div>
                        </div>
                    }
                </div>
                {/* ------------------------------------------------------------------------------------------------------- */}
            </div>
        </div>
    )
}

export default Header;