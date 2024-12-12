
<script setup>
import Proj4js from 'proj4';
Proj4js.defs["EPSG:3828"] = "+title=TWD67 +proj=tmerc +towgs84=-752,-358,-179,-.0000011698,.0000018398,.0000009822,.00002329 +lat_0=0 +lon_0=121 +x_0=250000 +y_0=0 +k=0.9999 +ellps=aust_SA +units=m +no_defs";
Proj4js.defs["EPSG:3826"] = "+title=TWD97 +proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
Proj4js.defs["EPSG:3857"] = "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
const EPSG3826 = new Proj4js.Proj('EPSG:3826');
const EPSG3828 = new Proj4js.Proj('EPSG:3828');
const EPSG4326 = new Proj4js.Proj('EPSG:4326');
const EPSG3857 = new Proj4js.Proj('EPSG:3857');
function TransCoord(x, y, projSource, projDest) {
    var result;
    if (Proj4js) {
        var p = new Proj4js.Point(parseFloat(x),parseFloat(y));
        Proj4js.transform(projSource, projDest, p);
        result = {
            x: p.x,
            y: p.y
        };
    }
    return result;
}
function WGS1984toTWD(x, y, type) {
    if (type == 67) {
        return TransCoord(x, y, EPSG4326, EPSG3828);
    }
    return TransCoord(x, y, EPSG4326, EPSG3826);
}
function TWDtoWGS1984(x, y, type) {
    if (type == 67) {
        return TransCoord(x, y, EPSG3828, EPSG4326);
    }
    return TransCoord(x, y, EPSG3826, EPSG4326);
}
function WGS1984to3857(x, y, type) {
    return TransCoord(x, y, EPSG4326, EPSG3857);
}
defineExpose({
    TransCoord,WGS1984toTWD,TWDtoWGS1984,WGS1984to3857
});
</script>