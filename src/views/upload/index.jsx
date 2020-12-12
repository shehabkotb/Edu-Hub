import React, { useState } from 'react'
import axios from 'axios'

const Upload = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('sampleFile', event.target.sampleFile.files[0])

    try {
      const res = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('success file was uploaded')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        id="uploadForm"
        action="http://localhost:4000/upload"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="sampleFile" />
        <input type="submit" value="Upload!" />
      </form>
    </div>
  )
}

export default Upload
