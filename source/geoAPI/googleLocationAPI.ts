import config from '../config';
import fetch from 'node-fetch';

interface Location {
  latitude: string;
  longitude: string;
}

export interface Answer {
  name: string;
  location: Location;
}

const getUrl = ({ latitude, longitude }: Location): string => {
  return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&types=subway_station&key=${config.googleToken}`;
};

const handleResponse = (response: any) =>
  response.status === 'OK'
    ? Promise.resolve(getAnswerData(response))
    : Promise.reject(new Error(`Google API Error: ${response.satus}`));

const getAnswerData = (response: any): Answer => ({
  name: response.results[0].name,
  location: {
    latitude: response.results[0].geometry.location.lat,
    longitude: response.results[0].geometry.location.lng,
  },
});

export const getByLocation = (location: Location): Promise<any> =>
  fetch(getUrl(location))
    .then(res => res.json())
    .then(handleResponse);
