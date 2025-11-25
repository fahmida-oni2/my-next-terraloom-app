'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/Card/Card'; 
import "animate.css"; 
import Loading from '../Loading/Loading';
import ErrorKit from '../ErrorKit/ErrorKit';
const KitSearching = ({ initialKits }) => {
    const [search, setSearch] = useState('');
    const [filteredKits, setFilteredKits] = useState(() => initialKits || []);
    const [loading, setLoading] = useState(false); 
    
    useEffect(() => {
        setFilteredKits(initialKits || []);
    }, [initialKits]);

    useEffect(() => {
       if (filteredKits.length === 0) return;
        setLoading(true);

        const timer = setTimeout(() => {
            const baseData = initialKits; 

            const results = search.trim()
                ? baseData.filter(kit =>
                    kit.title.toLowerCase().includes(search.toLowerCase()) 
                  )
                : baseData;

            setFilteredKits(results);
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [initialKits, search]);

    const showNoResult = filteredKits.length === 0 && search.trim().length > 0;

    return (
        <>
    <div>
                <div className='lg:flex justify-between items-center mt-5 pl-5 pr-5 mb-5 '>
                <div className='font-bold text-2xl pb-5 lg:pb-0'> 
                    ({filteredKits.length}) Kits Found
                </div>
                <label className="input gap-0">
                    <span className="label"></span>
                    <input 
                        value={search} 
                        onChange={e => setSearch(e.target.value)} 
                        type="search" 
                        placeholder="Search kit title..." 
                    />
                </label>
            </div>

 <div>
 {loading ? (
                <div className='flex justify-center items-center p-20'>
                    <Loading />
                </div>
            ) : showNoResult ? (
                <div >
                    <ErrorKit searchTerm={search} />
                </div>
            ) : (
                <div className='grid grid-cols-1  lg:grid-cols-4 gap-4'>
                    {filteredKits.map(kit => (
                        <Card key={kit._id} kit={kit} />
                    ))}
                </div>
            )}
 </div>
           
    </div>
        </>
    );
};

export default KitSearching;