import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import LogError from "../errors/LogError"
import { Oval } from "react-loader-spinner"

import AppContext from "../contexts/AppContext"

function Login() {
    const navigate = useNavigate()
    const [isError, setIsError] = useState(false)
    const [formInput, setFormInput] = useState({email: '', password: ''})
    const [disable, setDisable] = useState(false)
    const {setEmail, setUser,setIsVerified} = useContext(AppContext)

  const BASE_URL = import.meta.env.VITE_API_URL;
      const handleInputChange = ({target:{name,value}}) => {
        setFormInput({...formInput,[name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setDisable(true)
        async function getLoggedIn(data) {
            return fetch(`${BASE_URL}/login`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(data)
            })
        }

        const response = getLoggedIn(formInput)

        response
        .then(res => res.json())
        .then(({success, email, user}) => {
            if (!success) {
                setIsError(true)
                setDisable(false)
                
            } else {
                setTimeout(() => {
                    setEmail(email)
                    setUser(user)
                     setIsVerified(true)
                    navigate('/')
                }, 2000)
            }
        })
        .catch(err => {
            setIsError(true)
            setDisable(false)
            console.log(err);
        })
    }

   return (
    <>
        {/* Full page centered layout */}
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 px-4 pt-20 pb-10">
            
            {/* Illustration - only on md+ */}
            <div className="hidden md:flex justify-center items-center w-full md:w-1/2">
                <img 
                    className="w-[400px] lg:w-[500px]" 
                    src="/images/Creative thinking-bro.png" 
                    alt="student illustration" 
                />
            </div>

            {/* Login form */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <form 
                    className="w-full max-w-sm"
                    action={`${BASE_URL}/login`} 
                    method="post" 
                    onSubmit={handleSubmit}
                >
                    <fieldset className="border-2 rounded-xl border-gray-300 w-full p-6 shadow-sm">
                        <legend className="px-4 py-1 border border-gray-300 rounded-lg font-semibold text-gray-700">
                            LogIn
                        </legend>

                        <div className="flex flex-col space-y-1 mt-2">
                            <label className="text-slate-600 font-semibold text-sm" htmlFor="email">
                                Email ID
                            </label>
                            <input 
                                className="w-full border border-stone-300 rounded-lg p-2 text-sm
                                           focus:outline focus:outline-2 focus:outline-teal-700 focus:border-none" 
                                type="email" name="email" id="email" 
                                required 
                                value={formInput?.email} 
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-col space-y-1 mt-4">
                            <label className="text-slate-600 font-semibold text-sm" htmlFor="password">
                                Password
                            </label>
                            <input 
                                className="w-full border border-stone-300 rounded-lg p-2 text-sm
                                           focus:outline focus:outline-2 focus:outline-teal-700 focus:border-none" 
                                type="password" name="password" id="password" 
                                required 
                                value={formInput?.password} 
                                onChange={handleInputChange}
                            />
                        </div>

                        <button 
                            className="w-full mt-6 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 
                                       text-white font-semibold text-base transition-colors
                                       disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center" 
                            type="submit" 
                            disabled={disable}
                        >
                            {!disable ? "LogIn" : (
                                <Oval
                                    height={22} width={22}
                                    color="#fff" secondaryColor="#efefef"
                                    strokeWidth={5} strokeWidthSecondary={8}
                                    visible={true} ariaLabel="oval-loading"
                                />
                            )}
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>

        <LogError open={isError} close={() => setIsError(false)}/>
    </>
)
}

export default Login