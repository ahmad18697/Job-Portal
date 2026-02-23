import { setAllJobs, setPagination } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const jobState = useSelector(store => store.job);
    const searchedQuery = jobState.searchedQuery || "";
    const filterQuery = jobState.filterQuery || { location: "", industry: "", salary: "" };
    const pagination = jobState.pagination || { currentPage: 1, totalPages: 1 };

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                // Construct URL with query params
                const params = new URLSearchParams();
                if (searchedQuery) params.append("keyword", searchedQuery);
                if (filterQuery.location) params.append("location", filterQuery.location);
                if (filterQuery.industry) params.append("industry", filterQuery.industry);
                if (filterQuery.salary) params.append("salary", filterQuery.salary);
                params.append("page", pagination.currentPage || 1);

                const response = await axios.get(`${JOB_API_END_POINT}/get?${params.toString()}`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    dispatch(setAllJobs(response.data.jobs));
                    dispatch(setPagination({
                        currentPage: response.data.currentPage,
                        totalPages: response.data.totalPages
                    }));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllJobs();
    }, [searchedQuery, filterQuery.location, filterQuery.industry, filterQuery.salary, pagination?.currentPage, dispatch])

}

export default useGetAllJobs
