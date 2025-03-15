'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';
import { useMegaMenu } from './MegamenuContext';  // Import the useMegaMenu hook

const ResponsiveAnimatedUnderlineNavbar: FC<{ uniqueId: string }> = ({ uniqueId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toggleMenu } = useMegaMenu();  // Get toggleMenu from the context

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const getNavbarClasses = () => (isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900');
  const getLinkClasses = () => (isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-500');

  return (
    <nav className={`${getNavbarClasses()} sticky top-0 shadow-lg transition-colors duration-1000 ease-in-out z-50`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.1 }} className="text-2xl font-extralight">
          <a href="#" className="font-display">Brand</a>
        </motion.div>

        <button onClick={toggleMobileMenu} className="block md:hidden focus:outline-none">
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
        </button>

        <div className="hidden md:flex space-x-8">
          {['Home', 'Eventi', 'Contatti'].map((link) => (
            <motion.div key={link} whileHover={{ scale: 1.1 }} className="relative group font-extralight">
              <a href="#" className={getLinkClasses()}>{link}</a>
              <motion.div className="absolute left-0 bottom-0 h-1 w-full bg-blue-500 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}

          {/* New Link to Open MegaMenu */}
          <motion.div whileHover={{ scale: 1.1 }} className="relative group font-extralight">
            <button onClick={toggleMenu} className={getLinkClasses()}>
              I nostri servizi
            </button>
            <motion.div className="absolute left-0 bottom-0 h-1 w-full bg-blue-500 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </motion.div>
        </div>

        <div className="hidden md:flex items-center ml-4">
          <label className="flex items-center cursor-pointer">
            <div className={`relative w-14 h-7 ${isDarkMode ? 'bg-yellow-500' : 'bg-gray-300'} rounded-full shadow-inner`}>
              <motion.div
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full ${isDarkMode ? 'transform translate-x-6 bg-gray-800' : 'bg-white'}`}
                animate={{ x: isDarkMode ? 24 : 0 }}
              >
                <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} className={`text-${isDarkMode ? 'yellow-400' : 'gray-800'} w-4 h-4 m-1`} />
              </motion.div>
            </div>
            <input type="checkbox" className="hidden" checked={isDarkMode} onChange={toggleDarkMode} />
          </label>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} md:hidden`}>
            {['Home', 'Eventi', 'Contatti'].map((link) => (
              <a key={link} href="#" className="block px-4 py-2 font-extralight hover:underline">{link}</a>
            ))}
            <div className="flex items-center justify-center py-4">
              <label className="flex items-center cursor-pointer">
                <div className={`relative w-14 h-7 ${isDarkMode ? 'bg-yellow-500' : 'bg-gray-300'} rounded-full shadow-inner`}>
                  <motion.div
                    className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full ${isDarkMode ? 'transform translate-x-6 bg-gray-800' : 'bg-white'}`}
                    animate={{ x: isDarkMode ? 24 : 0 }}
                  >
                    <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} className={`text-${isDarkMode ? 'yellow-400' : 'gray-800'} w-4 h-4 m-1`} />
                  </motion.div>
                </div>
                <input type="checkbox" className="hidden" checked={isDarkMode} onChange={toggleDarkMode} />
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default ResponsiveAnimatedUnderlineNavbar;
