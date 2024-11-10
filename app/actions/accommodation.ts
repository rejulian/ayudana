"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addAccommodation(prevState: any, formData: FormData) {
    const supabase = await createClient()

    let address = formData.get("address") as string
    const capacity = formData.get("capacity") as string
    const contact = formData.get("contact") as string


    if (!address || !capacity || !contact) {
        return { error: "Todos los campos son obligatorios" }
    }

    const isInAddress = address.toLowerCase().includes("españa")
    if (!isInAddress) {
        address = address.concat(', ', 'España')
    }

    const { error } = await supabase.from("accommodations").insert({ address, capacity: parseInt(capacity), contact })
    if (error) {
        return { error: "Error al crear alojamiento, intenta nuevamente mas tarde." }
    }

    revalidatePath('/')
    redirect("/")
}

export async function deleteAccommodation(formData: FormData) {
    const supabase = await createClient()

    const id = formData.get("id") as string;
    console.log(id);

    const { error } = await supabase.from('accommodations').delete().eq("id", parseInt(id))

    if (error) {
        console.log(error);
        throw new Error("Error al intentar eliminar alojamiento, intenta nuevamente mas tarde.")
    }

    revalidatePath('/')
    redirect('/')
}