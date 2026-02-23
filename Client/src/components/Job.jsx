import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {

    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - createdAt.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return Math.floor(differenceInDays);
    }

    // Safety fallback for avatar initials
    const companyInitials = job?.company?.companyName ? job.company.companyName.substring(0, 2).toUpperCase() : "NA";

    return (
        <div className='group p-6 rounded-2xl shadow-sm hover:shadow-xl bg-white border border-gray-100 transition-all duration-300 h-full flex flex-col relative overflow-hidden'>
            {/* Soft decorative highlight on hover */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className='flex justify-between items-center mb-4'>
                <div className="flex items-center text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                    <Clock className="w-3 h-3 mr-1" />
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </div>
                <Button variant="ghost" className="rounded-full text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition-colors h-8 w-8 p-0">
                    <Bookmark size={18} />
                </Button>
            </div>

            <div className='flex gap-4 items-center mb-5'>
                <Avatar className="h-14 w-14 ring-2 ring-gray-50 ring-offset-2 shadow-sm">
                    <AvatarImage src={job?.company?.logo} alt={companyInitials} />
                    <AvatarFallback className="bg-purple-100 text-purple-700 font-bold">{companyInitials}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className='font-bold text-gray-900 leading-tight'>{job?.company?.companyName}</h1>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {job?.location || "Remote"}
                    </div>
                </div>
            </div>

            <div className='mb-4 flex-grow'>
                <h1 className='font-bold text-xl text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-purple-700 transition-colors'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-3 leading-relaxed'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mb-6'>
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-transparent font-semibold shadow-none">
                    {job?.position} positions
                </Badge>
                <Badge className="bg-orange-50 text-[#F83002] hover:bg-orange-100 border-transparent font-semibold shadow-none">
                    {job?.jobType}
                </Badge>
                <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-transparent font-semibold shadow-none">
                    {job?.salary} LPA
                </Badge>
            </div>

            <div className='flex items-center gap-3 mt-auto pt-4 border-t border-gray-100'>
                <Button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm transition-all" onClick={() => navigate(`/description/${job._id}`)}>
                    View Details
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md transition-all">
                    Quick Save
                </Button>
            </div>
        </div>
    )
}

export default Job
