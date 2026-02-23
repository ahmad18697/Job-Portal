import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, UploadCloud } from 'lucide-react'

const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!input.fullname || !input.email || !input.password || !input.phoneNumber || !input.role) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData()
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true))

      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      if (response.data.success) {
        navigate("/login");
        toast.success(response.data.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate])

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />
      <div className='flex-grow flex items-center justify-center p-4 relative overflow-hidden'>

        {/* Soft Background Blurs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />

        <div className='w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 relative z-10 my-8'>
          <div className="text-center mb-8">
            <h1 className='font-extrabold text-3xl text-gray-900 tracking-tight'>Create Account</h1>
            <p className="text-gray-500 mt-2">Join us and start exploring top opportunities</p>
          </div>

          <form onSubmit={submitHandler} className='space-y-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className='space-y-2'>
                <Label className="text-gray-700 font-medium">Full Name</Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  className="h-12 rounded-xl border-gray-200 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label className="text-gray-700 font-medium">Email Address</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="john@example.com"
                  className="h-12 rounded-xl border-gray-200 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
                  required
                />
              </div>

              <div className='space-y-2'>
                <Label className="text-gray-700 font-medium">Phone Number</Label>
                <Input
                  type="tel"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="+1 (555) 000-0000"
                  className="h-12 rounded-xl border-gray-200 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label className="text-gray-700 font-medium">Password</Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="h-12 rounded-xl border-gray-200 focus:ring-purple-500 focus:border-purple-500 transition-shadow"
                  required
                />
              </div>
            </div>

            <div className='pt-2'>
              <Label className="text-gray-700 font-medium mb-3 block">Account Type</Label>
              <RadioGroup className="flex items-center gap-4 sm:gap-6 bg-gray-50 p-3 rounded-xl border border-gray-100" required>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex-1 cursor-pointer hover:border-purple-300 transition-colors">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer text-purple-600 focus:ring-purple-500 h-4 w-4"
                    required
                  />
                  <Label className="cursor-pointer font-medium text-gray-700 m-0">Candidate</Label>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex-1 cursor-pointer hover:border-purple-300 transition-colors">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer text-purple-600 focus:ring-purple-500 h-4 w-4"
                    required
                  />
                  <Label className="cursor-pointer font-medium text-gray-700 m-0">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            <div className='space-y-2 pt-2'>
              <Label className="text-gray-700 font-medium">Profile Photo (Optional)</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={changeFileHandler}
                  />
                </label>
              </div>
              {input.file && <p className="text-sm text-purple-600 font-medium mt-2">File selected: {input.file.name}</p>}
            </div>

            {loading ? (
              <Button disabled className="w-full h-12 rounded-xl text-md font-medium mt-4 bg-purple-500 text-white shadow-md">
                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Creating Account...
              </Button>
            ) : (
              <Button type="submit" className="w-full h-12 rounded-xl text-md font-medium mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md transition-all hover:-translate-y-0.5">
                Create Account
              </Button>
            )}

            <p className='text-center text-gray-500 mt-6'>
              Already have an account? <Link to="/login" className='text-purple-600 font-semibold hover:underline decoration-2 underline-offset-4'>Log in here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
