'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

import { AnimateOnViewDiv, reveal, popReveal } from '@components/AnimateOnViewDiv'

const Home = () => {
  const topRef = useRef(null)
  const secondRef = useRef(null)

  const [onCover, setOnCover] = useState(true)
  const [coverLoaded, setCoverLoaded] = useState(false)

  return (
    <div className = 'h-fit w-full'>

      {/* First Page */}
      <section ref = {topRef} className = 'h-full w-full'>
        <motion.div
          initial    = {{ opacity: 0 }}
          animate    = {{ opacity: (coverLoaded ? 1 : 0) }}
          exit       = {{ opacity: 0 }}
          className  = 'w-full h-full justify-center overflow-hidden'
        >
          {/* Center text */}
          <motion.div
            initial    = {{ backdropFilter: '0px' }}
            animate    = {{ backdropFilter: '1px' }}
            exit       = {{ backdropFilter: '0px' }}
            transition = {{ delay: 0.5 }}
            className  = 'flex flex-col gap-10 p-2 w-fit h-fit absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20'
          >
            <AnimateOnViewDiv
              initial    = {{ opacity: 0, scale: 0.8 }}
              animate    = {{ opacity: 1, scale: 1.0 }}
              exit       = {{ opacity: 0, scale: 0.8 }}
              transition = {{ scale: { type: 'spring', stiffness: 100 }, delay: 0.25 }}
            >
              <h1 className = 'text-4xl text-center font-bold noselect'>
                Take Control of Your Life
              </h1>
            </AnimateOnViewDiv>
            

            {/* Links */}
            <AnimateOnViewDiv
              initial    = {{ opacity: 0, scale: 0.8 }}
              animate    = {{ opacity: 1.00, scale: 1.0 }}
              exit       = {{ opacity: 0, scale: 0.8 }}
              transition = {{ scale: { type: 'spring', stiffness: 100 }, delay: 0.5 }}
              className  = 'w-fit h-full mx-auto'
            >
              <Link
                href = '/schemes'
                className = 'w-fit p-2 px-4 bg-white bg-opacity-30 dark:bg-opacity-10 rounded-md border hover:bg-opacity-40 dark:hover:bg-opacity-20 active:border-2'
              >
                Browse Financial Schemes
              </Link>
            </AnimateOnViewDiv>
          </motion.div>


          {/* Down Arrow */}
          <AnimateOnViewDiv
            setRefHook = {setOnCover}
            {...reveal}
            transition = {{ delay: 0.5, duration: 5 }}
            className  = 'flex flex-row w-24 h-max absolute bottom-[2rem] left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 cursor-pointer transition-all'

            onClick = {e => {
              e.preventDefault()
              secondRef.current.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <div className = 'w-[50%] rounded -mr-[6px] rotate-[30deg] border-[3.5px] border-gray-300' />
            <div className = 'w-[50%] rounded -ml-[6px] -rotate-[30deg] border-[3.5px] border-gray-300' />
          </AnimateOnViewDiv>
          


          {/* Background Pic */}
          <Image
            src = '/images/coverpic.jpg'
            alt = ''

            width = {9000}
            height = {6000}

            priority
            loading = 'eager'
            onLoad = {() => setCoverLoaded(true)}

            className = 'min-w-full min-h-full aspect-video opacity-90 dark:opacity-70 bg-black noselect'
          />
        </motion.div>
      </section>





      {/* Second Page */}
      <section ref = {secondRef} className = 'h-fit w-full'>
        {/* First Container */}
        <div className = 'flex top-0 w-full h-fit items-end justify-center pt-10'>
          <AnimateOnViewDiv
            initial    = {{ 'marginLeft': '-40%' }}
            animate    = {{ 'marginLeft': '5%' }}
            exit       = {{ 'marginLeft': '-40%' }}
            transition = {{ marginLeft: { type: 'spring', stiffness: 50 }, duration: 0.1 }}
            className  = 'w-[40%] aspect-video rounded-lg overflow-hidden'
          >
            <Image
              src = '/images/family_photo.jpg'
              alt = ''

              width = {500}
              height = {400}

              priority
              className = 'w-full h-full'
            />
          </AnimateOnViewDiv>

          {/* Text */}
          <AnimateOnViewDiv
            {...reveal}
            transition = {{ delay: 0.25 }}
            className  = 'flex flex-col justify-between w-[45%] h-fit py-2 self-center mr-[5%] ml-auto'
          >
            {/* Header */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0 }}
            >
              <h1 className = 'text-3xl font-bold'>
                Looking for financial schemes?
              </h1>
            </AnimateOnViewDiv>

            {/* Description */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0.25 }}
              className  = 'my-10 text-base'
            >
              <p>Check out SupportGoWhere!</p>
              <p>A Singapore Government Website for Finding Support Schemes!</p>
              <br />
              <p>Schemes include but are not limited to:</p>
              <p className = 'text-sm font-light'>Financial Support, Seniors, ...</p>
            </AnimateOnViewDiv>

            {/* Hyperlink */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0.5 }}
              className  = 'h-fit w-fit'
            >
              <Link
                href = 'https://supportgowhere.life.gov.sg'
                target = '_blank'
                className = 'flex flex-row gap-2 py-1 px-2 w-fit h-10 justify-center items-center rounded-md bg-blue-600 opacity-80 hover:opacity-95 active:border'
              >
                <Image
                  src = '/icons/link.svg'
                  alt = ''

                  width = {50}
                  height = {50}

                  className = 'h-7 w-7 aspect-auto'
                />
                <span className = 'h-fit text-normal font-medium'>Learn More</span>
                
              </Link>
            </AnimateOnViewDiv>
          </AnimateOnViewDiv>
        </div>


        {/* Second Container */}
        <div className = 'flex top-1/2 w-full h-fit pt-10'>
          
          {/* Text */}
          <AnimateOnViewDiv
            {...reveal}
            transition = {{ delay: 0.25 }}
            className  = 'flex flex-col justify-between w-[45%] h-fit py-2 ml-[5%] mr-auto'
          >
            {/* Header */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0 }}
              className  = 'ml-auto mr-0'
            >
              <h1 className = 'text-3xl font-bold '>
                Planning your finances?
              </h1>
            </AnimateOnViewDiv>

            {/* Description */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ duration: 0.5, delay: 0.25 }}
              className  = 'my-10 text-base ml-auto mr-0 text-right'
            >
              <p>Check out our financial planner!</p>
              <p>Able to calculate your savings insantly, helping you plan better!</p>
              <br />
              <p>Accounts for:</p>
              <p className = 'text-sm font-light'>Expenses, Income, ...</p>
            </AnimateOnViewDiv>

            {/* Hyperlink */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ duration: 0.5, delay: 0.5 }}
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
                <span className = 'h-fit text-normal font-medium'>Learn More</span>
              </Link>
            </AnimateOnViewDiv>
          </AnimateOnViewDiv>


          <AnimateOnViewDiv
            initial    = {{ 'marginRight': '-40%' }}
            animate    = {{ 'marginRight': '5%' }}
            exit       = {{ 'marginRight': '-40%' }}
            transition = {{ marginRight: { type: 'spring', stiffness: 50 }, duration: 0.1 }}
            className  = 'w-[40%] aspect-video rounded-lg overflow-hidden ml-auto'
          >
            <Image
              src = '/images/planning.jpg'
              alt = ''

              width = {500}
              height = {400}

              priority
              className = 'w-full h-full'
            />
          </AnimateOnViewDiv>
        </div>


        {/* Third Container */}
        <div className = 'flex top-0 w-full h-fit items-end justify-center pt-10'>
          <AnimateOnViewDiv
            initial    = {{ 'marginLeft': '-40%' }}
            animate    = {{ 'marginLeft': '5%' }}
            exit       = {{ 'marginLeft': '-40%' }}
            transition = {{ marginLeft: { type: 'spring', stiffness: 50 }, duration: 0.1 }}
            className  = 'w-[40%] aspect-video rounded-lg overflow-hidden'
          >
            <Image
              src = '/images/managing_finances.jpg'
              alt = ''

              width = {500}
              height = {400}

              priority
              className = 'w-full h-full'
            />
          </AnimateOnViewDiv>

          {/* Text */}
          <AnimateOnViewDiv
            {...reveal}
            transition = {{ delay: 0.25 }}
            className  = 'flex flex-col justify-between w-[45%] h-fit py-2 self-center mr-[5%] ml-auto'
          >
            {/* Header */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0 }}
            >
              <h1 className = 'text-3xl font-bold'>
                Don't know how to save?
              </h1>
            </AnimateOnViewDiv>

            {/* Description */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0.25 }}
              className  = 'my-10 text-base'
            >
              <p>Check out MoneySense!</p>
              <p>A Singapore Government Website for Learning to Save Money!</p>
              <br />
              <p>It will teach you to:</p>
              <p className = 'text-sm font-light'>Save regularly, Create a budget, Plan ahead, ...</p>
            </AnimateOnViewDiv>

            {/* Hyperlink */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0.5 }}
              className  = 'h-fit w-fit'
            >
              <Link
                href = 'https://www.moneysense.gov.sg/articles/2018/10/money-habits-to-adopt-when-youre-starting-work'
                target = '_blank'
                className = 'flex flex-row gap-2 py-1 px-2 w-fit h-10 justify-center items-center rounded-md bg-blue-600 opacity-80 hover:opacity-95 active:border'
              >
                <Image
                  src = '/icons/link.svg'
                  alt = ''

                  width = {50}
                  height = {50}

                  className = 'h-7 w-7 aspect-auto'
                />
                <span className = 'h-fit text-normal font-medium'>Learn More</span>
                
              </Link>
            </AnimateOnViewDiv>
          </AnimateOnViewDiv>
        </div>
      </section>





      





      {/* To Top Button */}
      <motion.div
        initial   = {{ opacity: 0, translateY: '150%' }}
        animate   = {{ opacity: 1, translateY: (onCover ? '150%' : '0%') }}
        exit      = {{ opacity: 0, translateY: '150%' }}
        className = 'flex fixed bottom-0 right-0 m-4 w-14 h-14 z-30 bg-white bg-opacity-60 rounded-full border-white border-2 cursor-pointer items-center justify-center hover:bg-opacity-80 active:border-4 transition-all duration-500'

        onClick = {e => {
          e.stopPropagation()
          topRef.current.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <Image
          src = '/icons/up_arrow.svg'
          alt = ''

          width = {50}
          height = {50}
          className = 'w-[60%] h-[60%] mx-auto'
        />
      </motion.div>
    </div>
  )
}

export default Home