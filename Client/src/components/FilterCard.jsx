import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterQuery, setPagination } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "location",
        title: "Location",
        array: ["Delhi NCR", "Bengluru", "Mumbai", "Hyderabad", "Ranchi", "Patna"]
    },
    {
        filterType: "industry",
        title: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Machine Learning"]
    },
    {
        filterType: "salary",
        title: "Salary",
        array: ["6-10 LPA", "10-40 LPA", "40-100 LPA", "100+"]
    }
]


const FilterCard = () => {
    const dispatch = useDispatch();
    const jobState = useSelector(store => store.job);
    const filterQuery = jobState.filterQuery || {};

    const changeHandler = (filterType, value) => {
        dispatch(setFilterQuery({ [filterType]: value }));
        dispatch(setPagination({ currentPage: 1, totalPages: 1 })); // Reset pagination on new filter
    }

    return (
        <div className='w-full bg-white py-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />

            <div className="flex flex-col gap-5 mt-4">
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg mb-2'>{data.title}</h1>
                            <RadioGroup value={filterQuery[data.filterType]} onValueChange={(val) => changeHandler(data.filterType, val)}>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `r-${data.filterType}-${idx}`
                                        return (
                                            <div className='flex items-center space-x-2 gap-1 my-2' key={idx}>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label className="text-base cursor-pointer" htmlFor={itemId}>{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </div>
                    ))
                }
            </div>

            <button onClick={() => {
                dispatch(setFilterQuery({ location: "", industry: "", salary: "" }));
                dispatch(setPagination({ currentPage: 1, totalPages: 1 }));
            }} className="mt-6 text-sm text-red-500 hover:text-red-700 font-medium">
                Clear Filters
            </button>

        </div>
    )
}

export default FilterCard
