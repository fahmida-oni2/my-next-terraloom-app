import KitSearching from '@/components/KitSearching/KitSearching';
import React from 'react'
export default async function page() {
  const data = await fetch('http://localhost:5000/all-kits')
  const kits = await data.json()
   return (
         <div className='flex flex-col min-h-screen'>
            <div className='pt-10'>
                    <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeInDown text-center">All Kits</h1>
                     <p className="text-gray-600 text-center mb-12 animate__animated animate__fadeInUp">Explore All Kits.  </p>
         </div>
      
           <div  className='mb-5'>
                    <KitSearching initialKits={kits}></KitSearching>
                </div>
  
        </div>

    );
}
