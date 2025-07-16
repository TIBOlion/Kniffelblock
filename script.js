let wakeLock = null;

const lockButton = document.getElementById('lockButton');
const statusText = document.getElementById('status');

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      statusText.textContent = 'Status: Aktiv';
      lockButton.textContent = 'Kniffelock deaktivieren';
      console.log('Kniffelock aktiviert.');
      
      wakeLock.addEventListener('release', () => {
        console.log('Kniffelock wurde deaktiviert.');
        statusText.textContent = 'Status: Inaktiv';
        lockButton.textContent = 'Kniffelock aktivieren';
      });
    } else {
      alert('Wake Lock API wird von deinem Browser nicht unterstützt.');
    }
  } catch (err) {
    console.error(`Fehler beim Aktivieren des Kniffelocks: ${err.message}`);
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
    statusText.textContent = 'Status: Inaktiv';
    lockButton.textContent = 'Kniffelock aktivieren';
  }
}

lockButton.addEventListener('click', () => {
  if (wakeLock) {
    releaseWakeLock();
  } else {
    requestWakeLock();
  }
});
