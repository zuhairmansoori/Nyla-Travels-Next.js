
import {createAuthClient} from 'better-auth/react'
import {oneTapClient} from 'better-auth/client/plugins'

export const clientAuth = createAuthClient({
    baseURL:process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    plugins:[
        oneTapClient({
            clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            uxMode:'popup',
            autoSelect:false,
            context:'signup',
            cancelOnTapOutside:true,
            promptOptions:{
                baseDelay:1000,
                maxAttempts:1
            }
        })
    ]
})

