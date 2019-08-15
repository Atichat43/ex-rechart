
import React, { Component } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import "./bar-charts.scss"

const ACTIVE_OPACITY = 1
const INACTIVE_OPACITY = 0.3
const PRIMARY_COLOR = "#245080"
const SECONDARY_COLOR = "#2C7399"
const INACTIVE = -1

const newData = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

export default class BarCharts extends Component {
  state = {
    activeIndex: INACTIVE,
    data: newData,
    highestIndex1: null,
    highestIndex2: null,
  }

  componentDidMount() {
    this.updateHighestValue(this.state.data)
  }

  updateHighestValue = arr => {
    const highestValue1 = arr.map(i => i.uv).reduce((a, b) => a > b ? a : b)
    const highestValue2 = arr.map(i => i.pv).reduce((a, b) => a > b ? a : b)

    const highestIndex1 = arr.findIndex(i => i.uv === highestValue1)
    const highestIndex2 = arr.findIndex(i => i.pv === highestValue2)

    this.setState(() => ({ highestIndex1, highestIndex2 }))
  }

  handleClick = () => {
    const num1 = Math.floor(Math.random() * newData.length - 1) + 1
    let num2 = null
    do {
      num2 = Math.floor(Math.random() * newData.length - 1) + 1
    } while (num2 === num1)

    const arr = newData.map((item, index) => {
      if (index === num1) return { ...item, uv: 1000 }
      if (index === num2) return { ...item, uv: 5000 }
      return item
    })

    this.updateHighestValue(arr)
    this.setState(() => ({ data: arr }))
  }

  handleMouseMove = bar => {
    const activeIndex = bar.isTooltipActive ? bar.activeTooltipIndex : INACTIVE
    if (this.state.activeIndex !== activeIndex)
      this.setState(() => ({ activeIndex }))
  }

  renderBar = ({ activeIndex, color, data, dataKey, highestIndex }) => (
    <Bar dataKey={dataKey} fill={color} opacity={INACTIVE_OPACITY}>
      {data.map((e, index) =>
        <Cell
          opacity={
            (index === activeIndex) ||
              ((activeIndex === INACTIVE) && (index === highestIndex)) ?
                ACTIVE_OPACITY : INACTIVE_OPACITY
          }
        />
      )}
    </Bar>
  )

  render() {
    const { handleClick, handleMouseMove, renderBar } = this
    const { activeIndex, data, highestIndex1, highestIndex2 } = this.state

    return (
      <div className="wrapper-chart">
        <ResponsiveContainer className='bar-chart' height={400} width="90%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5, }}
            onMouseMove={handleMouseMove}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={{ fill: 'transparent' }} separator=' '/>
            { renderBar({
              activeIndex,
              color: PRIMARY_COLOR,
              data,
              dataKey:'uv',
              highestIndex: highestIndex1,
            })}
            { renderBar({
              activeIndex,
              color: SECONDARY_COLOR,
              data,
              dataKey:'pv',
              highestIndex: highestIndex2,
            })}
          </BarChart>
        </ResponsiveContainer>
        <button className="button-chart" onClick={handleClick}>
          Update Highest Value
        </button>
      </div>
    )
  }
}
