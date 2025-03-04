"use client"; // Ensure this runs on the client side in Next.js
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <form className="max-w-lg mx-auto">
            <div className="flex relative">
                <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-[#FF6347] sr-only dark:text-white">
                    Search
                </label>

                {/* Dropdown Button */}
                <button
                    id="dropdown-button"
                    onClick={toggleDropdown}
                    type="button"
                    className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-[#FF6347] bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                >
                    All categories
                    <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div
                        id="dropdown"
                        ref={dropdownRef}
                        className="absolute left-0 top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
                    >
                        <div className="py-2 text-sm text-[#FF6347] dark:text-gray-200">
                            <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Theater
                            </Link>
                            <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Cinema
                            </Link>
                            <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Event
                            </Link>
                            <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                up coming
                            </Link>
                        </div>
                    </div>
                )}

                {/* Search Input */}
                <div className="relative w-full">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-[#FF6347] focus:border-[#FF6347] dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-[#FF6347]"
                        placeholder="Search Mockups, Logos, Design Templates..."
                        required
                    />
                    <button
                        type="submit"
                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#FF6347] rounded-e-lg border border-[#FF6347] hover:bg-[#FF6347] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#FF6347] dark:hover:bg-[#FF6347] dark:focus:ring-[#FF6347]"
                    >
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    );
}
