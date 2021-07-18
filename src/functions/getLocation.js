module.exports = (query, key, axios) => {
  try{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`
    const params = {
      access_token: key,
      limit: 1
    };
    return axios.get(url, { params });
  } catch(err){
    console.log('Error: Something went wrong - ', err);
  }
};