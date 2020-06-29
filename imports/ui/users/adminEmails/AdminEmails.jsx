import React, { useState, useEffect } from 'react'

export default () => {
  const [emails, setEmails] = useState([])

  useEffect(() => {
    Meteor.call('users.adminEmails.get', (error, result) => {
      setEmails(result)
    })
  }, [])

  return (
    <span>{emails.join(',')}</span>
  )
}

