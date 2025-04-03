'use client'

import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"


export default function VerifyPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get("token")

    useEffect(() => {
        async function verifyEmail() {
       try{
        const res = await fetch(`http://localhost:3000/api/accounts/verify/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(res.ok){
            router.push('/login')
        } else {
            console.log('Email not verified')
        }

       }catch(error){
        console.log(error)
       }
    }
    verifyEmail()
    }, [token, router])

return (
    <div>
        Verifying your email please wait 
    </div>
)
}
