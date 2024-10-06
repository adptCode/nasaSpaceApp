import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import mapboxgl from 'mapbox-gl';
import { RouterModule } from '@angular/router';
import { DatosNasaService } from '../services/datos-nasa.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'], // Corregido 'styleUrl' a 'styleUrls'
})
export class InfoComponent {
  map!: mapboxgl.Map;

  // Datos ficticios de emisiones de CO2
  pollutionData = [
    {  lat: 35.8617, lon: 104.1954, emissions: 16.65 },
    {  lat: 37.0902, lon: -95.7129, emissions: 15.52 },
    { lat: 20.5937, lon: 78.9629, emissions: 13.59 },
    {  lat: 61.524, lon: 105.3188, emissions: 12.0 },
    {  lat: 51.1657, lon: 10.4515, emissions: 6.92 },
    {  lat: 40.4637, lon: -3.7492, emissions: 9.2 }, 
  ];
  
  popupContent: string | null = null;
 datosBack:any
  constructor(private datosNasaService: DatosNasaService) {}

  ngOnInit(): void {
    this.initializeMap();
    this.datosNasaService.getData().subscribe(
      (data) => {
        this.datosBack = data;
        console.log(this.datosBack);
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );

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
        'circle-radius': 10, // Establecer un radio fijo para todos los círculos
        'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'emissions'],
          0, '#1b5e20',  // Verde oscuro para 0 emisiones
          3, '#4CAF50',   // Verde medio para emisiones bajas
          6, '#FFFF00',   // Amarillo para emisiones moderadas
          9, '#FF9800',   // Naranja para emisiones más altas
          12, '#FF5722',  // Naranja más oscuro para emisiones altas
          15, '#FF0000',  // Rojo para emisiones muy altas
        ],
        'circle-opacity': 1, // Hacer que los círculos sean completamente opacos
      },
    });

   
  }
}
