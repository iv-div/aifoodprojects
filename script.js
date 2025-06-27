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
        `<strong>${p.name}</strong><br>
         <em>${p.country}</em><br>
         <strong>Type:</strong> ${p.type}<br>
         <strong>Stage:</strong> ${p.stage}<br>
         <strong>Platform:</strong> ${p.platform}<br>
         <strong>Description:</strong> ${p.description}<br>
         ${p.website ? `<a href="${p.website}" target="_blank">${p.website}</a>` : ""}<br><hr>`
      ).join('');

      L.marker([lat, lng]).addTo(map).bindPopup(popupContent);
    });
  });
