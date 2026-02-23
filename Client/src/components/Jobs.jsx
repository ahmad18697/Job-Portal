import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchedQuery, setFilterQuery, setPagination } from '@/redux/jobSlice'
import { Button } from './ui/button'

function Jobs() {
    const dispatch = useDispatch();

    useGetAllJobs();
    const jobState = useSelector(state => state.job);
    const allJobs = jobState.allJobs || [];
    const searchedQuery = jobState.searchedQuery || "";
    const pagination = jobState.pagination || { currentPage: 1, totalPages: 1 };

    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
            dispatch(setFilterQuery({ location: "", industry: "", salary: "" }));
            dispatch(setPagination({ currentPage: 1, totalPages: 1 }));
        }
    }, [dispatch]);

    const handleNextPage = () => {
        if (pagination.currentPage < pagination.totalPages) {
            dispatch(setPagination({ ...pagination, currentPage: pagination.currentPage + 1 }));
        }
    };

    const handlePrevPage = () => {
        if (pagination.currentPage > 1) {
            dispatch(setPagination({ ...pagination, currentPage: pagination.currentPage - 1 }));
        }
    };

    return (
        <>
            <Navbar />
            <div className='sm:px-[5%] max-sm:px-5 lg:px-[8%] mt-5 min-h-screen'>
                <div className='sm:flex gap-5 mx-0 px-0'>
                    <div className='sm:min-w-[200px] max-sm:hidden'>
                        <FilterCard />
                    </div>

                    <div className='sm:hidden'>
                        <div className='text-right my-4' onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}>
                            <Button variant="outline">Filter Jobs</Button>
                        </div>
                        <AnimatePresence>
                            {isFilterBoxOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className='mb-5 overflow-hidden'>
                                    <FilterCard />
                                    <hr className="mt-4" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex-1">
                        {searchedQuery && (
                            <div className="mb-4">
                                <span className="font-semibold text-gray-700">Search results for: "{searchedQuery}"</span>
                            </div>
                        )}

                        {allJobs.length <= 0 ? (
                            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                                <img src="/empty-state.svg" alt="No jobs found" className="w-48 h-48 opacity-50 mb-4" onError={(e) => e.target.style.display = 'none'} />
                                <h2 className="text-2xl font-bold text-gray-700">No Jobs Found</h2>
                                <p className="text-gray-500 mt-2">Try adjusting your filters or search keywords.</p>
                                <Button className="mt-4" onClick={() => {
                                    dispatch(setSearchedQuery(""));
                                    dispatch(setFilterQuery({ location: "", industry: "", salary: "" }));
                                }}>Clear All Filters</Button>
                            </div>
                        ) : (
                            <div className='pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:m-4'>
                                    {allJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            transition={{ duration: 0.3 }}
                                            key={job._id}>
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                {pagination.totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-4 mt-8">
                                        <Button variant="outline" disabled={pagination.currentPage === 1} onClick={handlePrevPage}>
                                            Previous
                                        </Button>
                                        <span className="font-medium text-gray-600">
                                            Page {pagination.currentPage} of {pagination.totalPages}
                                        </span>
                                        <Button variant="outline" disabled={pagination.currentPage === pagination.totalPages} onClick={handleNextPage}>
                                            Next
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Jobs