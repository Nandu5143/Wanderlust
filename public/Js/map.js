// // Load your access token
// mapboxgl.accessToken = mapToken;

// // Debug log
// console.log("map.js loaded, mapToken:", mapToken);
// console.log("Listing object:", listing);

// // Safety check to prevent Render crash if listing has no geometry
// if (!listing.geometry || !listing.geometry.coordinates) {
//   console.error("⚠️ No geometry found for this listing. Map not initialized.");
//   const mapContainer = document.getElementById("map");
//   if (mapContainer) {
//     mapContainer.innerHTML = "<p style='color:red;'>Map not available for this listing</p>";
//     mapContainer.style.border = "1px dashed red";
//     mapContainer.style.height = "150px";
//   }
// } else {
//   // Initialize map safely
//   const map = new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/mapbox/streets-v12",
//     center: listing.geometry.coordinates, // [lng, lat]
//     zoom: 9,
//   });

//   //  Add marker with popup
//   new mapboxgl.Marker({ color: "red" })
//     .setLngLat(listing.geometry.coordinates)
//     .setPopup(
//       new mapboxgl.Popup({ offset: 30 }).setHTML(
//         `<h4>${listing.title}</h4><p>Exact location provided after booking</p>`
//       )
//     )
//     .addTo(map);

//   //  Optional: Add navigation controls (for zooming, rotating)
//   map.addControl(new mapboxgl.NavigationControl());
// }















 mapboxgl.accessToken = mapToken;
    console.log("map.js loaded, mapToken:", mapToken);
    // Safety check: only initialize the map if geometry is present
    if (!listing || !listing.geometry || !listing.geometry.coordinates) {
      console.warn("No geometry found for this listing. Map not initialized.");
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        mapContainer.innerHTML = "<p style='color:#555;'>Map not available for this listing</p>";
        mapContainer.style.border = "1px dashed #ccc";
        mapContainer.style.height = "150px";
      }
    } else {
      const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v12',
          center: listing.geometry.coordinates,
          zoom: 9
      });

      new mapboxgl.Marker({color : 'red'})
        .setLngLat(listing.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({offset: 30})
            .setHTML(`<h4>${listing.title}</h4><p>Exact location provided after booking</p>`)
        )
        .addTo(map);

      map.addControl(new mapboxgl.NavigationControl());
    }









    //  map.on('load', () => {
    //     // Load an image from an external URL.
    //     map.loadImage(
    //         'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
    //         (error, image) => {
    //             if (error) throw error;

    //             // Add the image to the map style.
    //             map.addImage('cat', image);

    //             // Add a data source containing one point feature.
    //             map.addSource('point', {
    //                 'type': 'geojson',
    //                 'data': {
    //                     'type': 'FeatureCollection',
    //                     'features': [
    //                         {
    //                             'type': 'Feature',
    //                             'geometry': {
    //                                 'type': 'Point',
    //                                 'coordinates':listing.geometry.coordinates,
    //                             }
    //                         }
    //                     ]
    //                 }
    //             });

    //             // Add a layer to use the image to represent the data.
    //             map.addLayer({
    //                 'id': 'points',
    //                 'type': 'symbol',
    //                 'source': 'point', // reference the data source
    //                 'layout': {
    //                     'icon-image': 'cat', // reference the image
    //                     'icon-size': 0.25
    //                 }
    //             });
    //         }
    //     );
    // });