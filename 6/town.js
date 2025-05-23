const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];
fetch(endpoint)//obține fișierul JSON
  .then(blob => blob.json())//transformă răspunsul în obiect JSON
  .then(data => cities.push(...data));//adaugă toate orașele în array-ul cities

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');//Creează un RegExp (expresie regulată) care ignoră literele mari/mici (gi)
    return place.city.match(regex) || place.state.match(regex)
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');//Adaugă virgule în numere mari pentru lizibilitate
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    //Flag-urile:g = global (caută toate aparițiile),i = insensibil la majuscule/minuscule.
    //Evidențiază textul potrivit în rezultat
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    //Creează un array cu rezultatele potrivite și le transformă în HTML
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');// combină toate fragmentele într-un singur șir de caractere HTML
  suggestions.innerHTML = html;//Inserează acest HTML în pagină pentru a afișa rezultatele
}
//Selectează elementul HTML care are clasa search – în mod obișnuit, un <input> de tip text
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
/*Adaugă un "event listener" pentru evenimentul change.
change se declanșează când utilizatorul termină de tastat și pierde focusul de pe câmpul de input (ex: apasă Tab sau face click în altă parte).
Atunci, se apelează funcția displayMatches()*/
searchInput.addEventListener('keyup', displayMatches);