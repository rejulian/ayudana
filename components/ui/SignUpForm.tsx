"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/app/actions/auth";
import SubmitButton from "../SubmitButton";
import Link from "next/link";
import { useActionState } from "react";

export function SignUpForm() {

    const [state, formAction] = useActionState(signup, null)

    return (
        <div className="w-full min-h-[calc(100vh-74px)] flex items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Registrate</CardTitle>
                    <CardDescription>
                        Completa el formulario para crear una nueva cuenta.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="first-name">Nombre</Label>
                                    <Input
                                        name="first-name"
                                        id="first-name"
                                        placeholder="Max"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last-name">Apellido</Label>
                                    <Input
                                        name="last-name"
                                        id="last-name"
                                        placeholder="Robinson"
                                        required
                                    />
                                </div>
                            </div>
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
                                <Input name="password" id="password" type="password" />
                            </div>
                            <SubmitButton >
                                Crear cuenta
                            </SubmitButton>
                            {state?.error && <p className="text-destructive">{state.error}</p>}
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Ya tienes una cuenta?{" "}
                        <Link href="/login" className="underline">
                            Inicia sesión
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
