import React from 'react';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-green-400 mb-2">CalCraftr</h2>
            <p className="text-gray-300 text-sm">Your personal wellness companion</p>
          </div>
          
          <div className="flex flex-col mb-6 md:mb-0">
            <h3 className="text-md font-medium mb-2">Contact Us</h3>
            <div className="flex items-center text-gray-300 text-sm mb-1">
              <Mail size={16} className="mr-2" />
              <span>support@calcraftr.com</span>
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <Phone size={16} className="mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-md font-medium mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CalCraftr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;