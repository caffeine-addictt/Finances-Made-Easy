import Image from 'next/image'

const Loading = ({ containerClassName, imageClassName }) => {
  return (
    <div
      className = {
        containerClassName
        ||
        'flex h-full w-full justify-center'
      }
    >
      <Image
        src = '/icons/loading.svg'
        alt = ''

        width = {50}
        height = {50}

        loading = 'eager'
        className = {
          ( imageClassName || '' )
          + ' animate-spin -rotate-180'
        }
      />
    </div>
  )
}

export default Loading