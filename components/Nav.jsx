'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { AnimateOnViewDiv, reveal, popReveal } from './AnimateOnViewDiv'

const Navbar = () => {
  const pathname = usePathname()
  const buttonLink = {
    name: (pathname === '/planner') ? 'Browse Schemes' : 'Plan Finances',
    href: (pathname === '/planner') ? '/schemes' : '/planner'
  }


  return (
    <nav className = 'bg-white dark:bg-gray-900 w-full z-20 mb-10 border-b border-gray-200 dark:border-gray-600'>
      <AnimateOnViewDiv
        {...reveal}
        className = 'max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'
      >

        <AnimateOnViewDiv
          {...popReveal}
          transition = {{ type: 'spring', stiffness: 100, delay: 0 }}
          className  = 'w-fit h-fit'
        >
          <Link href = '/' className = 'flex items-center'>
            <img src = '/icons/logo.svg' alt = '' className = 'h-8 mr-3' />
            <span className = 'self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Finances Made Easy</span>
          </Link>
        </AnimateOnViewDiv>


        <AnimateOnViewDiv
          {...popReveal}
          transition = {{ type: 'spring', stiffness: 100, delay: 0.5 }}
          className  = 'flex md:order-2'
        >
          <Link
            href = {buttonLink.href}
            className = 'text-white flex flex-row gap-2 items-center bg-blue-700 hover:bg-blue-800 active:ring-4 active:outline-none active:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            <Image
              src = '/icons/link.svg'
              alt = ''

              width = {50}
              height = {50}

              className = 'h-7 w-7 aspect-auto'
            />
            {buttonLink.name}
          </Link>
        </AnimateOnViewDiv>


        <div className = 'items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id = 'navbar-sticky'>
          <div className = 'flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <AnimateOnViewDiv
              {...popReveal}
              transition = {{ type: 'spring', stiffness: 100, delay: 0.1 }}
              className  = 'w-fit h-fit'
            >
              <Link
                href = '/'
                className = 'py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
              >
                Home
              </Link>
            </AnimateOnViewDiv>

            <AnimateOnViewDiv
              {...popReveal}
              transition = {{ type: 'spring', stiffness: 100, delay: 0.2 }}
              className  = 'w-fit h-fit'
            >
              <Link
                href = '/schemes'
                className = {
                  (pathname === '/schemes') ?
                  'py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                  : 'py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                }
              >
                Schemes
              </Link>
            </AnimateOnViewDiv>

            <AnimateOnViewDiv
              {...popReveal}
              transition = {{ type: 'spring', stiffness: 100, delay: 0.3 }}
              className  = 'w-fit h-fit'
            >
              <Link
                href = '/planner'
                className = {
                  (pathname === '/planner') ?
                  'py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                  : 'py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                }
              >
                Planner
              </Link>
            </AnimateOnViewDiv>

          </div>
        </div>

      </AnimateOnViewDiv>
    </nav>
  )
}

export default Navbar