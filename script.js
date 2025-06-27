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
    projects.forEach(p => {
      const marker = L.marker([p.lat, p.lng]).addTo(map);
      marker.bindPopup(`<strong>${p.name}</strong><br><em>${p.country}</em><br>${p.description}`);
    });
  });
