import React from 'react';
import moment from 'moment';

const TimelineDate = (props) => {
  // console.log('tld', props)
  const date = moment(props.timeStamp).format("DD MMM YYYY")
  return(
    <div>{date}</div>
  )
}

export default TimelineDate
