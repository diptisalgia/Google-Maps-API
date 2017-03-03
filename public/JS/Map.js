var myMaps = {

	map : null,
	marker : null,

	Init : function() {
		var me = myMaps;
		me.InitializeMaps();
		me.BindEvents();

	},

	BindEvents : function() {
		var me = myMaps;
		$("#search_button").off("click");

		$("#search_button").on("click",function() {

			console.log("In Search");
			var saveForUser=sessionStorage.getItem("username");
			console.log(saveForUser);
			var current_date=new Date().toISOString();
			var request=JSON.stringify({date:current_date,username:saveForUser,source:$("#source").val().trim(),destination:$("#destination").val().trim()});
			console.log(request);
			$.ajax({
				url:"/api/update",
				type:"POST",
				data:request,
				contentType:"application/json",

				success:function(data){
					console.log(data);
				},
				error:function(err){
					console.log(err);
				}

			});

			if($("#source").val()!== null && $("#source").val() !== undefined || $("#destination").val()!== null && $("#destination").val() !== undefined )
			{
				$(".col-sm-12").removeClass("col-sm-12").addClass("col-sm-8");
			}
			me.showDirections($("#source").val().trim(), $("#destination").val().trim());
		});

		$(".searchoptions").off("click");

		$(".searchoptions").on("click", function() {
			var id = this.id;
			me.GetCurrentLocationOnMap(id);
		});

		$("#getData").off("click");

		$("#getData").on("click", function() {

			$.ajax({
				 url :"/api/getData",
				 type:"GET",
				 cache:false,
				 success:function(data){
					 console.log(data)
				 }
				 error:function(err){
					 console.log(err);
				 }

			 });

		});

	},



	GetCurrentLocationOnMap : function(id) {
		var me = myMaps;
		var geolocation = navigator.geolocation;
		geolocation.getCurrentPosition(function(position) {

			var pos = {
				lat : position.coords.latitude,
				lng : position.coords.longitude
			};

			/*
			* $( "li" ).first().css( "background-color", "red" );
			*/

			me.marker.setMap(null);
			me.PlaceMarker(pos.lat, pos.lng);

			if (id == "currentLocInSource") {
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({
					'location' : pos
				}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						console.log(results[1].formatted_address);
						$("#source").val(results[1].formatted_address);
					}
				});
			}
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
				//directionsDisplay.setMap(me.map);
				directionsDisplay.setMap(new google.maps.Map($("#map")[0]));
				directionsDisplay.setDirections(response);
			} else
			alert("Unable to retrieve your route<br />");
		});

		$("div#rightPanel").empty();
		$("#rightPanel").css('height','540px');
		directionsDisplay.setPanel($("#rightPanel")[0]);

	},

	InitializeMaps : function() {
		var me = myMaps;

		var mapOptions = {
			center : new google.maps.LatLng(22.7196, 75.8577),
			zoom : 8
		};

		me.map = new google.maps.Map($("#map")[0], mapOptions);
		me.PlaceMarker(22.7196, 75.8577);

		new google.maps.places.Autocomplete($("#source")[0]).bindTo('bounds',me.map);
		new google.maps.places.Autocomplete($("#destination")[0]).bindTo('bounds', me.map);

	},

	PlaceMarker : function(lat, lng) {
		var me = myMaps;
		// The google.maps.Marker constructor takes a single Marker options
		// object literal, specifying the initial properties of the marker
		me.marker = new google.maps.Marker({
			position : new google.maps.LatLng(lat, lng),
			map : me.map
		});
		me.map.setCenter(me.marker.getPosition());
	}
}

$(function() {

	if(!sessionStorage.getItem("username")){
		console.log("HI"+sessionStorage.getItem("username"));
		window.location.href="/";
	}
	else
	myMaps.Init();

});
