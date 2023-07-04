import { useState } from 'react'
const Para = ({text})=> <h1>{text}</h1>
const Button = ({text,onClick}) => <button onClick={onClick}>{text}</button>
const StatisticLine= ({text, num}) => {
  if (text=="positive")
      return <tr>{text} {num} %</tr>
  return <tr>{text} {num}</tr>
}

const Statistics = ({good,neutral,bad}) => {
  const all=good+bad+neutral
  if (all>0)
  return  <>
  <Para text="statistics"/>
  <StatisticLine text="good" num={good}/>
  <StatisticLine text="neutral" num={neutral}/>
  <StatisticLine text="bad" num={bad}/>
  <StatisticLine text="all" num={all}/>
  <StatisticLine text="average" num={(good - bad) / all}/>
  <StatisticLine text="positive" num={good / all}/>
  </>
  return <p>No feedback given</p>
}

const App = () => {
  // save clicks of each button to its own state
  const head1="give feedback"
    const text1="good"
    const text2="neutral"
    const text3="bad"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const good_click= ()=> setGood(good+1)
  const neutral_click= ()=> setNeutral(neutral+1)
  const bad_click = ()=> setBad(bad+1);

  return (
    <div>
      <Para text={head1}/>
      <Button text={text1} onClick={good_click}/>
      <Button text={text2} onClick={neutral_click}/>
      <Button text={text3} onClick={bad_click}/>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App