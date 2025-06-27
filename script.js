const map = L.map('map', {
  zoomControl: false,
  scrollWheelZoom: false
}).setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

fetch('data.json')
  .then(res => res.json())
  .then(projects => {
    const grouped = {};

    // Group by lat+lng key
    projects.forEach(p => {
      const key = `${p.lat},${p.lng}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(p);
    });

    Object.entries(grouped).forEach(([key, entries]) => {
      const [lat, lng] = key.split(',').map(Number);
      const popupContent = entries.map(p =>
        `<strong>${p["Project Name"]}</strong><br>
        <em>${p["Country of operations"]}</em><br>
        <strong>Type:</strong> ${p.Type}<br>
        <strong>Stage:</strong> ${p["Stage of Food Value Chain"]}<br>
        <strong>Platform:</strong> ${p.Platform}<br>
        <strong>Description:</strong> ${p.Description}<br>
        <a href="${p.Website}" target="_blank">${p.Website}</a><br><hr>`
      ).join('');

      L.marker([lat, lng]).addTo(map).bindPopup(popupContent);
    });
  });
