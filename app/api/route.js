import { Schema } from '@utils/handler'

export const GET = async(request) => {
  try {
    const data = await Schema.getAll(true)

    return new Response(JSON.stringify(data), {
      status: 200
    })
  }
  catch (error) {
    console.log(error)
    return new Response('Server encountered an error while fetching!', {
      status: 500
    })
  }
}