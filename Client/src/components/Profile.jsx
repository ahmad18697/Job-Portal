import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, FileText, UploadCloud } from 'lucide-react';
import { Badge } from './ui/badge';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import Footer from './shared/Footer';
import { motion } from "framer-motion"

function Profile() {
    useGetAppliedJobs();

    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth);

    const initials = user?.fullname?.substring(0, 2).toUpperCase() || "US";

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Navbar />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-4xl mx-auto pt-10 px-4 sm:px-6'
            >
                {/* Profile Header Card */}
                <div className='bg-white border border-gray-100 shadow-sm rounded-3xl p-8 relative overflow-hidden'>
                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-purple-500 to-indigo-500" />

                    <div className='flex flex-col sm:flex-row justify-between items-start gap-6'>
                        <div className='flex items-center gap-6'>
                            <Avatar className="cursor-pointer w-24 h-24 ring-4 ring-gray-50 shadow-sm">
                                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                <AvatarFallback className="text-2xl font-bold bg-purple-100 text-purple-700">{initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className='font-extrabold text-3xl text-gray-900 tracking-tight leading-none mb-2'>{user?.fullname}</h1>
                                <p className='text-gray-500 max-w-md'>{user?.profile?.bio || "No bio provided yet. Click the edit button to add a summary of your professional background."}</p>
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-purple-700 shadow-sm transition-all rounded-full px-6 py-2 h-auto" variant="outline">
                            <Pen className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>

                    <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Details</h3>
                            <div className='flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100'>
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Mail className="w-5 h-5 text-purple-600" />
                                </div>
                                <span className="font-medium">{user?.email}</span>
                            </div>
                            <div className='flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100'>
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Contact className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="font-medium">{user?.phoneNumber || "Phone number not added"}</span>
                            </div>
                        </div>

                        {/* Resume Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Resume Document</h3>
                            {user?.profile?.resume ? (
                                <div className="flex items-center justify-between bg-purple-50 p-4 rounded-xl border border-purple-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg shadow-sm">
                                            <FileText className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <a target='blank' href={user?.profile?.resume} className='text-purple-700 font-semibold hover:underline decoration-2 underline-offset-2 truncate max-w-[200px] block'>
                                            {user?.profile?.resumeOriginalName}
                                        </a>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-100 rounded-full" onClick={() => window.open(user?.profile?.resume, '_blank')}>
                                        View
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-500">
                                    <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                                    <span className="text-sm font-medium">No resume uploaded</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills Selection */}
                    <div className='mt-8 pt-8 border-t border-gray-100'>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Core Skills</h3>
                        <div className='flex items-center gap-2 flex-wrap'>
                            {user?.profile?.skills?.length > 0 ? (
                                user.profile.skills.map((item, index) => (
                                    <Badge key={index} className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent px-4 py-1.5 shadow-none text-sm font-medium rounded-full">
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-gray-400 italic text-sm">Skills have not been added to this profile yet.</span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Application History Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='max-w-4xl mx-auto my-10 px-4 sm:px-6'
            >
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
                        <h1 className='font-bold text-2xl text-gray-900 tracking-tight'>Application History</h1>
                        <p className="text-gray-500 mt-1">Track the status of roles you have recently applied for.</p>
                    </div>
                    <div className="p-2 sm:p-4">
                        <AppliedJobTable />
                    </div>
                </div>
            </motion.div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <Footer />
        </div>
    )
}

export default Profile;
