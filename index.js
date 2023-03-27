let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let req = new XMLHttpRequest();

let data;
let values = [];

let width = 800;
let height = 600;
let padding = 40;

let hScale;
let wScale;
let xAxisScale;
let yAxisScale;
let generateScales =()=>{
    /*graph x and y scales for bars*/
    hScale = d3.scaleLinear()
                .domain([0, d3.max(values, (item) =>{
                    return item[1]
                })])
                .range([0, height - (padding*2)]);
    wScale = d3.scaleLinear()
                .domain([0, values.length -1])
                .range([padding, width - padding]);
    /*date string converter into numerical dates*/
    let datesArray = values.map((item) => {
        return new Date(item[0])
    });
    /*scale for x axis (numerical dates)*/
    xAxisScale = d3.scaleTime()
                        .domain([d3.min(datesArray), d3.max(datesArray)])
                        .range([padding, width - padding]);
    /*scale for y axis (GDP)*/
    yAxisScale = d3.scaleLinear()
                        .domain([0, d3.max(values, (item) => {
                            return item[1]
                        })])
                        .range([height - padding, padding]);
};
/*html element svg selector*/
let svg = d3.select('svg');
/*used variables defined above to give width and height attributes*/
let drawCanvas =()=> {
    svg.attr('width', width);
    svg.attr('height', height);
};
/*
# function to create a bar for every value and to set their width
acoording to the scales.
# added tooltip with hover effect that triggers display*/
let drawBars =()=>{

    let tooltip = d3.select('body')
                    .append('div')
                    .attr('id', 'tooltip')
                    .style('visibility', 'hidden')
                    .style('width', 'auto')
                    .style('height', 'auto')

    svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('width', (width - (2*padding)) / values.length)
        .attr('data-date', (item) => {return item[0]})
        .attr('data-gdp', (item) => {return item[1]})
        .attr('height', (item) => {return hScale(item[1])})
        .attr('x', (item, index) => {return wScale(index)})
        .attr('y', (item) => {return (height - padding) - hScale(item[1])})
        .on('mouseover', (e, item) => {tooltip.transition()
                                            .style('visibility','visible')
                                    tooltip.text(item[0])
                                    document.querySelector('#tooltip').setAttribute('data-date', item[0])})
        .on('mouseout', (item) => {tooltip.transition()
                                            .style('visibility', 'hidden')});
};

/*x and y axes*/
let generateAxes =()=>{
    let xAxis = d3.axisBottom(xAxisScale);
    let yAxis = d3.axisLeft(yAxisScale);

    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0, ' + (height-padding) + ')');

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)');
}

/*use the open method to set the XMLHttpRequest. The first argument is the 'GET' method
as we are fetching info from an url (which is the second argument). The third argument
is a boolean wheter we want to run the function as asyncronous or not.*/
req.open('GET', url, true);
/*what to do with the data when we get it. In this line of code it is formated from a JSON
string into a javascript object.*/
req.onload =()=>{
    data = JSON.parse(req.responseText);
/*the values for our bar-chart are located in data.data*/
    values = data.data;
    drawCanvas();
    generateScales();
    drawBars();
    generateAxes();
}
/*this method sends the request*/
req.send();



