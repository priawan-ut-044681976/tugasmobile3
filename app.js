const API_URL = 'https://api.coinlore.net/api/tickers/';

const statusChip = document.getElementById('status-chip');
const statusLabel = statusChip?.querySelector('ion-label');
const tickerList = document.getElementById('ticker-list');
const refresher = document.getElementById('refresher');

async function fetchTickers() {
  updateStatus('Loading...', 'status-ok');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    renderTickers(payload?.data ?? []);
    updateStatus('Updated', 'status-ok');
  } catch (error) {
    console.error('Failed to fetch tickers', error);
    renderError(error);
    updateStatus('Error', 'status-error');
  } finally {
    if (refresher) {
      refresher.complete();
    }
  }
}

function renderTickers(data) {
  if (!Array.isArray(data) || data.length === 0) {
    renderError(new Error('No data available'));
    return;
  }

  tickerList.innerHTML = '';
  data.forEach((item) => {
    const ionItem = document.createElement('ion-item');
    ionItem.button = true;
    ionItem.lines = 'full';

    const label = document.createElement('ion-label');
    label.innerHTML = `
      <h2>#${item.rank} · ${item.name} (${item.symbol})</h2>
      <p>Rank: ${item.rank}</p>
    `;

    const price = document.createElement('ion-note');
    price.slot = 'end';
    price.classList.add('price');
    price.textContent = `$${Number(item.price_usd).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    ionItem.appendChild(label);
    ionItem.appendChild(price);
    ionItem.addEventListener('click', () => presentToast(item));
    tickerList.appendChild(ionItem);
  });
}

function renderError(error) {
  tickerList.innerHTML = '';
  const row = document.createElement('ion-item');
  row.lines = 'none';
  row.classList.add('empty-row');
  const label = document.createElement('ion-label');
  label.textContent = error.message || 'Failed to load data';
  row.appendChild(label);
  tickerList.appendChild(row);
}

function updateStatus(text, statusClass) {
  if (!statusChip || !statusLabel) return;
  statusChip.classList.remove('status-ok', 'status-error');
  statusChip.classList.add(statusClass);
  statusLabel.textContent = text;
}

async function presentToast(item) {
  const toast = Object.assign(document.createElement('ion-toast'), {
    message: `${item.name} (${item.symbol}) is at $${Number(item.price_usd).toLocaleString()}`,
    duration: 2000,
    position: 'bottom',
    color: 'dark',
  });
  document.body.appendChild(toast);
  await toast.present();
}

if (refresher) {
  refresher.addEventListener('ionRefresh', fetchTickers);
}

fetchTickers();
