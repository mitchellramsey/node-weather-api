module.exports = (key, coordinates, axios) => {
  try{
    const url = `https://api.weatherstack.com/current`;
    const params = {
      access_key: key,
      query: `${coordinates[1]},${coordinates[0]}`,
      units: 'f'
    };

    return axios.get(url, { params });
  } catch (err) {
    console.error('Error: Something went wrong - ', err);
  }
};