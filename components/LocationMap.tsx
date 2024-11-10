"use client"
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { Map as LeafletMap } from 'leaflet';
import { Accommodation } from '@/types/type';
import { Bed, MapPin, Phone } from 'lucide-react';

const LocationMap = ({ accommodation }: { accommodation: Accommodation }) => {
    const [coordinates, setCoordinates] = React.useState<[number, number] | null>(null);
    const [map, setMap] = React.useState<LeafletMap | null>(null);
    const [error, setError] = React.useState<string>('');

    // Geocode the address to get coordinates
    React.useEffect(() => {
        const geocodeAddress = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(accommodation.address)}`
                );
                const data = await response.json();

                if (data && data[0]) {
                    setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                } else {
                    setError("Error al encontrar coordenadas.")
                }
            } catch (error) {
                console.error('Error geocoding address:', error);
            }
        };

        geocodeAddress();
    }, [accommodation]);

    // Initialize map once we have coordinates
    React.useEffect(() => {
        if (coordinates && !map) {
            // We need to use dynamic import for Leaflet
            import('leaflet').then((L) => {
                // Create custom icon
                const customIcon = new L.Icon({
                    iconUrl: 'https://img.icons8.com/color/pin',
                    iconRetinaUrl: '/marker-icon-2x.png',
                    iconSize: [41, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });

                const mapInstance = L.map('map').setView(coordinates, 25);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mapInstance);

                // Add marker with popup showing address using custom icon
                L.marker(coordinates, { icon: customIcon })
                    .bindPopup(accommodation.address)
                    .addTo(mapInstance);

                setMap(mapInstance);
            });
        }

        // return () => {
        //     if (map) {
        //         map.remove();
        //     }
        // };
    }, [coordinates, map, accommodation.address]);

    return (
        <Card className="w-full">
            <CardHeader className='flex flex-col gap-4'>
                {coordinates ? (
                    <>
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
                        <div id="map" className="h-96 w-full rounded-lg" />
                    </>
                ) : (
                    <div className="h-[500px] w-full rounded-lg flex items-center justify-center bg-gray-300">
                        {error ? <p className='text-destructive'>{error}</p> : <p className='text-black'>Cargando...</p>}
                    </div>
                )}
            </CardHeader>
        </Card>
    );
};

export default LocationMap;