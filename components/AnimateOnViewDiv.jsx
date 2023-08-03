'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const AnimateOnViewDiv = ({
  setRefHook,
  variants: parsedVariants,
  initial: parsedInitial,
  animate: paresedAnimate,
  children,
  ...props
}) => {
  const control = useAnimation()

  const ref = useRef()
  const [inView, setInView] = useState(false)

  const variants = parsedVariants || {
    visible: { opacity: 1 },
    hidden:  { opacity: 0 }
  }

  if ((typeof parsedInitial) === 'object') {
    variants.hidden = parsedInitial
  }
  if ((typeof paresedAnimate) === 'object') {
    variants.visible = paresedAnimate
  }

  // Manage Animate
  useEffect(() => {
    if (inView) control.start('visible')
    else control.start('hidden')
  }, [control, inView])

  // Manage Intersection
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
      if (setRefHook) setRefHook(entry.isIntersecting)
    }, []
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  })

  return (
    <motion.div
      {...props}
      ref = {ref}
      initial = 'hidden'
      animate = {control}
      variants = {variants}
    >
      {children}
    </motion.div>
  )
}

export default AnimateOnViewDiv