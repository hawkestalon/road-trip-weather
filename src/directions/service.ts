import { Address, Coordinates } from "./types";


export async function convertAddressToCoord(address: Address): Promise<Coordinates> {
  const params = new URLSearchParams(
    { ...Object.fromEntries(
      Object.entries(address).filter(([_, v]) => v !== undefined),
    ), format: 'json'}
  );
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { headers: { 'user-agent': 'testapp/0.1 (hawkeye.zach@gmail.com)'}});
  const data = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  const coords = data[0]
  return {
    lat: coords.lat,
    long: coords.lon
  }
}

export async function getDirections(start: Coordinates, destination: Coordinates): Promise<Coordinates[]> {
  const coordinates = [[start.long, start.lat], [destination.long, destination.lat]];
  const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car/geojson`, {
    method: 'POST',
    headers: {
      Authorization: process.env.ROUTESERVICE_KEY || "",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ coordinates })
  });
  const res = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(res));
  }


  const coords = res.features[0].geometry.coordinates

  return coords.map((crd: any) => ({ long: crd[0], lat: crd[1] }))
}

export async function getDurations(coordinates: Coordinates[]) {
  const locations = coordinates.map((x) => ([x.long, x.lat]))
  const response = await fetch(`https://api.openrouteservice.org/v2/matrix/driving-car`, {
    method: 'POST',
    headers: {
      Authorization: process.env.ROUTESERVICE_KEY || "",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ locations })
  });

  const res = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(res));
  }

  return res.durations;
}
