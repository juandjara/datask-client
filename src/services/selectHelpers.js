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
export function searchUsers(query) {
  const mapper = ({_id, full_name}) => ({
    value: _id,
    label: full_name
  })
  return axios.get(`/user?q=${query}`)
  .then(res => res.data.docs)
  .then(companies => ({
    options: companies.map(mapper)
  }))
}
