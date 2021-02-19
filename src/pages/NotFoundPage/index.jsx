import React from 'react'
import Exception from 'ant-design-pro/lib/Exception'

const NotFoundPage = () => {
  return (
    <Exception
      type="404"
      desc="The Page you are looking for doesn't exist"
      redirect="/app"
    />
  )
}

export default NotFoundPage
