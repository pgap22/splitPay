import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {

    
    const [timeLeft, setTimeLeft] = useState(5); 
    const navigate = useNavigate()

    useEffect(() => {
    
        if (timeLeft == 0) {
            navigate("/");
            return;
        }

        const countdownInterval = setInterval(() => {
            setTimeLeft(prevTime => Math.max(prevTime - 1, 0));
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [timeLeft, navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };


    return(
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5">
                <h1 className="capitalize font-black text-center md:text-6xl text-2xl">Su monto ha sido ingresado con exito</h1>
                <h1 className="font-black text-center text-2xl">Regresando al inicio en: {formatTime(timeLeft)}</h1>

        </div>
    )
}