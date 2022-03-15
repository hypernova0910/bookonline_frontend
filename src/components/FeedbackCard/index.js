import React from 'react';
import Rating from '@mui/material/Rating';

export default function FeedbackCard({feedback}){
    return (
        <div className='row my-4'>
            <div className='col-lg-2'>
                <h6>{feedback.writer_name}</h6>
                <div>{feedback.date_created ? new Date(feedback.date_created).toLocaleDateString() : ''}</div>
            </div>
            <div className='col-lg-10'>
                <Rating defaultValue={feedback.stars} readOnly/>
                <p>{feedback.content}</p>
            </div>
        </div>
    )
}