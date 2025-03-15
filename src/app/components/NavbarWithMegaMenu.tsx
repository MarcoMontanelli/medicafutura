'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IoCloseSharp } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';

// Mega Menu Data
const TABS = [
  { name: 'Products', links: ['/products/1', '/products/2', '/products/3'] },
  { name: 'Solutions', links: ['/solutions/1', '/solutions/2', '/solutions/3'] },
  { name: 'Resources', links: ['/resources/1', '/resources/2', '/resources/3'] },
  { name: 'Company', links: ['/company/1', '/company/2', '/company/3'] },
  { name: 'Pricing', links: ['/pricing/1', '/pricing/2', '/pricing/3'] },
];

const NavbarWithMegaMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const megaMenuRef = useRef(null);

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMegaMenu = () => setIsMegaMenuOpen(!isMegaMenuOpen);
  const closeMegaMenu = () => setIsMegaMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !(megaMenuRef.current as HTMLElement).contains(event.target as Node)) {
        closeMegaMenu();
      }
    };

    if (isMegaMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMegaMenuOpen]);

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="bg-white text-gray-900 fixed top-0 left-0 w-full shadow-lg transition-colors duration-300 ease-in-out z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Brand Logo */}
          <motion.div whileHover={{ scale: 1.1 }} className="text-2xl font-extralight">
            <a href="#" className="font-display">Brand</a>
          </motion.div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7FFFD4]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="block md:hidden focus:outline-none">
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'Eventi', 'Contatti'].map((link) => (
              <motion.div key={link} whileHover={{ scale: 1.1 }} className="relative group font-extralight">
                <a href="#" className="text-gray-900 hover:text-[#7FFFD4] transition">{link}</a>
                <motion.div className="absolute left-0 bottom-0 h-1 w-full bg-[#7FFFD4] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}

            {/* Mega Menu Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} className="relative group font-extralight">
              <button onClick={toggleMegaMenu} className="text-gray-900 hover:text-[#7FFFD4] transition">
                I nostri servizi
              </button>
              <motion.div className="absolute left-0 bottom-0 h-1 w-full bg-[#7FFFD4] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-40"
            >
              {/* Search Bar (Mobile) */}
              <div className="px-4 py-3">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7FFFD4]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {['Home', 'Eventi', 'Contatti'].map((link) => (
                <a key={link} href="#" className="block px-4 py-3 text-gray-900 hover:bg-gray-200 transition">
                  {link}
                </a>
              ))}

              {/* Mobile Mega Menu Toggle */}
              <button
                onClick={toggleMegaMenu}
                className="block w-full text-left px-4 py-3 text-gray-900 hover:bg-gray-200 transition"
              >
                I nostri servizi
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mega Menu (Sticky to Navbar) */}
      <div className="relative">
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div
              ref={megaMenuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-gray-800 text-white shadow-lg rounded-lg z-40 overflow-hidden"
            >
              {/* Close Button */}
              <div className="text-right p-4">
                <button onClick={closeMegaMenu} className="text-white">
                  <IoCloseSharp size={24} className="hover:text-red-500 transition-all duration-300" />
                </button>
              </div>

              {/* Tabs with Vertical Dividers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 sm:p-8">
                {TABS.map((tab, index) => (
                  <div key={tab.name} className={`space-y-2 ${index !== TABS.length - 1 ? 'lg:border-r lg:border-gray-600' : ''} pr-4`}>
                    <h4 className="text-lg font-bold mb-2">{tab.name}</h4>
                    <ul className="space-y-2">
                      {tab.links.map((route, idx) => (
                        <li key={idx} className="flex items-center pb-2 group hover:scale-105 transition-transform duration-300">
                          <FaArrowRight className="mr-2 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:text-[#7FFFD4]" />
                          <a href={route} className="text-gray-300 hover:text-[#7FFFD4] transition-all duration-300">
                            {tab.name} Link {idx + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add padding so content isn't hidden */}
      <div className="pt-16"></div>
    </>
  );
};

export default NavbarWithMegaMenu;
