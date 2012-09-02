$(document).ready(function(){

//---------------- MAP Options-------------------------------------//
        var styleArray = [
            {
              featureType: "all",
              stylers: [
                { saturation: -80 }
              ]
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
                { hue: "#00ffee" },
                { saturation: 50 }
              ]
            },
            {
              featureType: "poi.business",
              elementType: "labels",
              stylers: [
                { visibility: "off" }
              ]
            }
          ];
        var zoomOptions = {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_CENTER
            };
        var myOptions = {
          center: new google.maps.LatLng(-33.984123, 18.50895),
          zoom: 12,
          zoomControlOptions: zoomOptions,
          streetViewControl: false,
          panControl: false,
          styles: styleArray,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false
        };
        var mapChurch = new google.maps.Map(document.getElementById("example"), myOptions);

        var directionsRenderOptions = {
            suppressMarkers: true,
            preserveViewport: false
        }
        var directionsRender = new google.maps.DirectionsRenderer(directionsRenderOptions);
        directionsRender.setMap(mapChurch);
//--------------- END OF MAP OPTIONS--------------------------------//

//--------------- Actual Route Function ----------------------------//
        function getRoute(markerObject, infoBoxObject) { 
            if (USER_POSITION)  {
                var directionsOptions = {
                    origin: USER_POSITION, 
                    destination: markerObject.getPosition(),
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                var directionsService = new google.maps.DirectionsService();
                directionsService.route(directionsOptions, function(response, status) {
                   if (status == google.maps.DirectionsStatus.OK) {
                        directionsRender.setDirections(response);
                    };
                });
                infoBoxObject.close()
            };
        }
//------------ User's position Marker----------------------------//
        function showPosition(position)
            {
                var userMarkerAnimation = google.maps.Animation.DROP;
                var userMarkerImage =  new google.maps.MarkerImage("assets/img/down.png");
                var userMarkerOptions = {
                    animation: userMarkerAnimation,
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    icon: userMarkerImage,
                    map: mapChurch
                };
                USER_POSITION = userMarkerOptions.position;
                var userMarker = new google.maps.Marker(userMarkerOptions);
                var userBoxText = '<div class="info_box"><div class="church_name info_details">You Are Here!!!</div><div class="church_details info_details"></div></div>';
                var userInfoOptions = {
                    content: userBoxText
                   ,disableAutoPan: false
                   ,maxWidth: 0
                   ,pixelOffset: new google.maps.Size(0, -100)
                   ,zIndex: null
                   ,boxStyle: { opacity: 0.9 ,width: "280px"}
                   ,closeBoxMargin: ""
                   ,closeBoxURL: ""
                   ,infoBoxClearance: new google.maps.Size(1, 1)
                   ,isHidden: false
                   ,pane: "floatPane"
                   ,enableEventPropagation: true
                };
                var userInfoBox = new InfoBox(userInfoOptions);
                
                (function(marker){
                    google.maps.event.addListener(marker, "mouseover", function(e) {
                        userInfoBox.open(mapChurch, marker);
                    });
                    google.maps.event.addListener(marker, "mouseout", function(e) {
                        userInfoBox.close();
                    });
                })(userMarker);
            };

            function positionError(error) {
                switch(error.code) 
                    {
                        case error.TIMEOUT:
                            alert ('Timeout');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert ('Position unavailable');
                            break;
                        case error.PERMISSION_DENIED:
                            alert ('Permission denied');
                            break;
                        case error.UNKNOWN_ERROR:
                            alert ('Unknown error');
                            break;
                    }
            };
//---------------------- Does the actual work to get the user position-------//
            navigator.geolocation.getCurrentPosition(showPosition, function(error){
                alert("got an error" + error);
                positionError(error)
                });
//------------MARKER OPTIONS--------------------//
            var markerImage = new google.maps.MarkerImage("assets/img/conference.png");
            var markerAnimation = google.maps.Animation.DROP

//------------SUPER STYLED INFO BOX-------------//
        var infoOptions = {
                content: 'holding...'
               ,disableAutoPan: false
               ,maxWidth: 0
               ,pixelOffset: new google.maps.Size(15, -170)
               ,zIndex: null
               ,boxStyle: { opacity: 0.9 ,width: "185px"}
               ,closeBoxMargin: "8px 15px 0px 2px"
               ,closeBoxURL: "assets/img/closebutton-th.png"
               ,infoBoxClearance: new google.maps.Size(1, 1)
               ,isHidden: false
               ,pane: "floatPane"
               ,enableEventPropagation: false
            };
        var ib = new InfoBox(infoOptions);
/*-------------------- START THE LOOP THAT BUILDS THE MARKERS-----------------*/
        for(var i in coordinateArray ) {
            var id = coordinateArray[i]['id'];
            var title = coordinateArray[i]['title'];
            var position = coordinateArray[i]['coordinates'];
            var address_details = coordinateArray[i]['address_details'];

            var boxText = [
                        '<div class="info_box">',
                            '<div class="church_name info_details">' + title + '</div>',
                            '<div class="church_details info_details">' + address_details + '</div>',
                            '<div class="info_details button_box">',
                                '<input type="hidden" id="' + id + '_lat_"' + position.lat() + '></input>',
                                '<input type="hidden" id="' + id + '_long_"' + position.lng() + '></input>',
                                '<a href="#" id="' + id + '" class="btn find_route_button">Find a Route</a>',
                            '</div>',
                        '</div>'
                        ].join(" ");

            var markerOptions = {
                animation: markerAnimation,
                position: coordinateArray[i]['coordinates'],
                icon: markerImage,
                map: mapChurch,
                html: boxText,
                id: id
            };

            var newMarker = new google.maps.Marker(markerOptions);

//-------------- Creating a closure to retain the correct markerInfoOptions -------------------//
            (function(marker) {
                // Attaching a mouseover event to the current marker
                ALL_MARKERS.push(marker);
                google.maps.event.addListener(marker, "click", function(e) {
                    ib.setContent(marker.html); 
                    ib.open(mapChurch, marker);
                });
                
            })(newMarker);
            
    /*-------------Add a click listener for the Route Builder ---------------------------*/
            (function(infoBoxObject, markerObject) {
                        google.maps.event.addListener(infoBoxObject, "domready", function() {
                            $("#" + markerObject.id).click(function(){
                                DESTINATION_MARKER = markerObject.getPosition()
                                //alert(DESTINATION_MARKER);
                                if (USER_POSITION != null){
                                    getRoute(markerObject, infoBoxObject);
                                    
                                }
                                else {
                                    alert("Sorry but we need your location to plot a route, and your device cannot currently provide it");
                                };
                            })
                        });
            }(ib, newMarker));
        }
});
