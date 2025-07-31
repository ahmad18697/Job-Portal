import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaGlobe
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Job Hunt</h2>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://x.com/ahmadkhan_ah"
              className="hover:text-gray-500"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmad18697/"
              className="hover:text-gray-500"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/ahmad18697"
              className="hover:text-gray-500"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://portfoilio-rose.vercel.app/"
              className="hover:text-gray-500"
              aria-label="Portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            © 2025 JobHunt. Made with ❤️ by <span className="font-medium">Ahmad Raza</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
