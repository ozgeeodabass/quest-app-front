import React from 'react'
import {useParams} from 'react-router-dom'

export default function User() {
    let {userId} = useParams();

  return (
    <div>User: {userId}</div>
  )
}
