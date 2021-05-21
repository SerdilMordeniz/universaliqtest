import React, { useState } from 'react'
import IQTestApp from '../components/IQTestApp'
import Formular from './Formular'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

const IqApp = () => {
  let [itemNumber, setItemNumber] = useState(1)
  let [timeForItem, setTimeForItem] = useState([0])
  let [elapsed, setElapsed] = useState(0)
  let [correctAnswers, setCorrectAnswers] = useState(0)

  const handleCorrectAnswer = () => {
    let numberOfCorrectAnswers = correctAnswers + 1
    setCorrectAnswers(numberOfCorrectAnswers)
    nextItem()
  }

  const onTimeChange = (elapsedTime) => {
    setElapsed(elapsedTime)
  }

  const nextItem = () => {
    let nextItem = itemNumber + 1
    setItemNumber(nextItem)
  }

  const measureItemTime = () => {
    setTimeForItem([...timeForItem, elapsed - timeForItem.reduce((accumulator, currenValue) => accumulator + currenValue)])
  }

  return (
    (itemNumber <= 10) ?
      <Router>
        <Redirect to="/iq-test-app" />

        <div>
          <IQTestApp
            itemNumber={itemNumber}
            nextItem={nextItem}
            timeForItem={timeForItem}
            measureItemTime={measureItemTime}
            onTimeChange={onTimeChange}
            elapsed={elapsed}
            correctAnswers={correctAnswers}
            handleCorrectAnswer={handleCorrectAnswer} />
        </div>

      </Router> :
      <Router>

        <Formular elapsed={elapsed}
          timeForItem={timeForItem}
          correctAnswers={correctAnswers}
          nextItem={nextItem}
          measureItemTime={measureItemTime}
        />

      </Router>


    //iqTestSwitchToFormular()
  )
}

export default IqApp
