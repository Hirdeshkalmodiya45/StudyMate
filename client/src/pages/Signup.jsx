/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SingleInput from '../components/SingleInput'
import { useContext } from 'react'

import AppContext from '../contexts/AppContext'
import { Oval } from 'react-loader-spinner'
import SignError from '../errors/SignError'

function Signup() {
    const [disable, setDisable] = useState(false)
    const [isError, setIsError] = useState(false)
    // Initialize state to store form input values
    const [formInput, setFormInput] = useState({
        fname: '',
        lname: '',
        email: '',
        password: ''
    })

  const BASE_URL = import.meta.env.VITE_API_URL;
    
    const navigate = useNavigate()
    const {setEmail, setUser} = useContext(AppContext)

    // Update the formInput state when input fields change
    const handleInputChange = (e) => {
        console.log('signup input handle');
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        })
    }

    // Logic for handling form submission 
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('signup submit...');

        // Asynchronously send form data to the server
        async function postData() {
            setDisable(true)
            // Sending POST request using fetch API to '/signup' router
            const response = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-type": "application/json",
                },
                // The actual user information such name, email,password etc.
                body: JSON.stringify(formInput),
            })

            return response.json()
        }

        setFormInput({
            fname: '',
            lname: '',
            email: '',
            password: ''
        })

        // Log the response from the server
        postData().then(({ status, email, user }) => {
            if (status === true) {
                setEmail(email)
                setUser(user)
                navigate('/verify')
            } else {
                setIsError(true)
            }
        }).catch(() => {
            setIsError(true)
        })
    }


    // JSX for rendering the signup form
return (
    <>
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 px-4 pt-20 pb-10">

            {/* Illustration - only on md+ */}
            <div className="hidden md:flex justify-center items-center w-full md:w-1/2">
                <img
                    className="w-[400px] lg:w-[500px]"
                    src="/images/Imagination-cuate.png"
                    alt="student illustration"
                />
            </div>

            {/* Signup form */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <form
                    className="w-full max-w-sm"
                    action={`${BASE_URL}/signup`}
                    onSubmit={handleSubmit}
                >
                    <fieldset className="border-2 rounded-xl border-gray-300 w-full p-6 shadow-sm">
                        <legend className="px-4 py-1 border border-gray-300 rounded-lg font-semibold text-gray-700">
                            SignUp
                        </legend>

                        {/* First + Last name row */}
                        <div className="flex flex-col space-y-3 mt-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                            <div className="w-full sm:w-1/2">
                                <SingleInput
                                    fieldName="fname" fieldType="text" fieldLabel="First Name"
                                    inputChange={handleInputChange} inputValue={formInput.fname}
                                />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <SingleInput
                                    fieldName="lname" fieldType="text" fieldLabel="Last Name"
                                    inputChange={handleInputChange} inputValue={formInput.lname}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <SingleInput
                                fieldName="email" fieldType="email" fieldLabel="Email ID"
                                pholder="@gmail.com" require={true}
                                inputChange={handleInputChange} inputValue={formInput.email}
                            />
                        </div>

                        <div className="mt-4">
                            <SingleInput
                                fieldName="password" fieldType="password" fieldLabel="Password"
                                pholder="*****" require={true}
                                inputChange={handleInputChange} inputValue={formInput.password}
                            />
                        </div>

                        <button
                            className="w-full mt-6 py-2 rounded-lg bg-teal-700 hover:bg-teal-800
                                       text-white font-semibold text-base transition-colors
                                       disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
                            type="submit"
                            disabled={disable}
                        >
                            {!disable ? "SignUp" : (
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

        <SignError open={isError} closeModal={() => setIsError(false)} />
    </>
)
}



export default Signup