import { signIn } from 'next-auth/react'

// export const saveUser = async ( userName, id, picture, email ) => {
//     try {
//         const response = await fetch(process.env.BACKEND_USERS_URI, {
//             method: "POST",
//             headers: {
//                 // 'Accept': "application/json",
//                 'Content-Type': "application/json"
//             },
//             body: JSON.stringify({
//                 id: id,
//                 userName: userName,
//                 picture: picture,
//                 email: email
//             })
//         })

//         if (!response.ok) {
//             console.log(response.text())
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }


// export const getUser = async ( email ) => {
//     console.log("getting user")
//     try {
//         const response = await fetch(`${process.env.BACKEND_USERS_URI}?email=${email}`)
        
//         if (!response.ok) {
//             console.log("user cannot get")
//             return
//         } else {
//             const data = await response.json()
//             return data.response
//         }
        

//     } catch (error) {
//         console.log(error)
//     }
// }

// http://localhost:8006/multi-agent-chat
export const getMessagesFromChat = async ( conversationId, id_token ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_SERVICE_URL}/chats/${conversationId}/messages`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${id_token}`,
                'Content-Type': "application/json"
            },
        })

        if (response.status === 401) {
            // backend return 401
            signIn()
            return
        }

        if (!response.ok) {
            console.log(`cannot get prediction with ${process.env.NEXT_PUBLIC_MAIN_SERVICE_URL} !`)
            return
        } else {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}


export const postChat = async ( userMessage, id_token ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_SERVICE_URL}/chats`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${id_token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "actual_content": userMessage
            })
        })

        if (response.status === 401) {
            // backend return 401
            console.log(`idtoken is ${id_token}`)
            // signIn()
            return
        }

        if (!response.ok) {
            console.log(`cannot get prediction with ${process.env.NEXT_PUBLIC_BACKEND_PREDICT_URI} !`)
            return
        } else {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}


export const postMessageToChat = async ( userMessage, id_token, chatId ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_SERVICE_URL}/chats/${chatId}/messages`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${id_token}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "actual_content": userMessage
            })
        })

        if (response.status === 401) {
            // backend return 401
            console.log(`idtoken is ${id_token}`)
            // signIn()
            return
        }

        if (!response.ok) {
            console.log(`cannot get prediction with ${process.env.NEXT_PUBLIC_BACKEND_PREDICT_URI} !`)
            return
        } else {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}