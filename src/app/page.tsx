'use client'
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faHeart } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-8 sm:p-20 font-sans">
      <header className="text-center text-3xl font-bold mb-8">Welcome to Next.js + TailwindCSS!</header>
      <main className="grid gap-8">
        {/* Animated Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex justify-center">
          <Image src="/next.svg" alt="Next.js logo" width={180} height={38} priority className="dark:invert" />
        </motion.div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <motion.div key={item} whileHover={{ scale: 1.05 }} className="p-6 bg-white rounded-2xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Card {item}</h2>
              <p className="text-gray-700">This is a test card to check Tailwind styles.</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Click Me</button>
            </motion.div>
          ))}
        </div>

        {/* Icon Section */}
        <div className="flex justify-center gap-8 mt-8">
          <motion.div whileHover={{ rotate: 15, scale: 1.2 }} className="text-4xl text-blue-600">
            <FontAwesomeIcon icon={faCoffee} />
          </motion.div>
          <motion.div whileHover={{ rotate: -15, scale: 1.2 }} className="text-4xl text-red-600">
            <FontAwesomeIcon icon={faHeart} />
          </motion.div>
        </div>
      </main>
      <footer className="mt-12 text-center text-sm text-gray-500">© 2025 Next.js Project</footer>
    </div>
  );
};

export default Home;
