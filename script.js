const enrollmentData = [
  {
    district: "Midwest City-Del City*",
    enrollment: 97.1,
    graduates: 831,
    enrolled: 807
  },
  {
    district: "Edmond",
    enrollment: 77.8,
    graduates: 1678,
    enrolled: 1306
  },
  {
    district: "Norman",
    enrollment: 56.3,
    graduates: 972,
    enrolled: 547
  },
  {
    district: "Moore",
    enrollment: 53.2,
    graduates: 1483,
    enrolled: 789
  },
  {
    district: "Broken Arrow",
    enrollment: 47.9,
    graduates: 1091,
    enrolled: 523
  },
  {
    district: "Union",
    enrollment: 47.9,
    graduates: 1193,
    enrolled: 571
  },
  {
    district: "Tulsa",
    enrollment: 43.6,
    graduates: 1836,
    enrolled: 800
  },
  {
    district: "Putnam City",
    enrollment: 39.4,
    graduates: 1221,
    enrolled: 481
  },
  {
    district: "Oklahoma City",
    enrollment: 34.8,
    graduates: 1602,
    enrolled: 557
  },
  {
    district: "Lawton",
    enrollment: 17.6,
    graduates: 777,
    enrolled: 137
  },
  {
    district: "Epic One-on-One, Blended",
    enrollment: 14.7,
    graduates: 2523,
    enrolled: 370
  }
];

var margin = {top:20, right: 5, bottom: 290, left: 50},
    width = 800 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

const barChartHeight = 400;
var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([barChartHeight, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    // .tickFormat(formatPercent);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span><strong>"+d.district+"</strong></span><hr><span>College-Enrolled:<strong>" + d.enrolled + "</strong></span><span>'19 Graduates: <strong>"+d.graduates+"</strong></span><span>Rate: <strong>"+d.enrollment+"%</strong></span>";
  })

var svg = d3.select("body svg svg").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", barChartHeight + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);


  x.domain(enrollmentData.sort((a,b) => b.graduates -a.graduates).map(function(d) { return d.district; }));
  y.domain([0,   2523 ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (barChartHeight)+ ")")
      .call(xAxis)
    .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");



  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("dy", ".71em")
      .style("text-anchor", "start");
  svg.append("g")
    .append("text")
      .attr("y", -50)
.attr("font-size","0.7rem")
  .attr("x", -240)
      .attr("dy", ".71em")
        .attr("transform", "rotate(-90)")
      .style("text-anchor", "start")
.text("2019 Graduates");

  svg.selectAll(".barfull")
      .data(enrollmentData)
    .enter().append("rect")
      .attr("class", "barfull")
      .attr("fill","#efefef")
      .attr("x", function(d) { return x(d.district); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.graduates); })
      .attr("height", function(d) { return barChartHeight - y(d.graduates); })


  svg.selectAll(".bar")
      .data(enrollmentData)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.district); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.enrolled); })
      .attr("height", function(d) { return barChartHeight - y(d.enrolled); })


  svg.selectAll(".barfull2")
      .data(enrollmentData)
    .enter().append("rect")
      .attr("class", "barfull2")
      .attr("fill","rgba(0,0,0,0)")
      .attr("x", function(d) { return x(d.district); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.graduates); })
      .attr("height", function(d) { return barChartHeight - y(d.graduates); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

svg.selectAll(".test")
  .data(enrollmentData)
.enter().append("text")
.attr("text-anchor","start")
.attr("font-weight","bold")
.attr("fill",'#efefef')
.attr("font-size","0.9rem")
  .attr("x", function(d) { return (x(d.district)+10); })
      .attr("y", function(d) { return barChartHeight - 5})
      .text(function(d) { return d.enrollment + "%"});

// svg.selectAll(".outerCircles")
//   .data(enrollmentData)
// .enter().append("circle")
// .attr("fill","#efefef")
//   .attr("cx", function(d) { return x(d.district) + 30; })
//    .attr("cy", 445)
//       .attr("r", function(d) { return d.graduates/60; })

// svg.selectAll(".innerCircles")
//   .data(enrollmentData)
// .enter().append("circle")
// .attr("fill","lightcoral")
//   .attr("cx", function(d) { return x(d.district) + 30; })
//    .attr("cy", 445)
//       .attr("r", function(d) { return d.enrolled/60; });

// svg.selectAll(".test")
//   .data(enrollmentData)
// .enter().append("text")
// .attr("fill","lightcoral")
// .attr("text-anchor","middle")
// .attr("font-size","0.9rem")

//   .attr("x", function(d) { return (x(d.district)+ 28); })
//    .attr("y", 510)
// .text(function(d) { return d.enrolled});

// svg.selectAll(".test")
//   .data(enrollmentData)
// .enter().append("text")
// .attr("text-anchor","middle")
// .attr("font-size","0.9rem")
//   .attr("x", function(d) { return (x(d.district)+ 28); })
//    .attr("y", 530)
//       .text(function(d) { return d.graduates});

// svg.selectAll(".test")
//   .data(enrollmentData)
// .enter().append("rect")
// .attr("width", 30)
// .attr("height", 1)
// .attr("fill","#333333")
//   .attr("x", function(d) { return (x(d.district)+ 12); })
//    .attr("y", 515)

// svg.append("text")
// .attr("text-anchor","end")
// .attr("font-size","0.7rem")
//   .attr("x", 5)
//    .attr("y", 510)
// .text("Enrolled");
// svg.append("text")
// .attr("text-anchor","end")
// .attr("font-size","0.7rem")
//   .attr("x", 5)
//    .attr("y", 530)
// .text("2019 Graduates");
