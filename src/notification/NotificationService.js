import { useState, useEffect, createContext } from "react";

const Notification = ({ type, message }) => {
    const [ icon, setIcon ] = useState()

    const successIcon = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    const errorIcon = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    const warningIcon = <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

    useEffect(() => {
        if(type === 'success') setIcon(successIcon)
        if(type === 'error') setIcon(errorIcon)
        if(type === 'warning') setIcon(warningIcon)
        if(type === 'info') setIcon(infoIcon)
    }, [type]) // eslint-disable-line 

    if(message === '') return

    return(
        <div className={`alert alert-${type} shadow-lg w-fit absolute right-4 top-16`}>
            <div>
                {icon}
                <span>{ message}</span>
            </div>
        </div>
    )
}

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [ type, setType ] = useState('success')
    const [ message, setMessage ] = useState('')

    const setNotification = (type, message) => {
        setType(type)
        setMessage(message)

        setTimeout(() =>{
            setMessage('')
        }, 2000)
    }

    return(
        <NotificationContext.Provider value={{ setNotification }}>
            <Notification type={type} message={message} />
            { children }
        </NotificationContext.Provider>
    )
}