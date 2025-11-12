document.getElementById('convertBtn').addEventListener('click', async () => {
  const value = document.getElementById('inputValue').value.trim();
  if (!value) {
    document.getElementById('resultLabel').innerText = 'Please enter a value';
    return;
  }

  const response = await fetch(`/api/convert?s=${encodeURIComponent(value)}`);
  const data = await response.json();
  document.getElementById('resultLabel').innerText = data.result || 'Error';
});
