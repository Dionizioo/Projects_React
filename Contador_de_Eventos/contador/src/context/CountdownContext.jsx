import React, {useState} from 'react'

const CountdownContext = React.createContext(null)
// Contexto do contador
const CountdownProvider = ({children}) => {
    // Estado do contador
    const [event,setEvent] = useState(null)


    return(
        <CountdownContext.Provider value={{event,setEvent}}>
            {children}
        </CountdownContext.Provider>
    );
}

export {CountdownProvider,CountdownContext}