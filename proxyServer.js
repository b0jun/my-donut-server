
const geolib = require("geolib");

(async () => {

    let lat = 37.5914496;
    let lon =  127.008768;
    
    let lat_ = 37.473752; 
    let lon_ = 126.62017859999999;
    
    let dist = await geolib.getDistance(
        { latitude: lat, longitude: lon},
        {
          latitude: lat_,
          longitude: lon_,
        }
    );
    console.log('dist: ', dist / 1000 + 'km');

})();
