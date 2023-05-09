import './css/styles.css';

import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
import debounce from 'lodash.debounce';

import { fetchCountries } from './fetchCountries';

const baseUrl = `https://restcountries.com/v3.1/name/`;
const filter = `nam, capital, population, flags, languages`;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
  const input = event.target.value.trim();
  if (!input) {
    return;
  }
  fetchCountries(input)
    .then(data => {
      if (data.length > 10) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        return Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        countryInfo.innerHTML = '';

        const listItem = data.map(item => {
          return `<li class="country-item">
      <img src="${item.flags.svg}" width="52">
      <p>${item.name.official}</p>
      </li>`;
        });
        countryList.innerHTML = listItem.join('');
      } else if (data.length === 1) {
        countryList.innerHTML = '';

        const country = `<div class="country-name"><img src="${
          data[0].flags.svg
        }" width="52">
      <h2>${data[0].name.official}</h2></div>
      <ul>
      <li> <span class="country-data">Capital:</span>  ${data[0].capital}</li>
      <li> <span class="country-data">Population:</span> ${
        data[0].population
      }</li>
      <li> <span class="country-data">Languages:</span>  ${Object.values(
        data[0].languages
      ).join(', ')}</li>
      </ul>`;
        countryInfo.innerHTML = country;
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

// function fetchCountries() {
//   return fetch(`${baseUrl}${filter}`)
//     .then(response => response.json())
//     .then(data => console.log(data));
// }

// 'Too many matches found. Please enter a more specific name.';
