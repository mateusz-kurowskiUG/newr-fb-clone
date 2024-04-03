const getCountries = {
  detail: {
    tags: ['Countries'],
    responses: {
      200: { description: 'Countries list' },
      500: { description: 'Internal server error' }
    }
  }
}
const CountriesDTOs = {
  getCountries
}

export default CountriesDTOs
