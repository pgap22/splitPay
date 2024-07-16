import React, { useState, useEffect } from 'react';





export default function Home() {
    
    const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
      };

    const [code, setCode] = useState(generateCode());
    const [timeLeft, setTimeLeft] = useState(300); 

    useEffect(() => {
        const updateCode = () => setCode(generateCode());

        updateCode(); 
        const intervalId = setInterval(() => {
            updateCode(); 
            setTimeLeft(300);
        }, 300000);

        const countdownInterval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    return 0; 
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
            clearInterval(countdownInterval);
        };
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };


    return (
        <>
            <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3">
                <div>
                    <h1 className="capitalize font-black text-center md:text-6xl text-2xl">Bienvenido a <span className="text-gradient bg-aqua-gradient">SplitPay</span></h1>
                </div>

                <p style={{ fontSize: '2em', fontWeight: 'bold' }}>{code}</p>
                <p style={{ fontSize: '1.5em' }}>Tiempo restante: {formatTime(timeLeft)}</p>

            </div>
        </>
    )
}