"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../green-supermarket-common-ui'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

type Props = {}

const inputStyles = {
    loginInputBase: "border border-gray-50 placeholder-gray-200 rounded-md"
}

const LoginModal = (props: Props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const handleEyeClick = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center">

            <div>
                <h1 className="uppercase text-green-400 font-medium text-2xl lg:text-3xl">green <span className="text-gray-900">supermarket</span></h1>
            </div>

            <div className="flex flex-col gap-2 p-4 lg:p-6 items-center justify-center shadow-xl rounded-lg lg:w-[30rem]">

                <h2 className="font-medium text-xl my-2 lg:text-2xl">Admin Sign In</h2>

                <form className="flex flex-col gap-2 lg:m-4 lg:gap-3 lg:w-full">
                    <input className={`${inputStyles.loginInputBase} p-1 lg:p-2`} type="text" name="employee-id" placeholder="EmployeeId" />
                    <div className="w-full relative">
                        <input className={`${inputStyles.loginInputBase} py-1 pl-1 pr-9 w-full lg:py-2 lg:pl-2`}
                            type={showPassword ? "text" : "password"}
                            name="employee-password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {
                            password && (
                                <button className="absolute right-2 top-2 lg:top-3 text-xl" type="button" onClick={handleEyeClick}>
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </button>
                            )
                        }
                    </div>
                    <div className="flex justify-between w-full text-sm">
                        <div className="flex gap-1">
                            <input type="checkbox" />
                            <p className="text-gray-600">Remember Me</p>
                        </div>
                        <div>
                            <Link href="#" className="underline text-gray-600">Forgot Password</Link>
                        </div>
                    </div>
                    <div className="w-full my-1">
                        <Button className="w-full">Login</Button>
                    </div>
                    <p className="text-xs text-gray-200 lg:text-sm text-center">Don&apos;t have an account? <a href="#" className="text-gray-900 underline font-medium"> Contact the Super Admin</a></p>
                </form>

            </div>

        </div>
    )
}

export default LoginModal