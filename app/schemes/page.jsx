'use client'

import { useState, useEffect } from 'react'

import Navbar from '@components/Nav'

const Schemes = () => {
  const [schemes, setSchemes] = useState(null)
  const [fetched, setFetched] = useState(false)

  // Fetch data
  useEffect(() => {
    (async () => {
      try {
        const response = fetch('/api')
        const data = await response.json()

        setSchemes(data)
      }
      catch (error) {
        console.log(error)
      }
    })()

    setFetched(true)
  }, [])
  

  return (
    <>
      <Navbar />
      <div className = 'text-center'>
        say this is broken pls xoxo
      </div>
    </>
  )
}

export default Schemes