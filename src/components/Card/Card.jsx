import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default function Card({kit}) {
        const {image_url,title,description,price,category,_id,stock_status}= kit || {}
        const stockClass = stock_status === 'In Stock' 
    ? 'text-green-600 border-green-200' 
    : stock_status === 'Low Stock' 
    ? 'text-yellow-600 border-yellow-200'
    : 'text-red-600 border-red-200';
  return (
     <div className="card bg-base-100 border-gray-300 shadow-xl  hover:scale-105 transition ease-in-out m-5 ">
  <figure className='h-48 overflow-hidden'>
<Image
          src={image_url} 
          alt="image"
          width={350}
          height={60}
          style={{ objectFit: 'cover' }} 
          className='p-2' 
        />
  </figure>
  <div className="card-body space-y-3">
    <h2 className="text-2xl font-bold text-center">{title}</h2>
        <h2 className="text-center">Category:{category}</h2>
        <p className="text-center">{description}</p>

   <div className='flex justify-between'>
    <button className={`flex h-10 w-30 btn btn-outline gap-2 ${stockClass} bg-base-300`}>
      {stock_status}
    </button>
    <button  className='flex h-10 w-30 btn btn-outline gap-2 border-gray-200 text-orange-500 bg-base-300'>
        {price} TK
    </button>
   </div>
   <Link href= {`/all-kits/${_id}`}   className='flex h-10 w-full btn btn-outline gap-2 border-gray-200 text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2]'>
        View Details
    </Link>
  </div>
</div>
  )
}
