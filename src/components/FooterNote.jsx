import React from 'react';
// Import Font Awesome - add this to your project if not already added
// You'll need to install with: npm install @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/fontawesome-svg-core
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';

const FooterNote = ({ language }) => {
  return (
    <footer className="bg-green-600 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p className="">
          {language === 'English'
            ? 'Note: Costs are estimates and may vary based on market prices and other factors.'
            : 'Kumbuka: Gharama ni makadirio na zinaweza kutofautiana kulingana na bei za soko na mambo mengine.'}
        </p>
        
        <div className="flex justify-center gap-3 mt-4 mb-3">
          <a href="https://www.facebook.com/share/1XQKGXCiLS/" className="text-white hover:text-green-200 transition-colors">
            <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" />
          </a>
          <a href="https://x.com/Fuga_App_Primax" className="text-white hover:text-green-200 transition-colors">
            <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/fuga__app?igsh=ZjhhdXRkdzZnODVm/" className="text-white hover:text-green-200 transition-colors">
            <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/company/primax_agritech/" className="text-white hover:text-green-200 transition-colors">
            <FontAwesomeIcon icon={faLinkedinIn} className="w-5 h-5" />
          </a>
        </div>
        
        <p className="text-sm mt-2">
          © 2025 Primax Agri Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterNote;