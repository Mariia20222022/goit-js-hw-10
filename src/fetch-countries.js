import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://restcountries.com/v3.1/name';

function fetchCountries(name) {
  const searchCountry = 'name,capital,population,flags,languages';
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=${searchCountry}`
  ).then(response => {
    if (!response.ok) {
      // throw new Error(response.status);
      return Notify.failure('Oops, there is no country with that name');
    }
    return response.json();
  });
}

export { fetchCountries };
