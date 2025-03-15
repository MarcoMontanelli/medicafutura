'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseSharp } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';
import { useMegaMenu } from './MegamenuContext'; // Import the context hook

const TABS = [
  { name: 'Products', links: ['/products/1', '/products/2', '/products/3'] },
  { name: 'Solutions', links: ['/solutions/1', '/solutions/2', '/solutions/3'] },
  { name: 'Resources', links: ['/resources/1', '/resources/2', '/resources/3'] },
  { name: 'Company', links: ['/company/1', '/company/2', '/company/3'] },
  { name: 'Pricing', links: ['/pricing/1', '/pricing/2', '/pricing/3'] },
];

const MegaMenuWithLinks = () => {
  const { isOpen, closeMenu } = useMegaMenu(); // Use the context state
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeMenu]);

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 w-full max-w-screen-lg bg-gray-800 text-white shadow-lg rounded-lg z-50 overflow-hidden 
                       m-4 sm:m-6 md:m-8 p-6 sm:p-8"
          >
            {/* Close Button */}
            <div className="text-right">
              <button onClick={closeMenu} className="text-white">
                <IoCloseSharp size={24} className="hover:text-red-500 transition-all duration-300" />
              </button>
            </div>

            {/* Tabs with Vertical Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {TABS.map((tab, index) => (
                <div key={tab.name} className={`space-y-2 ${index !== TABS.length - 1 ? 'lg:border-r lg:border-gray-600' : ''} pr-4`}>
                  <h4 className="text-lg font-bold mb-2">{tab.name}</h4>
                  <ul className="space-y-2">
                    {tab.links.map((route, idx) => (
                      <li key={idx} className="flex items-center pb-2 group hover:scale-105 transition-transform duration-300">
                        <FaArrowRight className="mr-2 text-white transition-transform duration-300 group-hover:rotate-180 group-hover:text-purple-400" />
                        <a href={route} className="text-gray-300 hover:text-purple-300 transition-all duration-300">
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
  );
};

export default MegaMenuWithLinks;
