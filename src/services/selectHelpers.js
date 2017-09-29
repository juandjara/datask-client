import axios from './axiosWrapper'

export function searchCompanies(query) {
  const companyMapper = ({_id, name}) => ({
    value: _id,
    label: name
  })
  return axios.get(`/company?q=${query}`)
  .then(res => res.data.docs)
  .then(companies => ({
    options: companies.map(companyMapper)
  }))
}