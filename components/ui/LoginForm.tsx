"use client"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/app/actions/auth"
import SubmitButton from "../SubmitButton"
import { useActionState } from "react"

export default function LoginForm() {

    const [state, formAction] = useActionState(login, null)

    return (
        <div className="w-full min-h-[calc(100vh-74px)] flex items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
                    <CardDescription>
                        Ingresa tus credenciales para acceder a tu cuenta.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" name="password" required />
                        </div>
                        <SubmitButton>
                            Iniciar sesión
                        </SubmitButton>
                        {state?.error && <p className="text-destructive">{state.error}</p>}
                    </form>
                    <div className="mt-4 text-center text-sm">
                        No tienes cuenta?{" "}
                        <Link href="/signup" className="underline">
                            Registrate
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
