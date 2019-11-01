var map = 0;
var markersArray = [];

;(function (window) {
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?sensor=false&callback=initMap";
    document.head.appendChild(script);
}(window))

function initMap()
{
    // Define our custom map type
    var customMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            if(coord && (coord.x < Math.pow(2, zoom)) && (coord.x > -1) && (coord.y < Math.pow(2, zoom)) && (coord.y > -1)) {
                return 'images/tiles/' + zoom + '_' + coord.x + '_' + coord.y + '.png';
            }
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 4,
        minZoom: 1,
        name: 'Port Royale 3 Map'
    });

    // Basic options for our map
    var myOptions = {
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        backgroundColor: '#B7A28D',
        zoom: 2,
        minZoom: 2,
        streetViewControl: false,
        fullScreenControl: false,
        zoomControl: false,
        linksControl: false,
        panControl: false,
        disableDefaultUI: true,
        mapTypeControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ["custom"]
        }
    };

    // Init the map
    map = new google.maps.Map(document.getElementById('map'), myOptions);

    /* used for getting cords
        google.maps.event.addListener(map, 'click', function(event){
            prompt('Lat/Lng', event.latLng.lat() + ', ' + event.latLng.lng());
        });
    */

    var allowedBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-77, -134.375),
        new google.maps.LatLng(77, 134.375)
    );

    // Hook the our custom map type to the map and activate it
    map.mapTypes.set('custom', customMapType);
    map.setMapTypeId('custom');

    google.maps.event.addListener(map, 'bounds_changed', checkAllowedBounds);
    google.maps.event.addListener(map, 'drag', checkAllowedBounds);
    google.maps.event.addListener(map, 'zoom_changed', checkAllowedBounds);

    function checkAllowedBounds(event) {
        if (allowedBounds.contains(map.getCenter())) return;

        // We're out of bounds - Move the map back within the bounds
        var c = map.getCenter(),
            x = c.lng(),
            y = c.lat(),
            maxX = allowedBounds.getNorthEast().lng(),
            maxY = allowedBounds.getNorthEast().lat(),
            minX = allowedBounds.getSouthWest().lng(),
            minY = allowedBounds.getSouthWest().lat();

        if (x < minX) x = minX;
        if (x > maxX) x = maxX;
        if (y < minY) y = minY;
        if (y > maxY) y = maxY;

        map.setCenter(new google.maps.LatLng(y, x));
    }
}

function clearOverlays() {
    if (markersArray) {
        for (var i = 0; i < markersArray.length; i++ ) {
            markersArray[i].setMap(null);
        }
    }

    var center = new google.maps.LatLng(0, 0);
    map.panTo(center);
    map.setZoom(2);
}

function map_to_town(town, nopan)
{
    switch (town)
    {
        case 'andross':
            var LatLng = new google.maps.LatLng(31.877557643340015, -3.955078125);
            break;
        case 'antigua':
            var LatLng = new google.maps.LatLng(-23.4027649054079, 120.673828125);
            break;
        case 'barbados':
            var LatLng = new google.maps.LatLng(-46.73986059969263, 139.39453125);
            break;
        case 'belize':
            var LatLng = new google.maps.LatLng(-21.53484700204875, -86.044921875);
            break;
        case 'biloxi':
            var LatLng = new google.maps.LatLng(65.65827451982663, -82.177734375);
            break;
        case 'campeche':
            var LatLng = new google.maps.LatLng(1.1425024037062033, -100.986328125);
            break;
        case 'cancun':
            var LatLng = new google.maps.LatLng(5.965753671065574, -79.189453125);
            break;
        case 'caracas':
            var LatLng = new google.maps.LatLng(-62.39036943814267, 83.671875);
            break;
        case 'cartagena':
            var LatLng = new google.maps.LatLng(-65.5857200232947, 15.1171875);
            break;
        case 'cat island':
            var LatLng = new google.maps.LatLng(35.38904996691169, 11.25);
            break;
        case 'cayman':
            var LatLng = new google.maps.LatLng(-6.6646075621725345, -39.638671875);
            break;
        case 'charles towne':
            var LatLng = new google.maps.LatLng(31.12819929911201, 21.357421875);
            break;
        case 'charleston':
            var LatLng = new google.maps.LatLng(73.77577986189995, -20.7421875);
            break;
        case 'coro':
            var LatLng = new google.maps.LatLng(-59.08573856981947, 59.150390625);
            break;
        case 'corpus christi':
            var LatLng = new google.maps.LatLng(59.17592824927138, -139.21875);
            break;
        case 'curacao':
            var LatLng = new google.maps.LatLng(-58.44773280389081, 69.169921875);
            break;
        case 'eleuthera':
            var LatLng = new google.maps.LatLng(46.01222384063238, 0.52734375);
            break;
        case 'evangelista':
            var LatLng = new google.maps.LatLng(13.581920900545882, -45.615234375);
            break;
        case 'florida keys':
            var LatLng = new google.maps.LatLng(36.80928470205942, -33.662109375);
            break;
        case 'fort caroline':
            var LatLng = new google.maps.LatLng(66.26685631430846, -31.46484375);
            break;
        case 'georgetown':
            var LatLng = new google.maps.LatLng(-69.13127122963647, 139.921875);
            break;
        case 'gibara':
            var LatLng = new google.maps.LatLng(9.188870084473445, 7.20703125);
            break;
        case 'gibraltar':
            var LatLng = new google.maps.LatLng(-69.93030017617481, 46.142578125);
            break;
        case 'grand bahama':
            var LatLng = new google.maps.LatLng(48.80686346108519, -11.25);
            break;
        case 'grenada':
            var LatLng = new google.maps.LatLng(-54.6229781326903, 122.431640625);
            break;
        case 'guadeloupe':
            var LatLng = new google.maps.LatLng(-30.67571540416769, 123.92578125);
            break;
        case 'havana':
            var LatLng = new google.maps.LatLng(24.3671135626513, -40.869140625);
            break;
        case 'isabella':
            var LatLng = new google.maps.LatLng(-4.302591077119676, 46.58203125);
            break;
        case 'maracaibo':
            var LatLng = new google.maps.LatLng(-63.114637632520896, 42.01171875);
            break;
        case 'margarita':
            var LatLng = new google.maps.LatLng(-59.40036514079251, 107.841796875);
            break;
        case 'martinique':
            var LatLng = new google.maps.LatLng(-44.150681159780916, 129.7265625);
            break;
        case 'nassau':
            var LatLng = new google.maps.LatLng(37.16031654673677, -5.185546875);
            break;
        case 'new orleans':
            var LatLng = new google.maps.LatLng(63.6267446447533, -93.69140625);
            break;
        case 'nombre de dios':
            var LatLng = new google.maps.LatLng(20.550508894195637, -53.349609375);
            break;
        case 'pensacola':
            var LatLng = new google.maps.LatLng(65.10914820386473, -70.13671875);
            break;
        case 'port au prince':
            var LatLng = new google.maps.LatLng(-13.838079936422462, 33.22265625);
            break;
        case 'port of spain':
            var LatLng = new google.maps.LatLng(-61.10078883158897, 128.84765625);
            break;
        case 'port royale':
            var LatLng = new google.maps.LatLng(-20.46818922264095, 1.40625);
            break;
        case 'port st joe':
            var LatLng = new google.maps.LatLng(62.3903694381427, -59.4140625);
            break;
        case 'providence':
            var LatLng = new google.maps.LatLng(-58.26328705248601, -30.9375);
            break;
        case 'puerto cabello':
            var LatLng = new google.maps.LatLng(-62.95522304515911, 72.59765625);
            break;
        case 'puerto santo':
            var LatLng = new google.maps.LatLng(-61.3546135846894, 119.443359375);
            break;
        case 'roatan':
            var LatLng = new google.maps.LatLng(-32.916485347314385, -72.24609375);
            break;
        case 'san juan':
            var LatLng = new google.maps.LatLng(-13.496472765758952, 89.736328125);
            break;
        case 'santa marta':
            var LatLng = new google.maps.LatLng(-60.586967342258674, 24.9609375);
            break;
        case 'santiago':
            var LatLng = new google.maps.LatLng(-0.5273363048115043, 11.42578125);
            break;
        case 'santo domingo':
            var LatLng = new google.maps.LatLng(-15.623036831528252, 59.150390625);
            break;
        case 'sisal':
            var LatLng = new google.maps.LatLng(8.494104537551882, -98.26171875);
            break;
        case 'st augustine':
            var LatLng = new google.maps.LatLng(63.860035895395306, -31.552734375);
            break;
        case 'st kitts':
            var LatLng = new google.maps.LatLng(-21.861498734372553, 114.609375);
            break;
        case 'st lucia':
            var LatLng = new google.maps.LatLng(-48.86471476180277, 129.111328125);
            break;
        case 'st martin':
            var LatLng = new google.maps.LatLng(-13.838079936422462, 108.984375);
            break;
        case 'st thome':
            var LatLng = new google.maps.LatLng(-13.06877673435768, 96.50390625);
            break;
        case 'tampa':
            var LatLng = new google.maps.LatLng(54.00776876193478, -42.626953125);
            break;
        case 'tampico':
            var LatLng = new google.maps.LatLng(23.079731762449878, -152.314453125);
            break;
        case 'tortuga':
            var LatLng = new google.maps.LatLng(-2.986927393334863, 34.716796875);
            break;
        case 'trinidad':
            var LatLng = new google.maps.LatLng(12.726084296948184, -17.75390625);
            break;
        case 'turk islands':
            var LatLng = new google.maps.LatLng(13.838079936422474, 38.49609375);
            break;
        case 'vera cruz':
            var LatLng = new google.maps.LatLng(-1.7575368113083125, -144.404296875);
            break;
        case 'villa hermosa':
            var LatLng = new google.maps.LatLng(-15.199386048559994, -124.541015625);
            break;


    }

    if (nopan != true)
    {
        var center = new google.maps.LatLng(0, 0);
        map.panTo(center);

        var marker = new google.maps.Marker({
            position: LatLng,
            map: map,
            icon: 'img/wheel.png'
        });

        markersArray.push(marker);

        map.panTo(LatLng);
        map.setZoom(4);
    }
    else
    {
        var marker = new google.maps.Marker({
            position: LatLng,
            map: map,
            icon: 'img/goods.png'
        });

        markersArray.push(marker);
    }
}

function show_goods(good)
{
    clearOverlays();

    switch (good)
    {
        case 'bricks':
            map_to_town('antigua', true);
            map_to_town('campeche', true);
            map_to_town('caracas', true);
            map_to_town('charleston', true);
            map_to_town('coro', true);
            map_to_town('curacao', true);
            map_to_town('florida keys', true);
            map_to_town('fort caroline', true);
            map_to_town('georgetown', true);
            map_to_town('grand bahama', true);
            map_to_town('guadeloupe', true);
            map_to_town('havana', true);
            map_to_town('new orleans', true);
            map_to_town('port au prince', true);
            map_to_town('santo domingo', true);
            map_to_town('st augustine', true);
            map_to_town('st martin', true);
            map_to_town('vera cruz', true);
            break;
        case 'bread':
            map_to_town('biloxi', true);
            map_to_town('gibara', true);
            map_to_town('guadeloupe', true);
            map_to_town('margarita', true);
            map_to_town('nassau', true);
            map_to_town('new orleans', true);
            map_to_town('pensacola', true);
            map_to_town('port st joe', true);
            map_to_town('roatan', true);
            map_to_town('santo domingo', true);
            break;
        case 'cacao':
            map_to_town('antigua', true);
            map_to_town('barbados', true);
            map_to_town('caracas', true);
            map_to_town('coro', true);
            map_to_town('curacao', true);
            map_to_town('georgetown', true);
            map_to_town('grenada', true);
            map_to_town('guadeloupe', true);
            map_to_town('margarita', true);
            map_to_town('martinique', true);
            map_to_town('port of spain', true);
            map_to_town('puerto cabello', true);
            map_to_town('puerto santo', true);
            map_to_town('st kitts', true);
            map_to_town('st lucia', true);
            map_to_town('st martin', true);
            break;
        case 'clothing':
            map_to_town('belize', true);
            map_to_town('coro', true);
            map_to_town('corpus christi', true);
            map_to_town('gibraltar', true);
            map_to_town('nombre de dios', true);
            map_to_town('puerto santo', true);
            map_to_town('st augustine', true);
            map_to_town('tampa', true);
            map_to_town('tampico', true);
            map_to_town('turk islands', true);
            break;
        case 'coffee':
            map_to_town('belize', true);
            map_to_town('campeche', true);
            map_to_town('cancun', true);
            map_to_town('cartagena', true);
            map_to_town('gibraltar', true);
            map_to_town('maracaibo', true);
            map_to_town('providence', true);
            map_to_town('roatan', true);
            map_to_town('santa marta', true);
            map_to_town('sisal', true);
            map_to_town('tampico', true);
            map_to_town('vera cruz', true);
            map_to_town('villa hermosa', true);
            break;
        case 'corn':
            map_to_town('belize', true);
            map_to_town('biloxi', true);
            map_to_town('campeche', true);
            map_to_town('cancun', true);
            map_to_town('charles towne', true);
            map_to_town('curacao', true);
            map_to_town('florida keys', true);
            map_to_town('grand bahama', true);
            map_to_town('grenada', true);
            map_to_town('guadeloupe', true);
            map_to_town('nassau', true);
            map_to_town('port royale', true);
            map_to_town('santa marta', true);
            map_to_town('st kitts', true);
            map_to_town('st lucia', true);
            map_to_town('st martin', true);
            map_to_town('st thome', true);
            map_to_town('vera cruz', true);
            break;
        case 'cotton':
            map_to_town('andross', true);
            map_to_town('coro', true);
            map_to_town('fort caroline', true);
            map_to_town('gibara', true);
            map_to_town('havana', true);
            map_to_town('maracaibo', true);
            map_to_town('nassau', true);
            map_to_town('pensacola', true);
            map_to_town('port royale', true);
            map_to_town('providence', true);
            map_to_town('puerto cabello', true);
            map_to_town('santiago', true);
            map_to_town('sisal', true);
            map_to_town('st lucia', true);
            map_to_town('st thome', true);
            map_to_town('tortuga', true);
            map_to_town('turk islands', true);
            map_to_town('vera cruz', true);
            break;
        case 'dyes':
            map_to_town('biloxi', true);
            map_to_town('charleston', true);
            map_to_town('corpus christi', true);
            map_to_town('florida keys', true);
            map_to_town('fort caroline', true);
            map_to_town('new orleans', true);
            map_to_town('pensacola', true);
            map_to_town('port st joe', true);
            map_to_town('st augustine', true);
            map_to_town('tampa', true);
            break;
        case 'fruits':
            map_to_town('andross', true);
            map_to_town('antigua', true);
            map_to_town('barbados', true);
            map_to_town('cat island', true);
            map_to_town('cayman', true);
            map_to_town('charles towne', true);
            map_to_town('eleuthera', true);
            map_to_town('evangelista', true);
            map_to_town('florida keys', true);
            map_to_town('grand bahama', true);
            map_to_town('grenada', true);
            map_to_town('guadeloupe', true);
            map_to_town('martinique', true);
            map_to_town('nassau', true);
            map_to_town('san juan', true);
            map_to_town('st kitts', true);
            map_to_town('st martin', true);
            map_to_town('st thome', true);
            break;
        case 'hemp':
            map_to_town('cat island', true);
            map_to_town('cayman', true);
            map_to_town('eleuthera', true);
            map_to_town('evangelista', true);
            map_to_town('gibraltar', true);
            map_to_town('grenada', true);
            map_to_town('isabella', true);
            map_to_town('margarita', true);
            map_to_town('martinique', true);
            map_to_town('nombre de dios', true);
            map_to_town('port of spain', true);
            map_to_town('puerto santo', true);
            map_to_town('san juan', true);
            map_to_town('santa marta', true);
            map_to_town('santiago', true);
            map_to_town('tortuga', true);
            map_to_town('turk islands', true);
            map_to_town('villa hermosa', true);
            break;
        case 'meat':
            map_to_town('campeche', true);
            map_to_town('cancun', true);
            map_to_town('cartagena', true);
            map_to_town('charleston', true);
            map_to_town('curacao', true);
            map_to_town('fort caroline', true);
            map_to_town('maracaibo', true);
            map_to_town('santa marta', true);
            map_to_town('sisal', true);
            map_to_town('villa hermosa', true);
            break;
        case 'metal':
            map_to_town('barbados', true);
            map_to_town('belize', true);
            map_to_town('biloxi', true);
            map_to_town('cancun', true);
            map_to_town('cartagena', true);
            map_to_town('charles towne', true);
            map_to_town('corpus christi', true);
            map_to_town('gibara', true);
            map_to_town('pensacola', true);
            map_to_town('port royale', true);
            map_to_town('port st joe', true);
            map_to_town('providence', true);
            map_to_town('puerto cabello', true);
            map_to_town('roatan', true);
            map_to_town('sisal', true);
            map_to_town('st kitts', true);
            map_to_town('st lucia', true);
            map_to_town('tampa', true);
            break;
        case 'metalgoods':
            map_to_town('caracas', true);
            map_to_town('cayman', true);
            map_to_town('florida keys', true);
            map_to_town('georgetown', true);
            map_to_town('martinique', true);
            map_to_town('port au prince', true);
            map_to_town('port of spain', true);
            map_to_town('santiago', true);
            map_to_town('trinidad', true);
            map_to_town('vera cruz', true);
            break;
        case 'ropes':
            map_to_town('andross', true);
            map_to_town('antigua', true);
            map_to_town('barbados', true);
            map_to_town('eleuthera', true);
            map_to_town('evangelista', true);
            map_to_town('grenada', true);
            map_to_town('isabella', true);
            map_to_town('providence', true);
            map_to_town('puerto cabello', true);
            map_to_town('st lucia', true);
            break;
        case 'rum':
            map_to_town('cat island', true);
            map_to_town('charles towne', true);
            map_to_town('grand bahama', true);
            map_to_town('havana', true);
            map_to_town('port royale', true);
            map_to_town('san juan', true);
            map_to_town('st kitts', true);
            map_to_town('st martin', true);
            map_to_town('st thome', true);
            map_to_town('tortuga', true);
            break;
        case 'sugar':
            map_to_town('cancun', true);
            map_to_town('caracas', true);
            map_to_town('cartagena', true);
            map_to_town('cayman', true);
            map_to_town('maracaibo', true);
            map_to_town('new orleans', true);
            map_to_town('port au prince', true);
            map_to_town('port of spain', true);
            map_to_town('port st joe', true);
            map_to_town('roatan', true);
            map_to_town('santa marta', true);
            map_to_town('santo domingo', true);
            map_to_town('st augustine', true);
            map_to_town('tampico', true);
            map_to_town('tortuga', true);
            map_to_town('trinidad', true);
            map_to_town('turk islands', true);
            map_to_town('villa hermosa', true);
            break;
        case 'textiles':
            map_to_town('antigua', true);
            map_to_town('barbados', true);
            map_to_town('cat island', true);
            map_to_town('charleston', true);
            map_to_town('eleuthera', true);
            map_to_town('evangelista', true);
            map_to_town('fort caroline', true);
            map_to_town('isabella', true);
            map_to_town('new orleans', true);
            map_to_town('nombre de dios', true);
            map_to_town('pensacola', true);
            map_to_town('port au prince', true);
            map_to_town('port st joe', true);
            map_to_town('providence', true);
            map_to_town('puerto santo', true);
            map_to_town('san juan', true);
            map_to_town('santo domingo', true);
            map_to_town('trinidad', true);
            break;
        case 'tobacco':
            map_to_town('andross', true);
            map_to_town('cat island', true);
            map_to_town('cayman', true);
            map_to_town('charles towne', true);
            map_to_town('eleuthera', true);
            map_to_town('evangelista', true);
            map_to_town('gibara', true);
            map_to_town('grand bahama', true);
            map_to_town('havana', true);
            map_to_town('isabella', true);
            map_to_town('nassau', true);
            map_to_town('nombre de dios', true);
            map_to_town('port au prince', true);
            map_to_town('port royale', true);
            map_to_town('san juan', true);
            map_to_town('santiago', true);
            map_to_town('santo domingo', true);
            map_to_town('st thome', true);
            map_to_town('tortuga', true);
            map_to_town('trinidad', true);
            map_to_town('turk islands', true);
            break;
        case 'wheat':
            map_to_town('andross', true);
            map_to_town('caracas', true);
            map_to_town('coro', true);
            map_to_town('corpus christi', true);
            map_to_town('georgetown', true);
            map_to_town('gibara', true);
            map_to_town('gibraltar', true);
            map_to_town('havana', true);
            map_to_town('margarita', true);
            map_to_town('martinique', true);
            map_to_town('port of spain', true);
            map_to_town('puerto cabello', true);
            map_to_town('roatan', true);
            map_to_town('sisal', true);
            map_to_town('st augustine', true);
            map_to_town('tampa', true);
            map_to_town('tampico', true);
            map_to_town('villa hermosa', true);
            break;
        case 'wood':
            map_to_town('belize', true);
            map_to_town('biloxi', true);
            map_to_town('campeche', true);
            map_to_town('cartagena', true);
            map_to_town('charleston', true);
            map_to_town('corpus christi', true);
            map_to_town('curacao', true);
            map_to_town('georgetown', true);
            map_to_town('gibraltar', true);
            map_to_town('isabella', true);
            map_to_town('maracaibo', true);
            map_to_town('margarita', true);
            map_to_town('nombre de dios', true);
            map_to_town('puerto santo', true);
            map_to_town('santiago', true);
            map_to_town('tampa', true);
            map_to_town('tampico', true);
            map_to_town('trinidad', true);
            break;
    }
}