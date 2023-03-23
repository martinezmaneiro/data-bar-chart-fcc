let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let req = new XMLHttpRequest();

let data;
let values;

let wScale;
let hScale;

let xAxisScale;
let yAxisScale;

let width = 800;
let height = 600;
let padding = 40;

let svg = d3.select('svg');

let drawCanvas =()=> {
    svg.attr('width', width);
    svg.attr('height', height);
};

let generateScales =()=>{};

let drawBars =()=>{};

/*use the open method to set the XMLHttpRequest. The first argument is the 'GET' method
as we are fetching info from an url (which is the second argument). The third argument
is a boolean wheter we want to run the function as asyncronous or not.*/
req.open('GET', url, true);
/*what to do with the data when we get it. In this line of code it is formated from a JSON
string into a javascript object.*/
req.onload =()=>{
    data = JSON.parse(req.responseText);
/*the data field from the object is where the values for our bar-chart are located*/
    values = data.data;
    drawCanvas();
    generateScales();
    drawBars();
    generateAxes();
}
/*this method sends the request*/
req.send();



