import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByAge from '../VaccinationByAge'

const CowinDashboard = () => (
  <div>
    <img
      src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
      alt="website logo"
    />
    <h1>CoWIN Vaccination in India</h1> <VaccinationCoverage />
    <VaccinationByAge />
  </div>
)

export default CowinDashboard
