import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Form validation and handling
import { clientAxios } from '../config/clientAxios';
import { useSession } from '../hook/useSession';
import axios from 'axios';

const TokenLogin = () => {
    const [loading, setLoading] = useState(false); // State for loading
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const { register, handleSubmit, formState: { errors } } = useForm(); // Integrate react-hook-form
    const { login } = useSession();

    const onSubmit = async (form) => {
        setLoading(true); // Set loading to true when the request starts
        setErrorMessage(''); // Clear any previous error message
        try {
            const { data } = await axios(import.meta.env.VITE_SPLITPAY_SERVER+"/get_splitpay", {
                headers: {
                    'Authorization': 'Bearer ' + form.token
                }
            });
            login(form);
        } catch (error) {
            console.error(error);
            setErrorMessage('Error al obtener los datos. Verifique su token y intente nuevamente.'); // Set error message
        } finally {
            setLoading(false); // Set loading to false when the request completes
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3 bg-background p-8">
            <div>
                <h1 className="capitalize font-black text-center md:text-6xl text-2xl">
                    Bienvenido a <span className="text-gradient bg-aqua-gradient">SplitPay</span>
                </h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                <div className="flex flex-col space-y-4">
                    <div className="w-full">
                        <label htmlFor="token" className="text-sm font-medium text-gray-300">
                            Ingrese su token de SplitPay
                        </label>
                        <input
                            type="text"
                            id="token"
                            name="token"
                            {...register('token', { required: 'El token es obligatorio' })} // Add validation rule
                            placeholder="Ingrese su token"
                            className="w-full p-3 border border-gray-border bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#02AAB0] transition duration-150 ease-in-out"
                        />
                        {errors.token && <span className="text-danger-text text-sm">{errors.token.message}</span>}
                    </div>
                    <button
                        type="submit" // Ensure button is of type submit
                        className="bg-white font-bold text-black border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 transition-all duration-200 ease-in-out"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Cargando...' : 'Guardar Token'} 
                    </button>
                    {errorMessage && <span className="text-danger-text text-sm">{errorMessage}</span>} 
                </div>
            </form>
        </div>
    );
};

export default TokenLogin;
