import { useContext } from "react"
import { SessionContext } from "../store/Session.jsx"

const useSession = ()=>{
    return useContext(SessionContext)
}
export {useSession}