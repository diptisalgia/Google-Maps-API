var myMaps = {

	Init : function() {
		var me = myMaps;
		me.GetLocation();
		me.BindEvents();

	},

	BindEvents : function() {
		var me = myMaps;
		$("#search_button").off("click");
		$("#search_button").on(
				"click",
				function() {
					me.GetGeoCodeForAddress($("#source").val(), $(
							"#destination").val());

				});
	},

	GetLocation : function() {
		var me = myMaps;

		var geolocation = navigator.geolocation;
		geolocation.getCurrentPosition(function(position) {
			me.InitializeMaps(position.coords.latitude,
					position.coords.longitude);
		});

		var places = [];
		places[0] = new google.maps.places.Autocomplete($("#source")[0]);
		places[1] = new google.maps.places.Autocomplete($("#destination")[0]);
		google.maps.event.addListener(places, "place_changed", function() {
			var place = places.getPlace();
			var address = places.formatted_address;
			latitude = place.geometry.location.lat();
			longitude = place.geometry.location.lng();
			console.log(latitude + " " + longitude);
		});
	},

	GetGeoCodeForAddress : function(source, destination) {
		var me = myMaps;

		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({address : source}, function(result, status) {

			if (status == google.maps.GeocoderStatus.OK) {

				var lat = result[0].geometry.location.lat();
				var lng = result[0].geometry.location.lng();
				me.InitializeMaps(lat, lng);
			} else {
				alert('Geocode was not successful for the following reason: '
						+ status);
			}
		});
	},

	InitializeMaps : function(Latitude, Longitude) {
		var me = myMaps;

		console.log(Latitude, Longitude);
		var mapOptions = {
			center : new google.maps.LatLng(Latitude, Longitude),
			zoom : 8
		}

		var map = new google.maps.Map($("#map")[0], mapOptions);

		//The google.maps.Marker constructor takes a single Marker options object literal, specifying the initial properties of the marker
		var marker = new google.maps.Marker({
			position : mapOptions.center,
			map : map
		});
	}
}

$(function() {
	myMaps.Init();
});
/*var myMaps = {

	map : null,

	marker : null,

	Init : function() {
		var me = myMaps;
		me.InitializeMaps(22.7196, 75.8577);
		me.BindEvents();

	},

	BindEvents : function() {
		var me = myMaps;
		$("#search_button").off("click");
		$("#search_button").on("click",
				 function() {
					me.showDirections($("#source").val().trim(), $(
							"#destination").val().trim());

				});

		$("#getCurrentLoc").off("click");
		$("#getCurrentLoc").on("click",function(){
			me.GetLocation();
		});

		$("#currentLocInSource").off("click");
		$("#currentLocInSource").on("click",function(){

		});
	},

	GetLocation : function() {
		var me = myMaps;
console.log("HI");
		var geolocation = navigator.geolocation;
		geolocation.getCurrentPosition(function(position) {
			me.InitializeMaps(position.coords.latitude,
					position.coords.longitude);

		});
	},

	showDirections : function(source, destination) {
		var me = myMaps;

		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer();

		var directionsRequest = {
			origin : source,
			destination : destination,
			travelMode : google.maps.DirectionsTravelMode.DRIVING,
			unitSystem : google.maps.UnitSystem.METRIC
		};

		directionsService.route(directionsRequest, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				me.marker.setMap(null);
				directionsDisplay.setMap(me.map);
				directionsDisplay.setDirections(response);
			} else
				alert("Unable to retrieve your route<br />");
		});

		$("div#rightPanel").empty();
		directionsDisplay.setPanel($("#rightPanel")[0]);

	},

	InitializeMaps : function(Latitude, Longitude) {
		var me = myMaps;
		console.log(Latitude, Longitude);
		var mapOptions = {
			center : new google.maps.LatLng(Latitude,Longitude),
			zoom : 8
		};

		me.map = new google.maps.Map($("#map")[0], mapOptions);
		me.PlaceMarker(mapOptions, me.map);

		new google.maps.places.Autocomplete($("#source")[0]).bindTo('bounds',
				me.map);
		new google.maps.places.Autocomplete($("#destination")[0]).bindTo(
				'bounds', me.map);

	},

	PlaceMarker : function(mapOptions, map) {
		var me = myMaps;

		//The google.maps.Marker constructor takes a single Marker options object literal, specifying the initial properties of the marker
		me.marker = new google.maps.Marker({
			position : mapOptions.center,
			map : map
		});
	}
}

$(function() {
	myMaps.Init();
});
*/
