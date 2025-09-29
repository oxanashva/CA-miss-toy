import { eventBusService } from "../services/event-bus.service"

import { useState, useEffect } from "react"

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            setTimeout(onCloseMsg, 1500)
        })

        return () => {
            unsubscribe()
        }
    })

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return null

    return (
        <div className={"user-msg " + msg.type}>
            <p>{msg.txt}</p>
            <button className={msg.type} onClick={onCloseMsg}>X</button>
        </div>
    )
}