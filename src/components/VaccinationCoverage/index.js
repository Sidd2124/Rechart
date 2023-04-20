import {Component} from 'react'

import ImageGallery from 'react-image-gallery'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByGender'

const Status = {
  Success: 'Success',
  InProgress: 'InProgress',
  Failure: 'Failure',
}

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
]

class VaccinationCoverage extends Component {
  state = {VaccineData: [], Situation: ''}

  componentDidMount() {
    this.CompleteDetails()
  }

  DataFormatter = number => {
    if (number > 1000) {
      return `${(number * 1000).toString()}k`
    }
    return `${(number * 10).toString()}k`
  }

  CompleteDetails = async () => {
    this.setState({Situation: Status.InProgress})

    const Url = 'https://apis.ccbp.in/covid-vaccination-data'
    const responce = await fetch(Url)
    if (responce.ok) {
      const code = await responce.json()

      const NewCode = code.last_7_days_vaccination.map(each => ({
        Dose1: each.dose_1,
        Dose2: each.dose_2,
        data: each.vaccine_date,
      }))
      console.log(NewCode)
      this.setState({VaccineData: NewCode, Situation: Status.Success})
    } else {
      this.setState({Situation: Status.Failure})
    }
  }

  SuccesView = () => {
    const {VaccineData} = this.state
    return (
      <div>
        <h1>Vaccination Coverage</h1>
        <ResponsiveContainer width="90%" height={500}>
          <BarChart
            data={VaccineData}
            margin={{
              top: 5,
            }}
          >
            <XAxis
              dataKey="data"
              tick={{
                stroke: 'gray',
                strokeWidth: 1,
              }}
            />
            <YAxis
              tickFormatter={this.DataFormatter}
              tick={{
                stroke: 'gray',
                strokeWidth: 0,
              }}
            />

            <Legend
              wrapperStyle={{
                padding: 30,
              }}
            />
            <Bar dataKey="Dose1" name="Dose1" fill="#1f77b4" barSize="10%" />
            <Bar dataKey="Dose2" name="Dose2" fill="#fd7f0e" barSize="10%" />
          </BarChart>
        </ResponsiveContainer>
        <VaccinationByAge />
        <ImageGallery items={images} />
      </div>
    )
  }

  FailureViwe = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1>SomeThing Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  Finel = () => {
    const {Situation} = this.state

    switch (Situation) {
      case Status.Success:
        return this.SuccesView()
      case Status.Failure:
        return this.FailureViwe()
      case Status.InProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div>{this.Finel()} ;</div>
  }
}

export default VaccinationCoverage
