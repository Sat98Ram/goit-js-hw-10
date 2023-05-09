import Notiflix from 'notiflix';

const baseUrl = `https://restcountries.com/v3.1/name/`;
const filter = `?name,capital,population,flags,languages`;

export function fetchCountries(input) {
  return fetch(`${baseUrl}${input}${filter}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// const searchBox = document.querySelector('#search-box');

// export function fetchCountries(filter) {
//   return fetch(`${baseUrl}&{searchQuerry}?fields=${filter}`)
//     .then(response => response.json())
//     .then(data => data.map(el => console.log(el)));
