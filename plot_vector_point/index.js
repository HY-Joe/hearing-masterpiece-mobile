var el = d3.select('.js-map'),
      // 150 DPI image
      width = 1743 / 2,
      // 150 DPI image
      height = 1421 / 2,
      // Exported bounds of raster image
      rasterBounds = [[-122.7895, 45.4394], [-122.5015, 45.6039]]

  var projection = d3.geo.mercator()
    .scale(1)
    .translate([0, 0])

  var path = d3.geo.path()
    .projection(projection)

  var map = el.append('svg')
    .attr('width', width)
    .attr('height', height)

  map.append('image')
    .attr('xlink:href', '000000000285.jpg')
    .attr('width', width)
    .attr('height', height)

  d3.json('supermarkets.json', function(err, data) {
    var b = [projection(rasterBounds[0]), projection(rasterBounds[1])],
        s = 1 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2]

    projection
      .scale(s)
      .translate(t)

    map.selectAll('.supermarket')
      .data(data.features)
    .enter().append('circle')
      .attr('class', 'supermarket')
      .attr('r', 2)
      .each(function(d) {
        var lonlat = projection(d.geometry.coordinates);
        d3.select(this)
          .attr('cx', lonlat[0])
          .attr('cy', lonlat[1])
      })
  })