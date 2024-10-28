'use client';

import React from 'react';
import '@styles/error-page/ErrorPage.css';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
    return (
        <div className="error-page">
            <div className="error-page-container">
                <p className="error-404">404 </p>
                <p className="error-404-description">Page Not Found</p>
                <p className="page-doesnt-exist">The page you are looking for doesn't exist or has been moved.</p>

                {/* Use href in Link component for Next.js */}
                <Link href="/">
                    <button className="back-to-home">Back to Home</button>
                </Link>
            </div>
        </div>
    );
}
