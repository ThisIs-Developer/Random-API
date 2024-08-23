document.addEventListener('DOMContentLoaded', () => {
    fetchCryptoData();
    setupFilters();
    setInitialTheme();
  });
  
  let allCryptos = [];
  
  function fetchCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        allCryptos = data;
        displayCryptoData(data);
      })
      .catch(error => console.error('Error fetching crypto data:', error));
  }
  
  function displayCryptoData(cryptos) {
    const tbody = document.querySelector('#crypto-table tbody');
    tbody.innerHTML = '';
  
    cryptos.forEach(crypto => {
      const row = document.createElement('tr');
  
      const rankCell = document.createElement('td');
      rankCell.textContent = crypto.market_cap_rank;
      row.appendChild(rankCell);
  
      const coinCell = document.createElement('td');
      const coinDetails = document.createElement('div');
      coinDetails.classList.add('coin-details');
      const coinImg = document.createElement('img');
      coinImg.src = crypto.image;
      coinImg.alt = crypto.name;
      const coinName = document.createElement('span');
      coinName.innerHTML = `<strong>${crypto.name}</strong> (${crypto.symbol.toUpperCase()})`;
      coinDetails.appendChild(coinImg);
      coinDetails.appendChild(coinName);
      coinCell.appendChild(coinDetails);
      row.appendChild(coinCell);
  
      const priceCell = document.createElement('td');
      priceCell.textContent = `$${crypto.current_price.toLocaleString()}`;
      row.appendChild(priceCell);
  
      const hourChangeCell = document.createElement('td');
      hourChangeCell.innerHTML = formatPriceChange(crypto.price_change_percentage_1h_in_currency);
      row.appendChild(hourChangeCell);
  
      const dayChangeCell = document.createElement('td');
      dayChangeCell.innerHTML = formatPriceChange(crypto.price_change_percentage_24h);
      row.appendChild(dayChangeCell);
  
      const weekChangeCell = document.createElement('td');
      weekChangeCell.innerHTML = formatPriceChange(crypto.price_change_percentage_7d_in_currency);
      row.appendChild(weekChangeCell);
  
      const volumeCell = document.createElement('td');
      volumeCell.textContent = `$${crypto.total_volume.toLocaleString()}`;
      row.appendChild(volumeCell);
  
      const marketCapCell = document.createElement('td');
      marketCapCell.textContent = `$${crypto.market_cap.toLocaleString()}`;
      row.appendChild(marketCapCell);
  
      const buyCell = document.createElement('td');
      const buyButton = document.createElement('a');
      buyButton.classList.add('buy-button');
      buyButton.href = `https://www.coingecko.com/en/coins/${crypto.id}`;
      buyButton.target = '_blank';
      buyButton.textContent = 'Buy';
      buyCell.appendChild(buyButton);
      row.appendChild(buyCell);
  
      tbody.appendChild(row);
    });
  }
  
  function formatPriceChange(change) {
    if (change === null || change === undefined) {
      return '<span>0.00%</span>';
    }
    const isPositive = change >= 0;
    const arrow = isPositive ? 'trending_up' : 'trending_down';
    const className = isPositive ? 'positive' : 'negative';
    return `<span class="price-change ${className}">${change.toFixed(2)}%<span class="material-symbols-outlined">${arrow}</span></span>`;
  }
  
  function setupFilters() {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', filterCryptos);
  }
  
  function filterCryptos() {
    const searchBarValue = document.getElementById('search-bar').value.toLowerCase();
  
    const filteredCryptos = allCryptos.filter(crypto => {
      return crypto.name.toLowerCase().includes(searchBarValue) || crypto.symbol.toLowerCase().includes(searchBarValue);
    });
  
    displayCryptoData(filteredCryptos);
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
  