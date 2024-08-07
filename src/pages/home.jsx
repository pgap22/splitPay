import React, { useState, useEffect, useTransition } from 'react';
import { clientAxios } from '../config/clientAxios';
import { socket } from '../config/socketclient';
import { useLocalStorage } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';



export default function Home() {
    const INITIAL_TIME = 300
    const [code, setCode] = useState("");
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userSplitQ, setUserSplitQ] = useLocalStorage("splitq-user")
    const [countdownInterval, setCountdownInterval] = useState()
    const navigate = useNavigate();

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(()=>{
        socket.on("splitpay-deposit", data=>{
            setUserSplitQ(data.user)
            navigate("/pay")
        })
        return ()=> {
            socket.close();
        }
    },[])

    useEffect(() => {
        if (timeLeft > 0 && !countdownInterval) {
            setCountdownInterval(setInterval(() => {
                setTimeLeft(pretimeleft => {
                    if (pretimeleft <= 0) {
                        return 0
                    }
                    return pretimeleft - 1
                })

            }, 1000))
        }
        if (loading) {
            clearInterval(countdownInterval)
            setCountdownInterval(undefined)
        }

        if (timeLeft <= 0 && !loading) {
            const updateCode = async () => {
                try {
                    setCode("")
                    setLoading(true)
                    const { data } = await clientAxios("/authcode")
                    setCode(data.code)
                    setLoading(false)
                } catch (error) {
                    setLoading(true)
                }
            }

            (async () => {
                console.log("RUN")
                await updateCode();
                setTimeLeft(INITIAL_TIME);
            })()

        }

    }, [timeLeft, loading])

    return (
        <>
            <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3">
                <div>
                    <h1 className="capitalize font-black text-center md:text-6xl text-2xl">Bienvenido a <span className="text-gradient bg-aqua-gradient">SplitPay</span></h1>
                </div>
                {loading && <p>Cargando...</p>}
                <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{code}</p>
                <p style={{ fontSize: '1.5em' }}>Tiempo restante: {formatTime(timeLeft)}</p>

            </div>
        </>
    )
}