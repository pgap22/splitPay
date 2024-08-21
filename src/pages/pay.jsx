import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "usehooks-ts"
import {socket} from "../config/socketclient"
import { sumDecimal } from "../helpers/decimal";
export default function Pay() {
    const [splitQUser, _, remove] = useLocalStorage("splitq-user")
    const [splitAmount, setSplitAmount, deleteAmount] = useLocalStorage("splitpay-amount",0)
    const navigate = useNavigate();
    const [notificationDeposit, setNotification] = useState();
    const splitAmountRef = useRef(splitAmount);

    useEffect(() => {
        splitAmountRef.current = splitAmount;
    }, [splitAmount]);

    useEffect(()=>{
        socket.connect();
        socket.on('splitpay-destroy-sessions',()=>{
            remove()
            deleteAmount()
            navigate("/")
        })
        socket.on('splitpay-amount', data=>{
            console.log(sumDecimal(+splitAmountRef.current,+data))
            setSplitAmount(sumDecimal(+splitAmountRef.current,+data))
        })
    },[])

    if (!splitQUser) {
        socket.off("splitpay-destroy-sessions")
        socket.off("splitpay-amount")
        socket.disconnect()
        navigate("/");
    }

    return (
        <>
            <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3">
                <div>
                    <p>Bienvenido {splitQUser.name} {splitQUser.lastname} 👋</p>
                    <h1 className="capitalize font-black text-center md:text-6xl text-2xl">Inserta las monedas</h1>
                </div>
                <h1 className="text-gradient bg-aqua-gradient capitalize font-black text-center md:text-5xl">El monto ingresado es: ${splitAmount}</h1>
            </div>
        </>
    )
}