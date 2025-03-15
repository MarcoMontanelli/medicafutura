'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Sezioni della pagina
const SECTIONS = [
  { id: 'biodinamica', title: 'Biodinamica', content: 'Testo descrittivo sulla biodinamica.', img: '/images/biodinamica.jpg' },
  { id: 'terapia-cranio-sacrale', title: 'Terapia Cranio-Sacrale', content: 'Informazioni sulla terapia cranio-sacrale.', img: '/images/cranio-sacrale.jpg' },
  { id: 'approccio-meningeo', title: 'Approccio Meningeo', content: 'Dettagli sull’approccio meningeo.', img: '/images/approccio-meningeo.jpg' },
  { id: 'neonatale', title: 'Neonatale', content: 'Descrizione dei trattamenti neonatali.', img: '/images/neonatale.jpg' },
];

const OsteopatiaPage = () => {
  const [activeSection, setActiveSection] = useState('');

  // Effetto Scrollspy per evidenziare la sezione attuale
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = '';
      SECTIONS.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative flex">
      {/* Sidebar Scrollspy */}
      <aside className="hidden lg:block w-1/4 fixed top-20 left-0 h-[80vh] overflow-auto p-6">
        <nav className="space-y-4">
          {SECTIONS.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className={`block px-4 py-2 rounded-md transition ${
                activeSection === section.id ? 'bg-teal-500 text-white font-bold' : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {section.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Contenuto principale */}
      <main className="lg:ml-1/4 w-full px-6 py-16 space-y-16">
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="min-h-screen flex flex-col justify-center space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900"
            >
              {section.title}
            </motion.h2>
            <p className="text-lg text-gray-700">{section.content}</p>
            <div className="relative w-full h-64 lg:h-96">
              <Image src={section.img} alt={section.title} layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default OsteopatiaPage;
