import { convertAddressToCoord, getDirections, getDurations } from '../directions/service';
import { Address, Coordinates } from '../directions/types';
import { getWeatherForLocation } from '../weather/service';

export async function getWeatherForTrip(start: Address, destination: Address) {
  const [startCoords, destCoords] = await Promise.all(
    [start, destination].map(convertAddressToCoord),
  );
  const directionNodes = await getDirections(startCoords, destCoords);

  const importantNodes = getImportantNodes(directionNodes);

  const weatherInfo = await Promise.all(importantNodes.map(getWeatherForLocation));
  const durations = await getDurations(importantNodes);
  const durationsFromStart = durations[0];
  const rightHourlyForecast = weatherInfo.map((w, idx) => {
    const d = durationsFromStart[idx];
    const duration = Math.floor(d / 3600);
    const forecast = w[duration];
    return {
      time: Math.floor(d / 60) + ' min',
      temperature: forecast.temperature,
      wind: { windspeed: forecast.windSpeed, direction: forecast.windDirection },
      forecast: forecast.shortForecast,
    };
  });

  return rightHourlyForecast;
}

function getImportantNodes(nodes: Coordinates[]): Coordinates[] {
  const jumpDistance = Math.floor(nodes.length / 10);
  const importantNodes = [];

  for (let i = 0; i < nodes.length; i += jumpDistance) {
    importantNodes.push(nodes[i]);
  }
  importantNodes.push(nodes[nodes.length - 1]);

  return importantNodes;
}
