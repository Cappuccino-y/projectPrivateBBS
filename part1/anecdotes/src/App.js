import { useState } from 'react'

const Button = ({text,Onclick})=> <button onClick={Onclick}>{text}</button>
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [voteNum, setVoteNum] = useState(anecdotes.map(_=>0))
  const [maxIndex, setMax] = useState(0)

  const Change= ()=> {
      while (true){
          const geneNum=Math.floor(Math.random()*anecdotes.length)
          if (geneNum!==selected) return setSelected(geneNum)}}

  const Vote= ()=> {
      const points=voteNum
      points[selected]++
      const copy= [...points]
      if (points[maxIndex]<points[selected])setMax(selected)
      setVoteNum(copy)
  }



  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <Button text="vote" Onclick={Vote}/>
      <Button text="nextanecdote" Onclick={Change}/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndex]}
        <h1>Current maximal votes: {voteNum[maxIndex]} </h1>
        <h1>Current votes: {voteNum[selected]} </h1>
    </div>
  )
}

export default App