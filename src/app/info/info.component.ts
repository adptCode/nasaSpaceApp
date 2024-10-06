import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'], // Corregido 'styleUrl' a 'styleUrls'
})
export class InfoComponent {
  map!: mapboxgl.Map;

  // Datos ficticios de emisiones de CO2
  pollutionData = [
    { country: 'China', lat: 35.8617, lon: 104.1954, emissions: 16.65 },
    { country: 'EE. UU.', lat: 37.0902, lon: -95.7129, emissions: 15.52 },
    { country: 'India', lat: 20.5937, lon: 78.9629, emissions: 18.56 },
    { country: 'Rusia', lat: 61.524, lon: 105.3188, emissions: 12.0 },
    { country: 'Alemania', lat: 51.1657, lon: 10.4515, emissions: 8.92 },
  ];
  popupContent: string | null = null;
  constructor() {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    // Inicializar el mapa
    mapboxgl.accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 20],
      zoom: 3,
      scrollZoom: false, // Desactivar el zoom al hacer scroll
    });

    this.map.on('load', () => {
      this.loadPollutionData();
      this.removeAttributionControl();
    });
  }

  removeAttributionControl() {
    const attributionControl = document.querySelector('.mapboxgl-ctrl-attrib');
    if (attributionControl) {
      attributionControl.remove(); // Eliminar el control de atributos
    }
  }
  loadPollutionData() {
    // Agregar los datos de contaminación como un Source
    this.map.addSource('pollution-data', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: this.pollutionData.map((item) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [item.lon, item.lat],
          },
          properties: {
            country: item.country,
            emissions: item.emissions,
          },
        })),
      },
    });

    // Agregar una capa para visualizar los puntos
    this.map.addLayer({
      id: 'pollution-points',
      type: 'circle',
      source: 'pollution-data',
      paint: {
        'circle-radius': ['get', 'emissions'], // Radio basado en las emisiones
        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'emissions'],
          0,
          '#198754',
          6,
          '#FFFF00',
          15,
          '#FF0000',
        ],
        'circle-opacity': 0.6,
      },
    });

    this.map.on('click', 'pollution-points', (e) => {
      if (e.features && e.features.length > 0) {
        const feature = e.features[0];

        // Verificar que la geometría es de tipo 'Point' y que 'properties' no es null o undefined
        if (feature.geometry.type === 'Point' && feature.properties) {
          // Asegúrate de que coordinates tiene exactamente dos elementos
          const coordinates = feature.geometry.coordinates as [number, number]; // Casting a un arreglo de 2 elementos

          // Acceder a 'emissions' usando notación de corchetes
          const emissions = feature.properties['emissions'];
          const country = feature.properties['country'];

          new mapboxgl.Popup({  offset: 25 })
            .setLngLat(coordinates)
            .setHTML(
              `<strong>${country}</strong><br>CO2 emissions: ${emissions} tons per capita.`
            )
            .addTo(this.map);
            
        }
      }
    });
  }
}
