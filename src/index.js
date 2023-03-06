import './css/styles.css';
import { fetchCountries } from './fetch-countries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const input = document.getElementById(`search-box`);
const countryList = document.querySelector(`.country-list`);
console.log(countryList);
const countryInfo = document.querySelector(`.country-info`);
console.log(countryInfo);

function cleanUp(el) {
  el.innerHTML = ``;
}

input.addEventListener(`input`, debounce(onInputChange, DEBOUNCE_DELAY));
function onInputChange(event) {
  event.preventDefault();

  const nameCountry = event.target.value.trim();
  if (!nameCountry) {
    cleanUp(countryInfo);

    cleanUp(countryList);
    return;
  }

  fetchCountries(nameCountry)
    .then(response => {
      if (response.length > 10) {
        return Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
      }
      if (response.length > 1 && response.length <= 10) {
        cleanUp(countryInfo);
        cleanUp(countryList);
        renderCountryList(response);
      }
      if (response.length === 1) {
        cleanUp(countryList);
        renderCountry(response);
      }
    })
    .catch(error => {
      cleanUp(countryInfo);
      cleanUp(countryList);
    });

  function renderCountryList(response) {
    const markup = response
      .map(country => {
        return `
          <li class="country-item">
          <img src="${country.flags.svg}" alt="${country.name.official}" width="30" height="30"/>
            <p> ${country.name.official}</p>

          </li>
      `;
      })
      .join('');
    countryList.innerHTML = markup;
  }
}

function renderCountry(response) {
  const countryMarkup = response
    .map(country => {
      return `<div class="img-wrapper">
        <img src="${country.flags.svg}" alt="${
        country.name.official
      }" width="30" height="30"/>
         <h2 class="country-title"> ${country.name.official}</h2></div>
          <p class="description"><span class="subdescription">Capital:</span> ${
            country.capital
          }</p>
           <p class="description"><span class="subdescription">Population:</span> ${
             country.population
           }</p>
            <p class="description"><span class="subdescription">Languages: </span>${Object.values(
              country.languages
            ).join(',')}</p>
         `;
    })
    .join(``);
  countryInfo.innerHTML = countryMarkup;
}
