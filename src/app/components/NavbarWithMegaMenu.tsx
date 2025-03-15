'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IoCloseSharp } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';

// Mega Menu Data
const TABS = [
  { name: 'Osteopatia', links: ['/biodinamica', '/terapia-cranio-sacrale', '/approccio-meningeo', '/neonatale'] },
  { name: 'Movimento e Benessere', links: ['/yoga', '/hatana-yoga', '/yoga-immagine', '/yoga-gestanti', '/yoga-mamma-figlio', '/yoga-ormonale', '/pilates', '/gyrokinesis', '/reiki', '/ginnastica-posturale', '/ginnastica-ipopressiva', '/personal-trainer'] },
  { name: 'Fisioterapia e Riabilitazione', links: ['/riabilitazione', '/masso-terapia', '/decontrattuante', '/antistress', '/sportivo', '/linfodrenante', '/tecar-terapia', '/pancafit'] },
  { name: 'Ostetricia', links: ['/accompagnamento-gravidanza', '/corso-coppie-attesa', '/incontri-individuali', '/movimento-gravidanza', '/ginnastica-perineale', '/rilassamento', '/riabilitazione-perineale', '/massaggio-bimbo', '/svezzamento', '/dopoparto', '/menopausa'] },
  { name: 'Collaborazioni', links: ['/pediatra', '/medicina-cinese', '/dietista', '/naturopatia'] },
];

const NavbarWithMegaMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [expandedTabs, setExpandedTabs] = useState<{ [key: string]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMegaMenuOpen(false);
  };

  const openMegaMenu = () => {
    setIsMenuOpen(false);
    setIsMegaMenuOpen(true);
  };

  const closeMegaMenu = () => setIsMegaMenuOpen(false);

  const toggleExpand = (tabName: string) => {
    setExpandedTabs((prev) => ({ ...prev, [tabName]: !prev[tabName] }));
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white text-gray-900 fixed top-0 left-0 w-full shadow-lg z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Brand */}
          <motion.div whileHover={{ scale: 1.1 }} className="text-2xl font-light">
            <a href="/" className="font-display">Brand</a>
          </motion.div>

          {/* Search Bar */}
          <div className="flex-grow flex justify-center md:justify-end">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {['Home', 'Eventi', 'Contatti'].map((link) => (
              <motion.div key={link} whileHover={{ scale: 1.1 }} className="relative group font-light">
                <a href="#" className="text-gray-900 hover:text-teal-500 transition">{link}</a>
              </motion.div>
            ))}

            {/* Mega Menu Trigger */}
            <motion.div whileHover={{ scale: 1.1 }} className="relative font-light">
              <button onClick={openMegaMenu} className="text-gray-900 hover:text-teal-500 transition">
                I nostri servizi
              </button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="block md:hidden focus:outline-none">
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[72px] left-0 w-full bg-white shadow-lg rounded-lg z-50"
          >
            {['Home', 'Eventi', 'Contatti'].map((link) => (
              <a key={link} href="#" className="block px-4 py-3 text-gray-900 hover:bg-gray-200 transition">
                {link}
              </a>
            ))}
            <button onClick={openMegaMenu} className="block w-full text-left px-4 py-3 text-gray-900 hover:bg-gray-200 transition">
              I nostri servizi
            </button>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Mega Menu */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[72px] left-0 w-full bg-white text-gray-900 shadow-lg z-50 max-h-[70vh] overflow-y-auto"
          >
            <div className="text-right p-4">
              <button onClick={closeMegaMenu} className="text-gray-900 hover:text-red-500 transition">
                <IoCloseSharp size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
              {TABS.map((tab) => (
                <div key={tab.name} className="space-y-2">
                  <h4 className="text-lg font-bold">{tab.name}</h4>
                  <ul className="space-y-2">
                    {(isMobile ? (expandedTabs[tab.name] ? tab.links : tab.links.slice(0, 4)) : tab.links).map((route, idx) => (
                      <li key={idx} className="flex items-center pb-2 group">
                        <FaArrowRight className="mr-2 text-gray-500 group-hover:text-teal-500 transition" />
                        <a href={route} className="text-gray-700 hover:text-teal-500 transition">{route.split('/').pop()}</a>
                      </li>
                    ))}
                  </ul>
                  {isMobile && tab.links.length > 4 && (
                    <button onClick={() => toggleExpand(tab.name)} className="text-sm text-teal-500 hover:underline">
                      {expandedTabs[tab.name] ? 'Mostra meno' : 'Mostra di più'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarWithMegaMenu;
