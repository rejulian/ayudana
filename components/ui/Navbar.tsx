import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { Button } from "./button"
import { signout } from "@/app/actions/auth"
import { House } from "lucide-react";

export default async function NavBar() {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    return <nav className="flex gap-3 p-4 justify-end">
        {user ? <>
            <Link href="/" className="flex items-center gap-2 border px-3 py-2 max-w-[100px] rounded-lg hover:bg-gray-900"><House className="size-4" />Inicio</Link>
            <Link className="border p-2 rounded-md hover:bg-gray-900" href="/agregar">Agregar alojamiento</Link>
            <form action={signout}>
                <Button type="submit">Cerrar sesion</Button>
            </form>
        </> : <>
            <Link href="/" className="flex items-center gap-2 border px-3 py-2 max-w-[100px] rounded-lg hover:bg-gray-900"><House className="size-4" />Inicio</Link>
            <Link href='/login' className="border p-2 rounded-md hover:bg-gray-900">Iniciar sesion</Link>
            <Link href='/signup' className="border p-2 rounded-md bg-primary text-secondary">Registrate</Link>
        </>
        }
    </nav>
}