import AddAccommodation from "@/components/AddAccommodation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClient } from "@/utils/supabase/server";
import { AlertCircle } from "lucide-react";

import { redirect } from "next/navigation";

export default async function AgregarPage() {
    const supabase = await createClient()

    const { data: { user }, error } = await supabase.auth.getUser()

    if (!user) {
        redirect('/')
    }

    return <main className="px-4 py-8 flex flex-col gap-4">
        <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">Agregar alojamiento</h1>
        <Alert className="bg-green-200/35 border-green-500 text-green-500">
            <AlertCircle className="size-4" />
            <AlertDescription>
                Por favor, ingresa la dirección de la forma mas especifica posible para que pueda ser detectada en el mapa.
            </AlertDescription>
        </Alert>
        <p className="text-gray-500 text-sm"></p>
        <AddAccommodation />
    </main>

}