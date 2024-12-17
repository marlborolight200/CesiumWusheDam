
import Proj4js from 'proj4';
const T67 = "+title=TWD67 +proj=tmerc +towgs84=-752,-358,-179,-.0000011698,.0000018398,.0000009822,.00002329 +lat_0=0 +lon_0=121 +x_0=250000 +y_0=0 +k=0.9999 +ellps=aust_SA +units=m +no_defs";
const T97 = "+title=TWD97 +proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
const EPSG4326 = "+proj=longlat +datum=WGS84 +no_defs +type=crs";

export function WGS1984toTWD(x, y, type) {
    if (type == 67) {
        return Proj4js(EPSG4326, T67, [x, y]);
    }
    return Proj4js(EPSG4326, T97, [x, y]);
}

export function TWDtoWGS1984(x, y, type) {
    if (type == 67) {
        return Proj4js(T67, EPSG4326, [x, y]);
    }
    return Proj4js(T97, EPSG4326, [x, y]);
}

// defineExpose({
//     WGS1984toTWD, TWDtoWGS1984
// });
