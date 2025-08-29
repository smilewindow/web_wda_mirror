async function setup() {
  const res = await fetch('/config');
  const { mjpegUrl } = await res.json();
  const img = document.getElementById('screen');
  img.src = mjpegUrl;

  let naturalWidth = 0;
  let naturalHeight = 0;
  img.addEventListener('load', () => {
    naturalWidth = img.naturalWidth;
    naturalHeight = img.naturalHeight;
  });

  img.addEventListener('click', async (e) => {
    if (!naturalWidth || !naturalHeight) return;
    const rect = img.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (naturalWidth / rect.width);
    const y = (e.clientY - rect.top) * (naturalHeight / rect.height);
    try {
      await fetch('/tap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ x, y })
      });
    } catch (err) {
      console.error('Tap failed', err);
    }
  });
}

setup();
