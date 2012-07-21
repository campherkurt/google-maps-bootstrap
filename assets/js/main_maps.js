$(document).ready(function(){
        //GLOBALS
        var USER_POSITION;
        var DESTINATION_MARKER;

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

        function getRoute() { 
            if (USER_POSITION)  {
                var directionsOptions = {
                    origin: USER_POSITION, 
                    destination: DESTINATION_MARKER,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
                var directionsService = new google.maps.DirectionsService();
                directionsService.route(directionsOptions, function(response, status) {
                   if (status == google.maps.DirectionsStatus.OK) {
                        directionsRender.setDirections(response);
                    };
                });
            };
        }
//------------ This Deals with the user's position----------------------------//
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
        var coordinateArray = [
        {coordinates: new google.maps.LatLng(-33.989976,18.501597), id: "lansdowne", title: "Lansdowne Church", address_details: "Cnr of Leafmore Rd and Kritzinger Rd<br/>Kenwyn<br/>Ps.: Dan Serb<br/>Elder: Nigel Tyhalibongo<br/>xtyhalibongo@uwc.ac.za"},
        {coordinates: new google.maps.LatLng(-34.02669,18.466301), id: "plumstead", title: "Plumstead Church", address_details: "242 Main Road<br/>Plumstead<br/>Ps.: Dan Serb<br/>Elder: Eric Bender<br/>redneb@telkomsa.net"},
        {coordinates: new google.maps.LatLng(-33.950358,18.470487), id: "mowbray", title: "Mowbray Church", address_details: "10 Bollihope Crescent<br/>Mowbray<br/>Ps.: Dan Serb<br/>Head Eldr: Simon Hayes<br/>sdamb@xsinet.co.za"},
        {coordinates: new google.maps.LatLng(-34.010946,18.474093), id: "wynberg", title: "Wynberg Church", address_details: "10 Hertford Road<br/>Wynberg<br/>Ps.: Dan Serb<br/>Elder: R Langenhoven<br/>randall@wescape.co.za"},        
        {coordinates: new google.maps.LatLng(-33.982736,18.463622), id: "claremont", title: "Claremont Church", address_details: "21 Grove Avenue<br/>Claremont<br/>Ps.: Dan Serb<br/>Elder: A Adriaanse<br/>aa@whs.wcape.school.za"},
        {coordinates: new google.maps.LatLng(-34.139261,18.42968), id: "fish-hoek", title: "Fish Hoek Church", address_details: "Recreation Road<br/>Fish Hoek<br/>Ps.: Dan Serb<br/>Elder: Jonathan Edwards<br/>elder@fishhoeksda.co.za"},
        
        {coordinates: new google.maps.LatLng(-33.968575,18.508138), id: "athlone", title: "Athlone Church", address_details: "Buckley Road<br/>Gleemor<br/>Ps.: DG Harwood<br/>Elder: E Gibbons<br/>athlonesda@gmail.com"},
        {coordinates: new google.maps.LatLng(-33.965299,18.52082), id: "riverside", title: "Riverside Church", address_details: "Klipfontein Road<br/>Athlone<br/>Ps.: DG Harwood<br/>Elder: L Truter"},
        
        //{coordinates: new google.maps.LatLng(-33.975041,18.514021), id: "retreat", title: "Retreat Church", address_details: "18 Eleventh Road<br/>Heathfield<br/>Ps.: JE Tumpkin<br/>Elder: Austin Rodney <br/> email: arodney@pgwc.gov.za"},
        {coordinates: new google.maps.LatLng(-34.077916,18.478083), id: "steenberg", title: "Steenberg Church", address_details: "52 Coniston Avenue, Coniston Park<br/>Steenberg<br/>Ps.: JE Tumpkin<br/>Elder: R Stevens<br/>Richards@rensa.co.za"},
        //{coordinates: new google.maps.LatLng(-33.975041,18.514021), id: "ocean-view", title: "Ocean View Church", address_details: "7 Bootes Close<br/>Ocean View <br/>Ps.: JE Tumpkin<br/>Elder: D De Bruin"},
        //{coordinates: new google.maps.LatLng(-33.975041,18.514021), id: "grassy-park", title: "Grassy Park Church", address_details: "Perth Road<br/>Grassy Park<br/>Ps.: JE Tumpkin<br/>Elder: AB Daniels <br/> email: arthur.daniels@capetown.gov.za"},
        ];
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
                                    getRoute()
                                }
                                else {
                                    alert("Sorry but we need your location to plot a route, and your device cannot currently provide it");
                                };
                            })
                        });
            }(ib, newMarker));
        }
});
