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
					me.showDirections($("#source").val(), $(
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
	},

	showDirections : function(source, destination) {
		var me = myMaps;

		var directionsService = new google.maps.DirectionsService();

		var directionsRequest = {
			origin : source,
			destination : destination,
			travelMode : google.maps.DirectionsTravelMode.DRIVING,
			unitSystem : google.maps.UnitSystem.METRIC
		};

		directionsService.route(directionsRequest, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				new google.maps.DirectionsRenderer({
					map : new google.maps.Map($("#map")[0]),
					directions : response
				});
			} else
				$("#error").append("Unable to retrieve your route<br />");
		});

	},

	InitializeMaps : function(Latitude, Longitude) {
		var me = myMaps;

		console.log(Latitude, Longitude);
		var mapOptions = {
			center : new google.maps.LatLng(Latitude, Longitude),
			zoom : 8
		};

		var map = new google.maps.Map($("#map")[0], mapOptions);
		me.PlaceMarker(mapOptions, map);

		new google.maps.places.Autocomplete($("#source")[0]).bindTo("bounds",
				map);
		new google.maps.places.Autocomplete($("#destination")[0]).bindTo(
				'bounds', map);

	},

	PlaceMarker : function(mapOptions, map) {
		var me = myMaps;

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
