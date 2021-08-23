@echo off

for /l %%x in (1, 1, 11) do (
	curl "https://www.flickr.com/services/rest?bbox=-123.382945,48.449727,-123.300075,48.48302&accuracy=1&format=json&min_taken_date=2002-01-01&max_taken_date=2008-12-31&method=flickr.photos.search&api_key=b3cd27896afe910944427a122550b214&sort=date-taken-asc&page=1" > flickrdata/o%%x.json
	echo added page %%x
)
