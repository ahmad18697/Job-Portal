import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICANT_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'
import Navbar from './shared/Navbar'
import { Building2, MapPin, Briefcase, IndianRupee, Users, Calendar, Clock } from 'lucide-react'

const JobDescription = () => {
  const dispatch = useDispatch();
  const { singleJob } = useSelector(state => state.job)
  const { user } = useSelector(state => state.auth)

  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;

  const applyJobHandler = async () => {
    try {
      const response = await axios.post(`${APPLICANT_API_END_POINT}/apply/${jobId}`, {}, {
        withCredentials: true
      })

      if (response.data.success) {
        setIsApplied(true); // local state update
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        // real time ui update
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleJobDescription = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true
        });
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
          setIsApplied(response.data.job.applications.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSingleJobDescription();
  }, [jobId, dispatch, user?._id])

  if (!singleJob) return null;

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6">

        {/* Header Section */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-indigo-500" />

          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
            <div>
              <h1 className='text-3xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3'>{singleJob?.title}</h1>
              <div className='flex flex-wrap items-center gap-3 mt-4'>
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-transparent font-semibold shadow-none px-3 py-1">
                  {singleJob?.position} Openings
                </Badge>
                <Badge className="bg-orange-50 text-[#F83002] hover:bg-orange-100 border-transparent font-semibold shadow-none px-3 py-1">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-transparent font-semibold shadow-none px-3 py-1">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>

            <Button
              onClick={isApplied ? undefined : applyJobHandler}
              disabled={isApplied}
              className={`rounded-full px-8 py-6 text-lg font-medium shadow-md transition-all ${isApplied ? 'bg-gray-100 text-gray-500 opacity-100 hover:bg-gray-100 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:-translate-y-1'}`}
            >
              {isApplied ? 'Already Applied' : 'Apply Now'}
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left: Description */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8">
              <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center border-b pb-4 border-gray-100'>
                Job Description
              </h2>
              <div className="prose prose-purple max-w-none text-gray-600 leading-relax">
                <p>{singleJob?.description}</p>
              </div>
            </div>
          </div>

          {/* Right: Metadata Cards */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Overview</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600 shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Role</p>
                    <p className="text-gray-900 font-semibold">{singleJob?.title}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Location</p>
                    <p className="text-gray-900 font-semibold">{singleJob?.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-50 rounded-lg text-orange-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Experience Needed</p>
                    <p className="text-gray-900 font-semibold">{singleJob?.experience} Years</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Salary Range</p>
                    <p className="text-gray-900 font-semibold">{singleJob?.salary} LPA</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-600 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Applicants</p>
                    <p className="text-gray-900 font-semibold">{singleJob?.applications?.length} Applied</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-600 shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Posted On</p>
                    <p className="text-gray-900 font-semibold">{singleJob?.createdAt.split("T")[0]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default JobDescription
