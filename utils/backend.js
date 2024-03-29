import { signIn } from 'next-auth/react'

export const saveUser = async ( userName, id, picture, email ) => {
    try {
        const response = await fetch(process.env.BACKEND_USERS_URI, {
            method: "POST",
            headers: {
                // 'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: id,
                userName: userName,
                picture: picture,
                email: email
            })
        })

        if (!response.ok) {
            console.log(response.text())
        }
    } catch (error) {
        console.log(error)
    }
}


export const getUser = async ( email ) => {
    console.log("getting user")
    try {
        const response = await fetch(`${process.env.BACKEND_USERS_URI}?email=${email}`)
        
        if (!response.ok) {
            console.log("user cannot get")
            return
        } else {
            const data = await response.json()
            return data.response
        }
        

    } catch (error) {
        console.log(error)
    }
}