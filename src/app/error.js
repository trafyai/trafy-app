'use client';

import React from 'react';
import '@styles/error-page/ErrorPage.css';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
    return (
        <div className="error-page">
            <div className="error-page-container">
                <p className="error-404">404 Error</p>
                <p className="error-404-description">Oh no! Something went wrong.</p>
                <p className="page-doesnt-exist">This page doesn't exist or is unavailable</p>

                {/* Use href in Link component for Next.js */}
                <Link href="/">
                    <button className="back-to-home">Back to Trafy</button>
                </Link>
            </div>
        </div>
    );
}
