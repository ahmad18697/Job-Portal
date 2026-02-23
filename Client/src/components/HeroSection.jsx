import React, { useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

function HeroSection() {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-32">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-200/40 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8"
                >
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className='text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text'>
                        Empowering the next generation of engineers
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6'
                >
                    Find your absolute <br />
                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600'>Dream Role</span> today.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10'
                >
                    Discover thousands of remote and local opportunities from top tech companies.
                    Your next big career move starts exactly here.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className='flex max-w-2xl bg-white/80 backdrop-blur-md shadow-2xl border border-gray-100 rounded-full items-center p-2 mx-auto ring-1 ring-black/5'
                >
                    <div className="flex-1 px-4 text-left">
                        <input
                            type="text"
                            placeholder='Search by job title, skill, or keyword...'
                            className='w-full outline-none border-none bg-transparent text-gray-800 placeholder-gray-400 font-medium'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                        />
                    </div>
                    <Button
                        onClick={searchJobHandler}
                        className='rounded-full h-12 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md transition-all duration-300 transform hover:scale-105'
                    >
                        <Search className='h-5 w-5 mr-2' />
                        Search Jobs
                    </Button>
                </motion.div>

                {/* Trusted By Section (Optional static visual flair) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-20 pt-10 border-t border-gray-200/60"
                >
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Trusted by pioneering startups</p>
                    <div className="flex justify-center gap-8 md:gap-16 opacity-50 grayscale">
                        {/* Placeholder generic shapes for "logos" */}
                        <div className="h-8 w-24 bg-gray-300 rounded-md"></div>
                        <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
                        <div className="h-8 w-24 bg-gray-300 rounded-md hidden sm:block"></div>
                        <div className="h-8 w-28 bg-gray-300 rounded-md hidden md:block"></div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    )
}

export default HeroSection