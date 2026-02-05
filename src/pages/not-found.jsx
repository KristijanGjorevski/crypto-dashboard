import React from 'react'
import { Link } from 'react-router'

const NotFoundPage = () => {
    return (
        <div className='text-center bg-white-200 py-[80px] px-[20px] text-white'>
            <h1 className='text-7xl mb-[20px]'>404! Page not found!</h1>
            <p className="text-lg mb-[30px]">Oops. The page you're looking for doesn't exist.</p>
            <Link to='/' className='link no-underline text-sky-600'>Go back Home</Link>
        </div>
    )
}

export default NotFoundPage