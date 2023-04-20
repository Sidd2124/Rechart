import {Component} from 'react'

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

class Sidd extends Component {
  state = {VaccineData: []}

  componentDidMount() {
    this.CompleteDetails()
  }

  CompleteDetails = async () => {
    const Url = 'https://apis.ccbp.in/covid-vaccination-data'
    const responce = await fetch(Url)
    if (responce.ok) {
      const code = await responce.json()

      const NewCode = code.vaccination_by_gender.map(each => ({
        Count: each.count,
        Gender: each.gender,
      }))

      this.setState({VaccineData: NewCode})
    }
  }

  render() {
    const {VaccineData} = this.state
    return (
      <div>
        <h1>Vaccination by gender</h1>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <h1>Vaccination by gender</h1>
            <Pie
              cx="70%"
              cy="40%"
              data={VaccineData}
              startAngle={0}
              endAngle={180}
              innerRadius="40%"
              outerRadius="80%"
              dataKey="Count"
            >
              <Cell name="Male" fill="#fecba6" />
              <Cell name="Female" fill="#b3d23f" />
              <Cell name="others" fill="#a44c9e" />
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

export default Sidd
