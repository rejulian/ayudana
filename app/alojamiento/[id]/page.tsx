import LocationMap from "@/components/LocationMap"
import { createClient } from "@/utils/supabase/server"
import 'leaflet/dist/leaflet.css'

export default async function AccommodationDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const supabase = await createClient()

    const { data, error } = await supabase.from("accommodations").select('*').eq("id", (await params).id).single()

    if (error) throw new Error("Error al obtener alojamiento.")

    return <main className="px-4 py-8 flex flex-col gap-4">

        <LocationMap accommodation={data} />
    </main>
}