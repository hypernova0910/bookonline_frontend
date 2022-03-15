import React from 'react'
import FeedbackCard from '../FeedbackCard'

export default function FeedbackList(props){
    return props.feedbacks.map((feedback) => (
        <FeedbackCard key={feedback.id} feedback={feedback}/>
    ))
}