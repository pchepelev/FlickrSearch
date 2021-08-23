var lonMin = "-123.382945";
var latMin = "48.449727";
var lonMax = "-123.300075";
var latMax = "48.48302";
var bbox = lonMin+","+latMin+","+lonMax+","+latMax;
var minDate = "2002-01-01";
var maxDate = "2008-12-31";
var apiKey = "";
var request = "https://www.flickr.com/services/rest?bbox="+bbox+"&accuracy=1&format=json&nojsoncallback=1&min_taken_date="+minDate+"&max_taken_date="+maxDate+"&method=flickr.photos.search&api_key="+apiKey+"&sort=date-taken-asc";
var photoArray = [];

var handleResponse = function(response)
{
    return response.json();
}

var handleData = function(data)
{
    if (data.stat == "ok")
    {
        console.log("got page "+data.photos.page+" of data");
        photoArray = photoArray.concat(data.photos.photo);
        var newPage = data.photos.page + 1;
        if (newPage <= data.photos.pages)
        {
            var newReq = request+"&page="+newPage;
            console.log("getting page "+newPage+" of data");
            fetch(newReq).then(handleResponse).then(handleData);
        }
        else
        {
            console.log("got all data");
            var htmlStart = "<!doctype html><html><body><table><tbody>";
            var htmlBody = "";
            for (var i = 0; i < photoArray.length; i++)
            {
                var p = photoArray[i];
                var rowHtml = "<tr><td><a href='https://www.flickr.com/photos/"+p.owner+"/"+p.id+"'><img src='https://live.staticflickr.com/"+p.server+"/"+p.id+"_"+p.secret+"_m.jpg'></img></a></td></tr>";
                htmlBody = htmlBody + rowHtml;
            }
            var htmlEnd = "</tbody></table></body></html>";
            var html = htmlStart + htmlBody + htmlEnd;
            console.log(html);
        }
    }
    else
    {
        console.log("request failed " + data.stat);
    }
}

console.log("getting page "+1+" of data");
fetch(request).then(handleResponse).then(handleData);

