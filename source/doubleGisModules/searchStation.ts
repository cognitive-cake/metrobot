import geoAPI from '../geoAPI/geoAPI';
import ru from '../locales/ru';
import httpsPromised from '../utils/httpsPromised';
import log from '../utils/log';

export default function searchStation(queryString: string): Promise<string> {
  const augmentedQueryString = ru.augmentedQueryString(queryString);
  const queryUrl = geoAPI.getDoubleGisSearchUrl(augmentedQueryString);

  return httpsPromised.get(queryUrl)
    .then(handleAPIError)
    .then(data => Promise.resolve(data.result[0].id));
}

function handleAPIError(data: any) {
  if (data.response_code !== '200') {
    return Promise.reject(new Error(`${data.response_code} API error: ${data.error_message}`));
  }
  return Promise.resolve(data);
}
