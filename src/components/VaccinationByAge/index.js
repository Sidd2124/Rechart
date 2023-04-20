import {Component} from 'react'

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

class VaccinationByAge extends Component {
  state = {VaccineData: []}

  componentDidMount() {
    this.CompleteDetails()
  }

  CompleteDetails = async () => {
    const Url = 'https://apis.ccbp.in/covid-vaccination-data'
    const responce = await fetch(Url)
    if (responce.ok) {
      const code = await responce.json()

      const NewCode = code.vaccination_by_age.map(each => ({
        Count: each.count,
        age: each.age,
      }))
      console.log(NewCode)
      this.setState({VaccineData: NewCode})
    }
  }

  render() {
    const {VaccineData} = this.state
    return (
      <div>
        <h1>Vaccination by Age</h1>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <h1>Vaccination by gender</h1>
            <Pie
              cx="70%"
              cy="40%"
              data={VaccineData}
              startAngle={0}
              endAngle={360}
              innerRadius="0%"
              outerRadius="65%"
              dataKey="Count"
            >
              <Cell name="age:18-44" fill="#fecba6" />
              <Cell name="age:45-60" fill="#b3d23f" />
              <Cell name="age: Above-60" fill="#a44c9e" />
            </Pie>
            <Legend
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
              align="left"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default VaccinationByAge
