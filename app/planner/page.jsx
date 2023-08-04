'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useEffect, useState } from 'react'

import Nav from '@components/Nav'
import { AnimateOnViewDiv, popReveal, reveal } from '@components/AnimateOnViewDiv'

const Planner = () => {
  const [income, setIncome] = useState({})
  const [expenses, setExpenses] = useState({})

  const [showAddNewIncome, setShowAddNewIncome] = useState(false)
  const [showAddNewExpense, setShowAddNewExpense] = useState(false)

  const [totalInccome, setTotalInccome] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)

  const [newIncome, setNewIncome] = useState({name: '', value: ''})
  const [newExpense, setNewExpense] = useState({name: '', value: ''})


  const resetAll = (showResetMsg) => {
    setIncome({
      'Salary': ''
    })
    setExpenses({
      'Rent'          : '',
      'Food'          : '',
      'Transportation': '',
      'Phone Plan'    : '',
      'Utility Bill'  : '',
    })

    if (showResetMsg) {
      // Show Reset Message
    }
  }

  const calculate = (obj, joiner) => {
    let total = 0
    Object.entries(obj).forEach(key => {
      total += parseFloat(key[1] || '0')
    })

    return total
  }

  // Setup
  useEffect(resetAll, [])
  useEffect(() => {
    setTotalInccome( calculate(income,   ' + '))
    setTotalExpenses(calculate(expenses, ' + '))
  }, [income, expenses])

  return (
    <>
      <Nav />
      <div className = 'flex flex-col gap-3 h-fit w-full'>

        {/* Header */}
        <AnimateOnViewDiv
          {...reveal}
          className = 'flex flex-col w-fit h-fit mx-auto items-center'
        >
          <h1 className = 'text-4xl font-bold mb-2'>Financial Planner</h1>
          <div className = 'bg-white bg-opacity-25 w-[120%] h-2 rounded' />
        </AnimateOnViewDiv>


        {/* Display Total */}
        <AnimateOnViewDiv
          {...reveal}
          transition = {{ delay: 0.1 }}
          className  = 'flex flex-col gap-1 text-center text-base font-medium mx-auto mb-2'
        >
          <AnimateOnViewDiv {...reveal}><p>Total Income - Total Expenses = Total Savings</p></AnimateOnViewDiv>
          <AnimateOnViewDiv
            {...reveal}
            transition = {{ delay: 0.1 }}
          >
            <p>
              ${totalInccome} - ${totalExpenses} =&nbsp;
              <span
                className = {'font-semibold text-lg ' + (((totalInccome - totalExpenses) <= 0) ? 'text-red-700' : 'text-green-500')}
              >
                {(() => {
                  const savingsTotal = Math.floor((totalInccome - totalExpenses)*100 + 0.5) / 100
                  if (savingsTotal < 0) return '-$' + String(savingsTotal).slice(1)
                  else return '$' + String(savingsTotal)
                })()}
              </span>
            </p>
          </AnimateOnViewDiv>
        </AnimateOnViewDiv>


        {/* Reset Button */}
        <AnimateOnViewDiv
          {...popReveal}
          transition = {{ type: 'spring', stiffness: 100, delay: 0.2}}
          className  = 'w-fit h-fit mx-auto'
        >
          <button
            type = 'button'
            onClick = {() => resetAll(true)}
            className = 'w-fit h-fit px-5 py-2 mb-10 bg-red-600 bg-opacity-70 rounded-md shadow-md hover:bg-opacity-75 active:border'
          >
            Reset
          </button>
        </AnimateOnViewDiv>
        

        {/* Planning */}
        <div className = 'flex flex-wrap justify-center'>

          {/* Income */}
          <AnimateOnViewDiv
            {...reveal}
            className  = 'flex flex-col gap-2 items-end w-[90%] h-full pr-[5%] border-r sm:w-[45%]'
          >
            {/* Header */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0.3 }}
              className  = 'flex flex-col items-center w-fit mb-3 mr-[5%] text-3xl font-bold'
            >
              <h1>Income</h1>
              <div className = 'bg-white bg-opacity-25 w-[120%] h-1 rounded' />
            </AnimateOnViewDiv>


            {/* Income */}
            {Object.entries(income).map(([name, value], i) => {
              return (
                <AnimateOnViewDiv
                  {...popReveal}
                  transition = {{ type: 'spring', stiffness: 100, delay: 0.4 + 0.1*i }}
                  className  = 'flex flex-row gap-2 w-fit h-fit justify-end'
                >
                  {/* Name */}
                  <div className = 'text-lg font-semibold'>
                    {name}: <span className = 'text-base font-normal'>$</span>
                  </div>

                  {/* Value */}
                  <input
                    type = 'text'
                    value = {value}
                    placeholder = '0'

                    onChange = {e => {
                      let toSet = e.target.value || ''
                      const regex = /^[+-]?([0-9]*[.])?[0-9]+/ // Test for positive/negative number or float

                      if (!regex.test(toSet)) {
                        toSet = ''
                      }

                      setIncome({ ...income, [name]: toSet })
                    }}
                    className = 'block w-[30%] h-7 bg-zinc-900 text-center bg-clip-padding bg-opacity-30 dark:bg-zinc-800 dark:bg-opacity-100 rounded-md px-2'
                  />

                  {/* Delete Button */}
                  <button
                    type = 'button'
                    className = 'flex self-center justify-center w-7 h-7 bg-zinc-900 bg-opacity-30 dark:bg-zinc-800 dark:bg-opacity-100 hover:bg-opacity-75 transition-all active:border rounded-md'
                    onClick = {e => setIncome(
                      Object.keys(income)
                        .filter(key => key !== name)
                        .reduce((cur, key) => Object.assign(cur, {[key]: income[key]}), {})
                    )}
                  >
                    <Image
                      src = '/icons/trash.svg'
                      alt = ''

                      width = {50}
                      height = {50}

                      className = 'w-full h-full self-center'
                    />
                  </button>
                </AnimateOnViewDiv>
              )
            })}


            {/* Add New */}
            <AnimateOnViewDiv
              {...popReveal}
              transition = {{ type: 'spring', stiffness: 100, delay: 0.4 + 0.1*Object.keys(income).length }}
              className  = 'flex flex-row gap-2 pt-10 w-fit h-fit justify-end'
            >
              {/* Name */}
              <input
                type = 'text'
                value = {newIncome.name}
                placeholder = 'Title'

                onChange = {e => setNewIncome({ ...newIncome, name: e.target.value })}
                className = 'block w-[60%] h-7 bg-zinc-900 text-center bg-clip-padding bg-opacity-30 dark:bg-zinc-800 dark:bg-opacity-100 rounded-md px-2'
              />

              {/* Add Button */}
              <button
                type = 'button'
                className = 'flex self-center justify-center w-7 h-7 bg-zinc-900 bg-opacity-30 dark:bg-zinc-800 dark:bg-opacity-100 hover:bg-opacity-75 transition-all active:border rounded-md'
                onClick = {e => {
                  if (newIncome.name) {
                    setIncome({ ...income, [newIncome.name]: newIncome.value })
                    setNewIncome({ name: '', value: '' })
                  }
                }}
              >
                <Image
                  src = '/icons/plus.svg'
                  alt = ''

                  width = {50}
                  height = {50}

                  className = 'w-full h-full self-center'
                />
              </button>
            </AnimateOnViewDiv>



            {/* Total */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0.4 }}
              className  = 'mt-10 p-1 px-3 border rounded-md'
            >
              Total: ${totalInccome}
            </AnimateOnViewDiv>
          </AnimateOnViewDiv>


          {/* Expenses */}
          <AnimateOnViewDiv
            className  = 'flex flex-col gap-2 items-start w-[90%] h-fit pl-[5%] border-l sm:w-[45%]'
          >
            {/* Header */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0.3 }}
              className  = 'flex flex-col items-center w-fit mb-3 mr-[5%] text-3xl font-bold'
            >
              <h1>Expenses</h1>
              <div className = 'bg-white bg-opacity-25 w-[120%] h-1 rounded' />
            </AnimateOnViewDiv>
            

            {/* Expenses */}
            {Object.entries(expenses).map(([name, value], i) => {
              return (
                <AnimateOnViewDiv
                  {...popReveal}
                  transition = {{ type: 'spring', stiffness: 100, delay: 0.4 + 0.1*i }}
                  className  = 'flex flex-row gap-2 w-fit h-fit justify-start'
                >
                  {/* Name */}
                  <div className = 'text-lg font-semibold'>
                    {name}: <span className = 'text-base font-normal'>$</span>
                  </div>

                  {/* Value */}
                  <input
                    type = 'text'
                    value = {value}
                    placeholder = '0'

                    onChange = {e => {
                      let toSet = e.target.value || ''
                      const regex = /^[+-]?([0-9]*[.])?[0-9]+/ // Test for positive/negative number or float

                      if (!regex.test(toSet)) {
                        toSet = ''
                      }

                      setExpenses({ ...expenses, [name]: toSet })
                    }}
                    className = 'block w-[30%] h-7 bg-zinc-900 text-center bg-clip-padding bg-opacity-30 dark:bg-zinc-800 dark:bg-opacity-100 rounded-md px-2'
                  />

                  {/* Delete Button */}
                  <button
                    type = 'button'
                    className = 'flex self-center justify-center w-7 h-7 bg-zinc-900 bg-opacity-30 dark:bg-zinc-800 dark:bg-opacity-100 hover:bg-opacity-75 transition-all active:border rounded-md'
                    onClick = {e => setExpenses(
                      Object.keys(expenses)
                        .filter(key => key !== name)
                        .reduce((cur, key) => Object.assign(cur, {[key]: expenses[key]}), {})
                    )}
                  >
                    <Image
                      src = '/icons/trash.svg'
                      alt = ''

                      width = {50}
                      height = {50}

                      className = 'w-full h-full self-center'
                    />
                  </button>
                </AnimateOnViewDiv>
              )
            })}


            {/* Add New */}
            <AnimateOnViewDiv
              {...popReveal}
              transition = {{ type: 'spring', stiffness: 100, delay: 0.4 + 0.1*Object.keys(expenses).length }}
              className  = 'flex flex-row gap-2 pt-10 w-fit h-fit justify-start'
            >
              {/* Name */}
              <input
                type = 'text'
                value = {newExpense.name}
                placeholder = 'Title'

                onChange = {e => setNewExpense({ ...newExpense, name: e.target.value })}
                className = 'block w-[60%] h-7 bg-zinc-900 text-center bg-clip-padding bg-opacity-30 dark:bg-zinc-800 dark:bg-opacity-100 rounded-md px-2'
              />

              {/* Add Button */}
              <button
                type = 'button'
                className = 'flex self-center justify-center w-7 h-7 bg-zinc-900 bg-opacity-30 dark:bg-zinc-800 dark:bg-opacity-100 hover:bg-opacity-75 transition-all active:border rounded-md'
                onClick = {e => {
                  if (newExpense.name) {
                    setExpenses({ ...expenses, [newExpense.name]: newExpense.value })
                    setNewExpense({ name: '', value: '' })
                  }
                }}
              >
                <Image
                  src = '/icons/plus.svg'
                  alt = ''

                  width = {50}
                  height = {50}

                  className = 'w-full h-full self-center'
                />
              </button>
            </AnimateOnViewDiv>


            {/* Total */}
            <AnimateOnViewDiv
              {...reveal}
              transition = {{ delay: 0.4 }}
              className  = 'mt-4 p-1 px-3 border rounded-md'
            >
              Total: ${totalExpenses}
            </AnimateOnViewDiv>
          </AnimateOnViewDiv>
        </div>

      </div>
    </>
  )
}

export default Planner