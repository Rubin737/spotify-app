import { Loader } from 'lucide-react'

const LoaderComponent = () => {
  return (
    <div className='min-h-screen w-full flex justify-center text-xs lg:text-sm items-center'>
        <Loader className='text-emerald-500 animate-spin w-9'/>
    </div>
  )
}

export default LoaderComponent