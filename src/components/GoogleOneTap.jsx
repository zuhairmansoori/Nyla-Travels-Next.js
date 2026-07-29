"use client"

import { useEffect, useRef } from "react"
import { clientAuth } from "@/lib/client-auth"

let hasTriggered = false

export default function GoogleOneTap() {
    const checkedSession = useRef(false)

    useEffect(() => {
        if (hasTriggered || checkedSession.current) return
        checkedSession.current = true

        async function run() {
            try {
                const session = await clientAuth.getSession()
                if (session?.data?.user) return // already logged in, One Tap skip

                hasTriggered = true

                await clientAuth.oneTap({
                    callbackURL: "/",
                    onPromptNotification: (notification) => {
                        console.warn("One Tap skipped/dismissed:", notification)
                      
                    }
                })
            } catch (error) {
                console.error("One Tap failed:", error)
                hasTriggered = false
            }
        }

        run()
    }, [])

    return null
}