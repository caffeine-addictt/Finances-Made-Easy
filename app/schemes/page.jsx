'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'

import Loading from '@components/Loading'
import Navbar from '@components/Nav'
import { AnimateOnViewDiv, reveal, popReveal } from '@components/AnimateOnViewDiv'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const Schemes = () => {
  const [schemes, setSchemes] = useState(null)                                   // Private Cache
  const [filtered, setFiltered] = useState(null)                                 // To Display

  const [isFiltering, setIsfiltering] = useState(false)                          // Track filtering status
  const [filterSignal, setFilterSignal] = useState(new AbortController())        // Kill previous filter execution
  const [filteringTimeout, setFilteringTimeout] = useState(null)                 // Save timeout to, to clear previous filter and start new filtering
  
  const [fetched, setFetched] = useState(false)                                  // Tracks if fetched once already

  const [groups, setGroups] = useState([])                                       // Collection of groups from first fetch
  const [Dtypes, setDTypes] = useState([])                                       // Collection of types from first fetch

  const [query, setQuery] = useState('')                                         // Query Text
  const [queryTypes, setQueryTypes] = useState([])                               // Query Types
  const [queryGroups, setQueryGroups] = useState([])                             // Query Groups


  // Search
  const handleSearch = (parsedQuery, parsedTypes, parsedGroups) => {
    filterSignal?.abort()                                                        // Kill previous filter and load process
    clearTimeout(filteringTimeout)
    setIsfiltering(true)

    if (parsedQuery !== false) setQuery(parsedQuery)
    if (parsedTypes !== false) setQueryTypes(parsedTypes)
    if (parsedGroups !== false) setQueryGroups(parsedGroups)

    parsedQuery  = (parsedQuery !== false)  ? parsedQuery  : query
    parsedTypes  = (parsedTypes !== false)  ? parsedTypes  : queryTypes
    parsedGroups = (parsedGroups !== false) ? parsedGroups : queryGroups

    setFilteringTimeout(setTimeout(async() => {                                   // Cache new running filter
      
      // Filter
      const filteredData = schemes.filter(item => {
        return (
          (
            (parsedQuery.toLowerCase() === '')
            ||
            (item.title.toLowerCase().startsWith(parsedQuery.toLowerCase()))
          ) && (
            (parsedTypes.some(qt => item.type === qt))                            // Match query to item type
            ||
            (parsedGroups.some(qg => item.groups.includes(qg)))                   // Match query to item group
            ||
            (parsedTypes.length == 0 && parsedGroups.length == 0)                 // Bypass to show everything if nothing selected
          )
        )
      })
      setIsfiltering(false)
      setFiltered([])


      // Stagger Data
      for (let i = 1; i < filteredData.length + 1; i++) {
        setFiltered(filteredData.slice(0, i))
        await sleep(100)
      }
    }, 0, { signal: filterSignal }))
  }
  

  // Fetch data
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api')
        const data = await response.json()

        setSchemes(data)
        setTimeout(() => setFiltered(data), 300)

        // Load Categories
        let cacheTypes = new Set()
        let cacheGroups = new Set()
        
        data.map(item => {
          try { cacheTypes.add(item.type) } catch {}
          try { cacheGroups.add(...item.groups) } catch {}
        })

        setDTypes(Array.from(cacheTypes).sort())
        setGroups(Array.from(cacheGroups).sort())
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
      <div className = 'flex flex-wrap justify-center mx-auto gap-10 w-[99%] sm:w-[90%] h-fit min-h-[80vh]'>
        
        {/* Search & Filter */}
        <AnimateOnViewDiv
          className  = 'flex flex-col gap-10 w-full sm:w-[35%] h-fit items-center'
        >
          {/* Search Bar */}
          <AnimateOnViewDiv
            {...popReveal}
            transition = {{ scale: { type: 'spring', stiffness: 100} }}
            className  = 'flex flex-row max-sm:self-center w-[90%] sm:w-full'
          >
            <input
              value = {query}
              placeholder = 'Search'

              onChange = {e => handleSearch(e.target.value, false, false)}
              className = 'block w-full rounded-md py-2.5 pl-5 pr-12 text-black dark:text-white bg-zinc-100 dark:bg-zinc-700 outline-offset-1 text-sm font-sans font-medium shadow-lg'
            />

            <button
              type = 'button'
              onClick = {e => {
                e.preventDefault()
                handleSearch(false, false, false)
              }}
              className = 'z-10 ml-[-2.5rem]'
            >
              <picture>
                <source
                  srcSet = '/icons/search_light.svg'
                  media = '(prefers-color-scheme: dark)'
                />
                <Image
                  src = '/icons/search_dark.svg'
                  alt = ''

                  width = {25}
                  height = {25}
                />
              </picture>
            </button>
          </AnimateOnViewDiv>


          {/* Filter options */}
          <AnimateOnViewDiv
            {...reveal}
            transition = {{ delay: 0.1 }}
            className  = 'flex flex-col max-sm:self-center gap-5 w-[90%] sm:w-full'
          >
            {/* Header */}
            <AnimateOnViewDiv {...reveal} >
              <h1 className = 'text-2xl font-bold'>Filtering Options</h1>
              <div className = 'w-full h-1 mt-2 bg-black dark:bg-white bg-opacity-50 dark:bg-opacity-20 rounded-full' />
            </AnimateOnViewDiv>
            

            {/* Type */}
            <div className = 'flex flex-wrap gap-2 w-[80%] h-fit'>
              {/* Header */}
              <AnimateOnViewDiv
                {...reveal}
                transition = {{ delay: 0.2 }}
                className  = 'w-full h-fit text-lg font-semibold'
              >
                Scheme Type
              </AnimateOnViewDiv>

              {/* Render Options */}
              {Dtypes.map((itemName, i) => {
                let isSelected = queryTypes.includes(itemName)
                return (
                  <AnimateOnViewDiv
                    {...popReveal}
                    key = {i}
                    transition = {{ scale: { type: 'spring', stiffnesss: 100 }, delay: 0.3 + 0.1*i }}
                    className  = 'w-fit h-fit text-white'
                  >
                    <button
                      type = 'button'
                      onClick = {e => {
                        e.stopPropagation()

                        const newQuery = isSelected ? queryTypes.filter(x => x !== itemName) : queryTypes.concat(itemName)
                        isSelected = !isSelected
                        handleSearch(false, newQuery, false)
                      }}
                      className = {
                        'rounded-lg px-2 py-1 transition-all delay-75 '
                        + (isSelected ? 'bg-blue-600 hover:bg-blue-500' : 'bg-zinc-600 hover:bg-zinc-500')
                      }
                    >{itemName}</button>
                  </AnimateOnViewDiv>
                )
              })}
            </div>


            {/* Groups */}
            <div className = 'flex flex-wrap gap-2 w-[80%] h-fit'>
              {/* Header */}
              <AnimateOnViewDiv
                {...reveal}
                transition = {{ delay: 0.2 }}
                className  = 'w-full h-fit text-lg font-semibold'
              >
                Group Availability
              </AnimateOnViewDiv>

              {/* Render Options */}
              {groups.map((itemName, i) => {
                let isSelected = queryGroups.includes(itemName)
                return (
                  <AnimateOnViewDiv
                    {...popReveal}
                    key = {i}
                    transition = {{ scale: { type: 'spring', stiffnesss: 100 }, delay: 0.3 + 0.1*i }}
                    className  = 'w-fit h-fit text-white'
                  >
                    <button
                      type = 'button'
                      onClick = {e => {
                        e.stopPropagation()

                        const newQuery = isSelected ? queryGroups.filter(x => x !== itemName) : queryGroups.concat(itemName)
                        isSelected = !isSelected
                        handleSearch(false, false, newQuery)
                      }}
                      className = {
                        'rounded-lg px-2 py-1 transition-all delay-75 '
                        + (isSelected ? 'bg-blue-600 hover:bg-blue-500' : 'bg-zinc-600 hover:bg-zinc-500')
                      }
                    >{itemName}</button>
                  </AnimateOnViewDiv>
                )
              })}
            </div>

          </AnimateOnViewDiv>

        </AnimateOnViewDiv>


        {/* Results */}
        <AnimateOnViewDiv className  = 'flex flex-col gap-5 w-full sm:w-[60%] h-full max-h-[90vh] overflow-y-auto overflow-x-clip' >
          {(
            !fetched || isFiltering
            ||
            (fetched && (!filtered || (filtered.length <= 0)))
          ) ? (
            <div className  = 'mt-10 text-center text-xl font-bold' >
              {(isFiltering || !fetched) ? (
                <Loading
                  containerClassName = 'self-center w-10 h-10 mx-auto overflow-hidden'
                  imageClassName = 'w-full h-full'
                />
              ) : (
                <>{fetched ? 'No Schemes Available!' : 'No Such Scheme!'}</>
              )}
            </div>
          ) : (
            <>
              {filtered.map((item, i) => {
                return (
                  <AnimateOnViewDiv
                    {...popReveal}
                    key = {i}
                    transition = {{ scale: { type: 'spring', stiffness: 100 }, delay: 0.05 }}
                    className  = 'w-fit min-w-[80%] max-w-[90%] h-fit'
                  >
                    <Link
                      href = {item.link}
                      className = 'flex flex-col w-full h-fit gap-4 p-2 px-4 bg-zinc-300 hover:bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-700 delay-75 transition-all rounded-lg dark:border shadow-lg'
                    >
                      <AnimateOnViewDiv {...reveal} className = 'flex flex-col h-fit w-fit' >
                        <h1 className = 'text-xl font-bold font-sans'>{item.title}</h1>
                        <p className = 'text-sm font-light opacity-80'>{item.by}</p>
                      </AnimateOnViewDiv>

                      <AnimateOnViewDiv
                        {...reveal}
                        transition = {{ delay: 0.05 }}
                        className  = 'flex flex-row gap-1 h-fit w-fit font-normal text-base'
                        style = {{ 'text-wrap': 'balance' }}
                      >
                        {item.description}
                      </AnimateOnViewDiv>

                      <AnimateOnViewDiv
                        {...reveal}
                        transition = {{ delay: 0.1 }}
                        className  = 'flex flex-row gap-1 h-fit w-fit text-blue-400 font-light text-sm'
                      >
                        <p>#{item.type}</p>
                        {item.groups.map((grpName, i) => {
                          return <p key = {i}>#{grpName}</p>
                        })}
                      </AnimateOnViewDiv>
                    </Link>
                  </AnimateOnViewDiv>
                )
              })}
            </>
          )}
        </AnimateOnViewDiv>
      </div>
    </>
  )
}

export default Schemes