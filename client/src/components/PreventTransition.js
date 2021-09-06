import React from 'react'
import { Prompt } from 'react-router-dom'

function PreventTransition(props) {
    return (
        <div>
            <Prompt
                when={props.preventTransition}
                message={location =>
                    `Are you sure you want to go to universaliqtest.com${location.pathname}. You will lose all the answers and have to start from scratch.`
                }
            />
        </div>
    )
}

export default PreventTransition
