import React from 'react';

const Footer = () => {
    return (
        <footer className="py-8 text-center text-slate-500 text-sm relative z-10 bg-space-dark/80 backdrop-blur-sm">
            <p>Designed & Built by Kunal Khaire</p>
            <p className="mt-2">© {new Date().getFullYear()} Portfolio Universe. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
