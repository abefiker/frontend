'use client';

import { useState } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // For redirecting after logout
import { Bell, Menu, X, User, LogOut } from 'lucide-react';
// import { useAuth } from '@/app/context/auth-context';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const { user, logout } = useAuth();
  // const router = useRouter();

  // const handleLogout = async () => {
  //   await logout();
  //   router.push('/');
  // };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-4xl font-bold text-[#2F4F4F] mx-4 hover:transform hover:scale-102 cursor-pointer">Betee</Link>

        {/* Desktop Navigation */}
        <div className="hidden ml-auto md:flex space-x-6">
          <Link href="/House" className="text-black px-6 py-2 hover:text-[#2F4F4F] shadow-md">House</Link>
          <Link href="/Hotel" className="text-black px-6 py-2 hover:text-[#2F4F4F]  shadow-md">Hotel</Link>
          <Link href="/Pension" className="text-black px-6 py-2 hover:text-[#2F4F4F] shadow-md">Pension</Link>
        </div>

        {/* Right-side icons */}
        <div className="ml-10 flex items-center space-x-4">
          <Link href={'/notification'} type='button' className="p-2 rounded-full bg-[#2F4F4F] hover:bg-[#4a7e7e]">
            <Bell className="text-white w-5 h-5" />
          </Link>
          <Link href="/login" className="hidden md:block bg-[#2F4F4F] px-4 py-2 text-white hover:bg-[#4a7e7e] transition">Sign In</Link>

          <button className="md:hidden p-2" onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6 text-[#2F4F4F]" /> : <Menu className="w-6 h-6 text-[#2F4F4F]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-100 shadow-md mt-2 flex flex-col items-center space-y-4 py-4">
          <Link href="/theater" className="text-black px-6 py-2 hover:text-[#2F4F4F]" onClick={toggleMenu}>Theaters</Link>
          <Link href="/cinema" className="text-black px-6 py-2 hover:text-[#2F4F4F]" onClick={toggleMenu}>Cinemas</Link>
          <Link href="/event" className="text-black px-6 py-2 hover:text-[#2F4F4F]" onClick={toggleMenu}>Events</Link>
          <Link href="/login" className="bg-[#2F4F4F] px-4 py-2 text-white hover:bg-[#4a7e7e] transition" onClick={toggleMenu}>Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
