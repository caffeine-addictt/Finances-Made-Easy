'use client'

import Link from 'next/link'
import Image from 'next/image'

import { AnimateOnViewDiv } from './AnimateOnViewDiv'

const Footer = () => {
  return (
    <footer className = 'w-full h-fit mt-10 py-5 bottom-0 bg-zinc-900 text-white'>
      <AnimateOnViewDiv
        initial = {{ opacity: 0 }}
        animate = {{ opacity: 1 }}
        className = 'flex w-[80%] h-fit mx-auto'
      >
        {/* Copyright */}
        <div className = 'mr-auto ml-0 text-sm font-light self-end'>
          <p>&copy; {(new Date()).getFullYear()}</p>
          <p>Ng Jun Xiang, FIE Group 3</p>
        </div>


        <div className = 'flex flex-row gap-5 mr-0 ml-auto self-center'>
          {/* Schemes */}
          <AnimateOnViewDiv
            initial    = {{ opacity: 0 }}
            animate    = {{ opacity: 1 }}
            exit       = {{ opacity: 0 }}
            transition = {{ type: 'spring', stiffness: 50, duration: 0.5, delay: 0.5 }}
            className  = 'h-fit w-fit ml-auto mr-0'
          >
            <Link
              href = '/schemes'
              className = 'flex flex-row gap-2 py-1 px-2 w-fit h-10 justify-center items-center rounded-md bg-blue-600 opacity-80 hover:opacity-95 active:border'
            >
              <Image
                src = '/icons/link.svg'
                alt = ''

                width = {50}
                height = {50}

                className = 'h-7 w-7 aspect-auto'
              />
              <span className = 'h-fit text-normal font-medium'>Browse Schemes</span>
            </Link>
          </AnimateOnViewDiv>

          {/* Planner */}
          <AnimateOnViewDiv
            initial    = {{ opacity: 0 }}
            animate    = {{ opacity: 1 }}
            exit       = {{ opacity: 0 }}
            transition = {{ type: 'spring', stiffness: 50, duration: 0.5, delay: 0.75 }}
            className  = 'h-fit w-fit ml-auto mr-0'
          >
            <Link
              href = '/planner'
              className = 'flex flex-row gap-2 py-1 px-2 w-fit h-10 justify-center items-center rounded-md bg-blue-600 opacity-80 hover:opacity-95 active:border'
            >
              <Image
                src = '/icons/link.svg'
                alt = ''

                width = {50}
                height = {50}

                className = 'h-7 w-7 aspect-auto'
              />
              <span className = 'h-fit text-normal font-medium'>Financial Planner</span>
            </Link>
          </AnimateOnViewDiv>
        </div>
      </AnimateOnViewDiv>
    </footer>
  )
}

export default Footer