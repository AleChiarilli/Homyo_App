from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="my_geocoder")
location = geolocator.geocode("Plaza Casado 2, Motril, España")
latitude = location.latitude
longitude = location.longitude
my_array = [location.latitude, location.longitude]
print(my_array)