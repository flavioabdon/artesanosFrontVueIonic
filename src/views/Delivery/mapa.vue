<template>
    <div style="width: 100%; height: 400px;">
      <div id="map" style="width: 100%; height: 100%;"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      direccion: {
        type: String,
        required: true,
      },
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        const [lng, lat] = this.direccion.split(',').map(Number);
  
        // Crear el mapa usando Leaflet u otro framework de mapas
        const map = L.map('map').setView([lat, lng], 13);
  
        // Cargar las tiles (por ejemplo, OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);
  
        // Agregar un marcador para la dirección
        L.marker([lat, lng]).addTo(map).bindPopup('Destino').openPopup();
      },
    },
  };
  </script>
  
  <style>
  /* Asegúrate de incluir estilos necesarios para que el mapa funcione */
  #map {
    width: 100%;
    height: 100%;
  }
  </style>
  