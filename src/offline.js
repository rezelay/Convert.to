function showConnectivityStatus() {
  let isOnline = navigator.onLine;
  const statusSec = document.getElementById("onlineHeading");

  if (!isOnline) {
    statusSec.textContent = "You're currently offline.";
  }

  window.addEventListener("online", () => {
    statusSec.textContent = "Your internet conection was restored.";
    const currentValue = conversionTypeInput.value;
    if (currentValue === 'currencies') {
      conversionTypeInput.dispatchEvent(new Event('change', { bubbles: true }))
    }
    setTimeout(() => statusSec.textContent = "", 10000);
    isOnline = true;
  });

  window.addEventListener("offline", () => {
    statusSec.textContent = "You're currently offline.";
    isOnline = false;
  });
}