'use client'
import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const navigation = [
  { name: 'About', href: '/about', current: true },
  { name: 'Services', href: '/services', current: false },
  { name: 'Location', href: '/location', current: false },
  { name: 'Reviews', href: '/reviews', current: false },
  { name: 'Contact', href: '#', current: false },
]

export default function Example() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(pathname || null);

  useEffect(() => {
    setHoveredPath(pathname);
  }, [pathname]);


  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link
                    key={'Home'}
                    href={'/'}
                  >
                    <Image
                      src="/assets/images/logo.png"
                      width={250}
                      height={250}
                      className="h-8 w-auto"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                  {navigation.map((item) => {
                    const isActive = item.href === pathname;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`py-2 rounded-md text-md lg:text-lg relative no-underline transition-all delay-150 hover:delay-0 ease-in-out ${isActive ? "text-black hover:text-zinc-300" : "text-gray-700 dark:text-dark"}`}
                        aria-current={item.href === pathname ? 'page' : undefined}
                      >
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              {navigation.map((item) => {
                const isActive = item.href === pathname;
                return (
                  <Disclosure.Button
                    as="a"
                    href={item.href}
                    className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${isActive ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"}`}
                    aria-current={item.href === pathname ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
