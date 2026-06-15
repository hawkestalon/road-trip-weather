import { Coordinates } from '../directions/types';
import { GridInfo } from './types';

export async function getWeatherForLocation(location: Coordinates) {
  // lookup coordinate to get grid point and station
  const gridInfo = await lookupCoordinate(location);
  // get weather forecast for grid point and station
  const weather = await getWeatherForGridPoint(gridInfo);

  return weather;
}

async function lookupCoordinate(location: Coordinates): Promise<GridInfo> {
  const response = await fetch(`https://api.weather.gov/points/${location.lat},${location.long}`, {
    headers: { 'User-Agent': '(weatherApp/0.1 hawkeye.zach@gmail.com)' },
  });

  const res = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(res));
  }

  // console.log("weather grid info", res);

  const { properties } = res;

  return {
    station: properties.gridId,
    grid: {
      x: properties.gridX,
      y: properties.gridY,
    },
  };
}

async function getWeatherForGridPoint(gridPt: GridInfo) {
  const response = await fetch(
    `https://api.weather.gov/gridpoints/${gridPt.station}/${gridPt.grid.x},${gridPt.grid.y}/forecast/hourly`,
    { headers: { 'User-Agent': '(weatherApp/0.1 hawkeye.zach@gmail.com)' } },
  );
  const res = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(res));
  }

  return res.properties.periods;
}
