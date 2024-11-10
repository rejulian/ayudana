import AccommodationCard from "@/components/AccommodationCard"
import { createClient } from "@/utils/supabase/server"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default async function Home() {

  const supabase = await createClient()

  const { data, error } = await supabase.from("accommodations").select('*').order("created_at", { ascending: false })
  if (error) throw new Error("Error al obtener alojamientos")

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="px-4 py-8 flex flex-col gap-4">
      <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">Listado de alojamientos</h1>
      <Alert className="bg-orange-400/35 border-orange-400 text-orange-400">
        <AlertCircle className="size-4" />
        <AlertTitle>Ayuda!</AlertTitle>
        <AlertDescription>
          Puedes ayudar a los voluntarios a encontrar un lugar para dormir creando una nueva cuenta y agregando un alojamiento.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
          data.length > 0 ?
            data.map(alojamiento => (
              <AccommodationCard key={alojamiento.id} accommodation={alojamiento} userId={user?.id} />
            )) : 'No se encontraron alojamientos'
        }
      </div>
    </main>
  )
}