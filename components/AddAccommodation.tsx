"use client"
import { addAccommodation } from "@/app/actions/accommodation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import SubmitButton from "./SubmitButton";

export default function AddAccommodation() {
    const [state, formAction] = useActionState(addAccommodation, null)

    return <form className="flex flex-col gap-4 border rounded-md p-4" action={formAction}>
        <div>
            <Label>Dirección</Label>
            <Input type="text" name="address" required placeholder="Ej: Nombre de calle, 321, Valencia." />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <Label>Capacidad</Label>
                <Input type="number" name="capacity" required />
            </div>
            <div>
                <Label>Numero de contacto</Label>
                <Input type="number" name="contact" required />
            </div>
        </div>
        <SubmitButton>Agregar</SubmitButton>
        {state?.error && <p className="text-destructive text-sm">{state.error}</p>}
    </form>
}