import { useLocalStorage } from "usehooks-ts"

export default function Pay() {
    const [splitQUser] = useLocalStorage("splitq-user")
    return(
        <>
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3">
            <div>
                <p>Bienvenido {splitQUser.name} {splitQUser.lastname} 👋</p>
                <h1 className="capitalize font-black text-center md:text-6xl text-2xl">Inserta las monedas</h1>
            </div>
            <h1 className="text-gradient bg-aqua-gradient capitalize font-black text-center md:text-5xl">El monto ingresado es:</h1>

        </div>
    </>
    )
}