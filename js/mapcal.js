/*!
 * Get appropriate height for fullscreen
 * \author Gajotres (cf. http://stackoverflow.com/questions/16038562/phonegap-jquery-mobile-google-maps-v3-map-shows-top-left-tiles)
 * \fn double getDistance(lat1, lon1, lat2, lon2)
 * \memberof mapcal
 * \return appropriate height for fullscreen
 * \example 
 		var bestheight = getRealContentHeight();
 */
function getRealContentHeight() {
	var header = $.mobile.activePage.find("div[data-role='header']:visible");
	var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
	var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
	var viewport_height = $(window).height();
	var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
	if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
		content_height -= (content.outerHeight() - content.height());
	} 
	return content_height;
}




/*!
 * Get latitude & longitude from address
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn string getLatLong(address,callback)
 * \memberof mapcal
 * \param address Address string
 * \return string latitude & longitude variable
 * \example 
 		getLatLong('43 rue des Saints Pères, 75006 Paris',function(result) {
 			alert(result);
 		});
 */
function getLatLong(address,callback){
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'address': address}, function(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
		callback(results[0].geometry.location);
		} 
	});
}			



/*!
 * Get address from latitude & longitude
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn string getAddress(lat,lon,callback)
 * \memberof mapcal
 * \param lat Latitude double
 * \param lon Longitude double
 * \return string Full address
 * \example 
 		getAddress(48.85587109999999,2.331451799999968,function(result) {
 			alert(result);
 		});
 */
function getAddress(lat,lon,callback){
	var geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(lat,lon);	
	geocoder.geocode({'latLng':latlng},function(data,status){		 
		if(status == google.maps.GeocoderStatus.OK){		 
			var address = data[0].address_components[0].long_name + ', ' +
			data[0].address_components[1].long_name + ', ' +
			data[0].address_components[6].long_name + ' ' +
			data[0].address_components[2].long_name + ', ' +
			data[0].address_components[3].long_name + ', ' +
			data[0].address_components[4].long_name + ', ' +
			data[0].address_components[5].long_name; 
			callback(address);		 
		}		 
	});		
}			




/*!
 * Add a marker to a DIV
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn void mapcal_addMarker(div,icon,tags,txt,latlon)
 * \memberof mapcal
 * \param div DIV name ex: '#map_canvas'
 * \example 
 		addMarker('#map_canvas',
 				  'img/here.png',
 				  'pos',
 				  'You are here!',
 				  new google.maps.LatLng(48.85587109999999,2.331451799999968));
 */
function addMarker(div,icon,tags,geo,histo,latlon,map){
	//var map = new google.maps.Map(document.getElementById(""));

	var infoBubble;
	infoBubble = new InfoBubble({
	  maxWidth: 500,
	  maxHeigth: 500
	});            
	infoBubble.addTab('Geography', geo);
	infoBubble.addTab('Wikipedia', histo);

	
	$(div).gmap('addMarker', { 'icon': icon, 'tags':tags, 'bound':true, 'position': latlon } ).click(function() {
		infoBubble.open(map, this);
	});
}




/*!
 * Add a marker to a DIV
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn string toTitleCase(str)
 * \memberof mapcal
 * \param str a string
 * \return string First letter in uppercase
 * \example 
 		toTitleCase("hello mapcal"); => Hello Mapcal
 */
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
    




/*!
 * Toogle DIV style
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn void togglestyle(el,on,off)
 * \memberof mapcal
 * \param div DIV name
 * \param on style name for ON
 * \param off style name for OFF
 * \example 
 		togglestyle(this,"favorite","addfavorite");
 */
function togglestyle(div,on,off){
    if(div.className == "favorite") {
    	div.className="addfavorite";
    } else {
    	div.className="favorite";
    }
}

function changeImg(imgdiv,img1,img2){
	$(imgdiv).on({
	    'click': function() {
	         var src = ($(this).attr('src') == img1)
	            ? img2
	            : img1;
	         $(this).attr('src', src);
	    }
	});
}





/*!
 * Get distance between two positions  given latitude & longitude of two positions
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn double getDistance(lat1, lon1, lat2, lon2)
 * \memberof mapcal
 * \param lat1 latitude of position 1
 * \param lon1 longitude of position 1
 * \param lat1 latitude of position 2
 * \param lon1 longitude of position 2
 * \return distance between two positions
 * \example 
 		var dist = calculateDistance(48.85587109999999,2.331451799999968,49.85587109999999,2.331451799999968);
 */
function getDistance(lat1, lon1, lat2, lon2)
{
	var p1 = new google.maps.LatLng(lat1, lon1);
	var p2 = new google.maps.LatLng(lat2, lon2);
	return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
  
}

/*!
 * Get distance between two positions given latitude & longitude object of two positions
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn double getDistance(lat1, lon1, lat2, lon2)
 * \memberof mapcal
 * \param latlon1 latitude & longitude object of position 1
 * \param latlon2 latitude & longitude object of position 2
 * \return distance between two positions
 * \example 
 *      var latlon1 = new google.maps.LatLng(48.85587109999999,2.331451799999968);
 *      var latlon2 = new google.maps.LatLng(49.85587109999999,2.331451799999968);
 		var dist = calculateDistance(latlon1,latlon2);
 */
function getDistanceLatLon(latlon1, latlon2)
{

	return (google.maps.geometry.spherical.computeDistanceBetween(latlon1, latlon2) / 1000).toFixed(2);  
}



/*!
 * Go to tagged markers
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn void goTag(tag)
 * \memberof mapcal
 * \param tag tag key * 
 * \example 
 *      goTag("Favorites");
 */
function goTag(tag) {
	tagschanged = true;	
	
	$('#map_canvas').gmap('closeInfoWindow');
	$('#map_canvas').gmap('set', 'bounds', null);
	if (tag == 'all' ) {
		$.each($('#map_canvas').gmap('get', 'markers'), function(i, marker) {
			$('#map_canvas').gmap('addBounds', marker.position);
			marker.setVisible(true); 			
		});
	} else {
	
		$('#map_canvas').gmap('find', 'markers', { 'property': 'tags', 'value': tag }, function(marker, found) {
			if (found) {
				//alert(marker.position);
				$('#map_canvas').gmap('addBounds', marker.position);
			}
			marker.setVisible(found); 
		});
	}
	
	$('#tags').val(tag);
	
	

}



/*!
 * Show/hide markers according to zoom and center of map
 * \author Hoai-Tuong Nguyen (nhtuong@gmail.com)
 * \fn toogleMarker(map,div)
 * \memberof mapcal
 * \param div DIV of map object
 * \param map map object
 * \example 
 *      toogleMarkers('#map_canvas',map);
 */
function toogleMarkers(div,map){
	var zoom = map.getZoom(); 


	if (!tagschanged){
		$(div).gmap('closeInfoWindow');
		$(div).gmap('set', 'bounds', null);
		
		$.each($(div).gmap('get', 'markers'), function(i, marker) {

			if ((getDistanceLatLon(map.getCenter(), marker.position)<=10) || (zoom >= 2))							
				marker.setVisible(true);	
			else marker.setVisible(false); 
			
			if (marker.tags.indexOf("Here")!=-1)
				marker.setVisible(true); 
			
				
		});				
	}
	



}



function getWiki(keyword,callback){
	var res;
	$.ajax({
	    type: "GET",
	    url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+keyword+"&callback=?",
	    contentType: "application/json; charset=utf-8",
	    async: false,
	    dataType: "json",
	    success: function (data, textStatus, jqXHR) {
	    
		var markup = data.parse.text["*"];
		var i = $('<div></div>').html(markup);
		
		// remove links as they will not work
		//i.find('a').each(function() { $(this).replaceWith($(this).html()); });
		
		// remove any references
		i.find('sup').remove();
		
		// remove cite error
		i.find('.mw-ext-cite-error').remove();
		
		res = $(i).find('p');
		callback(res);			
		
	    },
	    error: function (errorMessage) {
	    }
	});   
		
}
