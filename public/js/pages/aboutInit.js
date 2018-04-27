export default function () {
    let map = new BMap.Map("duyi-about-map-container"),
        point = new BMap.Point(126.627695,45.714603),
        marker = new BMap.Marker(point);
    map.centerAndZoom(point, 18);
    map.enableScrollWheelZoom(true);
    map.addOverlay(marker);
    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
}