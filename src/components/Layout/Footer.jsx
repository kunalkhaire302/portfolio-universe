import React from 'react';

const Footer = () => {
    return (
        <footer className="relative z-10 bg-canvas py-8 text-center text-sm text-muted backdrop-blur-sm">
            <p>Designed & Built by Kunal Khaire</p>
            <p className="mt-2">© {new Date().getFullYear()} Portfolio Universe. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
