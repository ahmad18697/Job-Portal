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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Navbar />
      <div className='flex-grow flex items-center justify-center p-4 relative overflow-hidden'>

        {/* Soft Background Blurs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none" />

        <div className='w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 relative z-10'>
          <div className="text-center mb-8">
            <h1 className='font-extrabold text-3xl text-gray-900 tracking-tight'>Welcome Back</h1>
            <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={submitHandler} className='space-y-6'>
            <div className='space-y-2'>
              <Label className="text-gray-700 font-medium">Email Address</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="john.doe@example.com"
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

            <div className='pt-2'>
              <Label className="text-gray-700 font-medium mb-3 block">Account Type</Label>
              <RadioGroup className="flex items-center gap-6 bg-gray-50 p-3 rounded-xl border border-gray-100" required>
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

            {loading ? (
              <Button disabled className="w-full h-12 rounded-xl text-md font-medium bg-purple-500 text-white shadow-md">
                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Verifying...
              </Button>
            ) : (
              <Button type="submit" className="w-full h-12 rounded-xl text-md font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md transition-all hover:-translate-y-0.5">
                Log In
              </Button>
            )}

            <p className='text-center text-gray-500 mt-6'>
              Don't have an account? <Link to="/signup" className='text-purple-600 font-semibold hover:underline decoration-2 underline-offset-4'>Sign up here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
