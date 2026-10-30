// Maps module - Leaflet map initialization
// 添加具体建筑物和名称

let map;
let markers = {};

// 桂林旅游学院（雁山校区）中心坐标
var guilinCollege = [25.1039, 110.3144];

// 具体建筑物位置（更精确的坐标）
var locations = {
    '图书馆': [25.1035, 110.3140],
    '第一教学楼': [25.1042, 110.3155],
    '第二教学楼': [25.1030, 110.3150],
    '学生食堂': [25.1028, 110.3133],
    '学生公寓1栋': [25.1050, 110.3150],
    '学生公寓2栋': [25.1055, 110.3145],
    '行政楼': [25.1045, 110.3138],
    '体育馆': [25.1020, 110.3160],
    '校医院': [25.1048, 110.3128],
    '超市': [25.1043, 110.3162]
};

// 每个位置的失物数量
var lostItemsCount = {
    '图书馆': 2,
    '第一教学楼': 3,
    '第二教学楼': 1,
    '学生食堂': 1,
    '学生公寓1栋': 2,
    '学生公寓2栋': 1,
    '行政楼': 0,
    '体育馆': 1,
    '校医院': 0,
    '超市': 2
};

// 初始化地图（当Maps模块可见时）
function initMap() {
    if (map) return; // 避免重复初始化
    
    map = L.map('realMap').setView(guilinCollege, 17);
    
    // 添加更详细的地图瓦片（使用OpenStreetMap，更适合中国地区）
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // 添加标记
    Object.keys(locations).forEach(function(name) {
        var coord = locations[name];
        var count = lostItemsCount[name];
        
        // 创建自定义图标（失物数量 > 0 显示红色，否则显示灰色）
        var bgColor = count > 0 ? '#e74c3c' : '#95a5a6';
        var icon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: ' + bgColor + '; color: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); font-size: 14px;">' + (count > 0 ? count : '') + '</div>',
            iconSize: [35, 35],
            iconAnchor: [17, 17]
        });
        
        var marker = L.marker(coord, { icon: icon })
            .addTo(map);
        
        // 添加永久标签
        marker.bindTooltip(name, {
            permanent: true,
            direction: 'top',
            className: 'map-label',
            offset: [0, -20]
        });
        
        // 如果有失物，添加弹出窗口
        if (count > 0) {
            marker.bindPopup(
                '<div style="text-align: center;">' +
                '<strong>' + name + '</strong><br>' +
                '📍 ' + count + '个失物待领<br>' +
                '<button onclick="alert(\'导航功能开发中...\')" style="margin-top: 5px; padding: 3px 10px; background: #3498db; color: white; border: none; border-radius: 3px; cursor: pointer;">导航到这里</button>' +
                '</div>'
            );
        } else {
            marker.bindPopup(
                '<div style="text-align: center;">' +
                '<strong>' + name + '</strong><br>' +
                '✅ 暂无失物</div>'
            );
        }
        
        markers[name] = marker;
    });
    
    // 添加校园边界（可选）
    var campusBounds = [
        [25.1010, 110.3110],
        [25.1010, 110.3180],
        [25.1070, 110.3180],
        [25.1070, 110.3110]
    ];
    L.polygon(campusBounds, {
        color: '#3498db',
        fillColor: '#3498db',
        fillOpacity: 0.05,
        weight: 2
    }).addTo(map).bindPopup('桂林旅游学院（雁山校区）');
}

// 聚焦到指定标记点
window.focusMapMarker = function(locationName) {
    if (!map) initMap();
    
    var coord = locations[locationName];
    if (coord) {
        map.setView(coord, 18);
        markers[locationName].openPopup();
    }
};

// 监听Maps模块显示（当导航到Maps时初始化地图）
document.addEventListener('DOMContentLoaded', function() {
    var navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var targetSection = this.getAttribute('data-section');
            if (targetSection === 'maps') {
                setTimeout(initMap, 100); // 延迟初始化，确保DOM已显示
            }
        });
    });
});
