import { Bed, MapPin, Phone, Trash2 } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Accommodation } from "@/types/type";
import { Button } from "./ui/button";
import Link from "next/link";
import { deleteAccommodation } from "@/app/actions/accommodation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

export default function AccommodationCard({ accommodation, userId }: { accommodation: Accommodation, userId: string | undefined }) {
    return (
        <Card className="relative">
            <CardHeader>
                <CardTitle className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <p className="font-normal text-base">{accommodation.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bed className="size-4" />
                        <p className="font-normal text-base">Capacidad para {accommodation.capacity} personas.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="size-4" />
                        <a href={`tel:${accommodation.contact}`} className="font-normal text-base underline">{accommodation.contact}</a>
                    </div>
                </CardTitle>
                {
                    userId === accommodation.user_id && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    type="button"
                                    className="bg-red-600/10 absolute right-6 top-3 hover:bg-red-600/20"
                                >
                                    <Trash2 className="text-destructive" aria-label="Eliminar" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <form action={deleteAccommodation}>
                                    <input type="hidden" name="id" value={accommodation.id} />
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Esta acción no se puede deshacer. Eliminará el alojamiento automáticamente.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction type="submit" className="bg-red-600/50 hover:bg-red-600/20 text-white">
                                            Eliminar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    )

                }
            </CardHeader>
            <CardFooter>
                <Link className="bg-primary text-secondary w-full text-center py-1 rounded-md" href={`/alojamiento/${accommodation.id}`}>Ver mapa</Link>
            </CardFooter>
        </Card>
    )
}