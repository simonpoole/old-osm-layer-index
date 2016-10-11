var map = L.map('map').fitWorld();

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

d3.json("imagery.geojson", function(error, imagery) {
    imagery.features = imagery.features.sort(function(a,b) {
        // sort by country code, then alphabetically
        if (a.properties['country_code'] === b.properties['country_code']) {
            return a.properties.name.toLowerCase() > b.properties.name.toLowerCase() ? 1 : -1;
        }
        if (a.properties['country_code'] === undefined) return -1;
        if (b.properties['country_code'] === undefined) return 1;
        if (a.properties['country_code'] > b.properties['country_code']) return 1;
        return -1;
    })

    var imageryLayer = L.geoJson(imagery, {
        style: function(feature) {
            return {
                weight: 1,
                color: feature.properties.best ? 'gold' : 'gray',
                fillOpacity: 0.1,
                fillRule: 'nonzero'
            }
        }
    })
    .on('click', function(e) {
        var matches = leafletPip.pointInLayer(e.latlng, imageryLayer, false);
        if (!matches.length) return;
        map.openPopup(
            '<h3>Available layers at this location:</h3>'+
            matches.map(function(match) {
                return match.feature.properties.name;
            }).join('<br>'),
            e.latlng
        );
    })
    .addTo(map)

    var testLayer = L.geoJson(/* dummy */).addTo(map)

    var divs = d3.select('#wrap')
        .selectAll('div')
        .data(imagery.features)
        .enter()
        .append('div')
        .classed('best', function(d) {
            return d.properties.best === true;
        });

    var imagery_links = divs.append('a')
        .text(function(d) {
            return (d.properties['country_code'] || 'world') + ' / ' + d.properties.name + (d.properties.best ? '*' : '');
        })
        .attr('href', '#')
        .attr('title', function(d) {
            if (d.properties.best)
                return 'this is the best known imagery source in its region';
        })
        .on('click', function(d, i) {
            d3.event.preventDefault();

            if (d.geometry === null) {
                map.fitWorld({animate: true});
            } else {
                var bounds = d3.geo.bounds(d);
                map.flyToBounds([bounds[0].reverse(), bounds[1].reverse()], {duration:1.0});
            }

            imageryLayer.eachLayer(function(layer) {
                if (layer.feature === d) {
                    layer.setStyle({
                        color: 'darkred',
                        fillOpacity: 0.2
                    });
                    layer.bringToFront();
                } else {
                    layer.setStyle(imageryLayer.options.style(layer.feature))
                }
            });

            imagery_links.classed('active', function(d2, i2) {
                return i2 == i;
            });

            testLayer.removeFrom(map);

            if (d.properties.type === 'tms') {
                var url = d.properties.url.replace('{zoom}', '{z}');
                var domains = (url.match(/{switch:(.*?)}/) || ['',''])[1].split(',');
                url = url.replace(/{switch:(.*?)}/, '{s}');
                testLayer = L.tileLayer(url, {
                    subdomains: domains,
                    attribution: d.properties.attribution ?
                        '&copy; ' + (d.properties.attribution.url ?
                            '<a href="'+d.properties.attribution.url+'">'+d.properties.attribution.text+'</a>' :
                            d.properties.attribution.text) :
                        ''
                }).addTo(map);
            }
            if (d.properties.type === 'wms' && !(d.properties.available_projections && d.properties.available_projections.indexOf('EPSG:3857') < 0)) {
                var url = d.properties.url.replace(/{.*?}/g, '');
                var layers = url.match(/(&|\?)layers=(.*?)(&|$)/i)[2];
                var styles = (url.match(/(&|\?)styles=(.*?)(&|$)/i) || [])[2] || '';
                var format = url.match(/(&|\?)format=(.*?)(&|$)/i)[2];
                var transparent = (url.match(/(&|\?)transparent=(.*?)(&|$)/i) || [])[2] || true;
                var version = (url.match(/(&|\?)version=(.*?)(&|$)/i) || [])[2] || '1.1.1';
                url = url.replace(/((layers|styles|format|transparent|version|width|height|bbox|srs|service|request)=.*?)(&|$)/ig, '')
                testLayer = L.tileLayer.wms(url, {
                    layers: layers,
                    styles: styles,
                    format: format,
                    version: version,
                    transparent: transparent,
                    uppercase: true,
                    attribution: d.properties.attribution ?
                        '&copy; ' + (d.properties.attribution.url ?
                            '<a href="'+d.properties.attribution.url+'">'+d.properties.attribution.text+'</a>' :
                            d.properties.attribution.text) :
                        ''
                }).addTo(map);
            }
        });

    imagery_links.append('span')
        .classed('type', true)
        .text(function(d) {
            if (d.properties.type === 'wms' && (d.properties.available_projections && d.properties.available_projections.indexOf('EPSG:3857') < 0))
                return d.properties.type + ' (live preview not available)';
            else
                return d.properties.type;
        });

    var meta = divs.append('div')
        .classed('meta', true);

    meta.append('span')
        .text(function(d) {
            return 'url: ' + d.properties.url;
        });
});
