define("getGeoLocation", ["jquery"], function(e) {
	function t() {
		this.latitude = void 0, this.longitude = void 0
	}
	return t.prototype = {
		getLocation: function() {
			if (navigator.geolocation) {
				var e = this;
				navigator.geolocation.watchPosition(e.locationSuccess, e.showError, {
					enableHighAcuracy: !0,
					timeout: 5e4,
					maximumAge: 3e4
				})
			} else alert("Geolocation is not supported by this browser!")
		},
		locationSuccess: function(e) {
			var t = e.coords;
			this.latitude = t.latitude + .00374531687912, this.longitude = t.longitude + .008774687519, console.log(e)
		},
		showError: function(e) {
			switch (e.code) {
				case e.PERMISSION_DENIED:
					console.log("User denied the request for Geolocation.");
					break;
				case e.POSITION_UNAVAILABLE:
					console.log("Location information is unavailable.");
					break;
				case e.TIMEOUT:
					console.log("The request to get user location timed out.");
					break;
				case e.UNKNOWN_ERROR:
					console.log("An unknown error occurred.")
			}
		},
		longPolling: function() {
			var e = "http://api.openweathermap.org/data/2.5/weather?q=",
				t = "&APPID=4c16d64121b3d1c838c58a8c8b100a15",
				o = "Shenzhen",
				n = "&units=metric",
				a = "&jsoncallback=JSON_CALLBACK";
			$.ajax({
				url: e + o + n + t + a,
				data: {
					timed: (new Date).getTime()
				},
				dataType: "jsonp",
				jsonpCallback: "JSON_CALLBACK",
				success: function(e) {}
			})
		},
		myGetJSON: function() {
			var e = "http://api.openweathermap.org/data/2.5/weather?",
				t = "&APPID=4c16d64121b3d1c838c58a8c8b100a15",
				o = "&units=metric",
				n = "lat=" + this.latitude,
				a = "&lon=" + this.longitude,
				i = "&jsoncallback=JSON_CALLBACK",
				r = "<h4>MyWeather</h4>";
			$.getJSON(e + n + a + o + t + i, function(e) {
				var t = "<ul>",
					o = Math.round(e.main.temp),
					n = e.weather[0].description;
				r += "<span>" + e.name + "," + e.sys.country + "</span>", $("#weather").html(r), t += "<li>" + o + "℃</li><li>" + n + "</li>", t += "</ul>", $("#weather").append(t)
			})
		},
		handlePermission: function() {
			if (navigator.permissions) {
				var e = this;
				navigator.permissions.query({
					name: "geolocation"
				}).then(function(t) {
					return "granted" == t.state ? (e.report(t.state), !1) : "prompt" == t.state ? (e.report(t.state), !0) : "denied" == t.state ? (e.report(t.state), !1) : void(t.onchange = function() {
						e.report(t.state)
					})
				})
			} else console.log("The browser doesn't support Permissions API!")
		},
		report: function(e) {
			console.log("Permission: " + e)
		}
	}, {
		CreateLocation: t
	}
});