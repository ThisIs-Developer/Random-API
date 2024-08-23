document.addEventListener('DOMContentLoaded', () => {
  fetchLaunchData();
  setupFilters();
  setInitialTheme();
});

let allLaunches = [];

function fetchLaunchData() {
  const url = 'https://api.spacexdata.com/v4/launches';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      allLaunches = data;
      displayLaunchData(data);
      populateYearFilter(data);
    })
    .catch(error => console.error('Error fetching launch data:', error));
}

function fetchRocketData(rocketId) {
  const url = `https://api.spacexdata.com/v4/rockets/${rocketId}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => 'Unknown');
}

function fetchLaunchpadData(launchpadId) {
  const url = `https://api.spacexdata.com/v4/launchpads/${launchpadId}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => 'Unknown');
}

function fetchPayloadData(payloadId) {
  const url = `https://api.spacexdata.com/v4/payloads/${payloadId}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => 'Unknown');
}

async function displayLaunchData(launches) {
  const container = document.getElementById('launches-container');
  container.innerHTML = '';

  for (const launch of launches) {
    const rocket = await fetchRocketData(launch.rocket);
    const launchpad = await fetchLaunchpadData(launch.launchpad);
    const payloadDetails = await Promise.all(launch.payloads.map(payloadId => fetchPayloadData(payloadId)));
    const successClass = launch.success ? 'success' : 'failure';

    const launchCard = document.createElement('div');
    launchCard.classList.add('launch-card');

    const payloadInfo = payloadDetails.map(payload => `<p><strong>Payload:</strong> ${payload.name} (${payload.type})</p>`).join('');
    const launchImage = launch.links.patch.small ? `<img src="${launch.links.patch.small}" alt="${launch.name}">` : '';
    const launchDetails = `
      <h2>${launch.name}</h2>
      <p><strong>Date:</strong> ${new Date(launch.date_utc).toLocaleDateString()}</p>
      <p><strong>Rocket:</strong> ${rocket.name}</p>
      <p><strong>Launch Site:</strong> ${launchpad.name}</p>
      <p><strong>Launchpad Details:</strong> ${launchpad.details}</p>
      ${payloadInfo}
      <p><strong>Details:</strong> ${launch.details ? launch.details : 'No details available'}</p>
      ${launch.links.webcast ? `<a href="${launch.links.webcast}" target="_blank">Watch Video</a>` : ''}
      <p class="${successClass}"><strong>Status:</strong> ${launch.success ? 'Success' : 'Failure'}</p>
    `;

    launchCard.innerHTML = launchImage + launchDetails;
    container.appendChild(launchCard);
  }
}

function setupFilters() {
  const searchBar = document.getElementById('search-bar');
  const yearFilter = document.getElementById('year-filter');

  searchBar.addEventListener('input', filterLaunches);
  yearFilter.addEventListener('change', filterLaunches);
}

function populateYearFilter(launches) {
  const yearFilter = document.getElementById('year-filter');
  const years = new Set(launches.map(launch => new Date(launch.date_utc).getFullYear()));

  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });
}

function filterLaunches() {
  const searchBarValue = document.getElementById('search-bar').value.toLowerCase();
  const yearFilterValue = document.getElementById('year-filter').value;

  const filteredLaunches = allLaunches.filter(launch => {
    const matchesSearch = launch.name.toLowerCase().includes(searchBarValue);
    const matchesYear = yearFilterValue === '' || new Date(launch.date_utc).getFullYear().toString() === yearFilterValue;
    return matchesSearch && matchesYear;
  });

  displayLaunchData(filteredLaunches);
}

function setInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeSwitch = document.getElementById('theme-switch');

  if (savedTheme === 'light') {
    document.body.classList.add('light');
    themeSwitch.checked = false;
  } else if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeSwitch.checked = true;
  } else {
    if (prefersDark) {
      document.body.classList.add('dark');
      themeSwitch.checked = true;
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light');
      themeSwitch.checked = false;
      localStorage.setItem('theme', 'light');
    }
  }
}

function changeTheme() {
  const themeSwitch = document.getElementById('theme-switch');
  const theme = themeSwitch.checked ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  document.body.className = theme;
}
