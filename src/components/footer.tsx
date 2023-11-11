'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import SlideOver from './slideOver'

const navigation = {
  main: [
    { name: 'About', href: '/about', current: false },
    { name: 'Services', href: '/services', current: false },
    { name: 'Location', href: '/location', current: false },
    { name: 'Reviews', href: '/reviews', current: false },
    { name: 'Contact', href: '#', current: false },
  ],
}


export default function Footer() {
  const [isSlideOverOpen, setIsSlideOverOpen] = useState<boolean>(false);

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link 
                href={item.href} 
                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                onClick={(e) => {
                  if (item.name === 'Contact') {
                    e.preventDefault(); // prevent navigation
                    setIsSlideOverOpen(true);
                  }
                }}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; Nishida Chiropractic. All rights reserved.
        </p>
      </div>
      <SlideOver isOpen={isSlideOverOpen} onClose={() => setIsSlideOverOpen(false)} />
    </footer>
  )
}