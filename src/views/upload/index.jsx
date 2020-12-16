import React from 'react'

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const Upload = () => {
  // const handleSubmit = async (event) => {
  //   event.preventDefault()

  //   const formData = new FormData()
  //   formData.append('sampleFile', event.target.sampleFile.files[0])

  //   try {
  //     const res = await axios.post('http://localhost:4000/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     })
  //     console.log('success file was uploaded')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // return (
  //   <div>
  //     <form
  //       onSubmit={handleSubmit}
  //       id="uploadForm"
  //       action="http://localhost:4000/upload"
  //       method="post"
  //       encType="multipart/form-data"
  //     >
  //       <input type="file" multiple name="sampleFile" />
  //       <input type="submit" value="Upload!" />
  //     </form>
  //   </div>
  // )

  const courseID = 90751

  const getUploadParams = () => {
    return { url: `http://localhost:4000/course/${courseID}/upload-material` }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta))
    allFiles.forEach((f) => f.remove())
  }

  return (
    <Dropzone
      styles={{
        dropzone: {
          height: 'fit-content',
          overflow: 'hidden'
        },
        inputLabel: { borderStyle: 'dotted' }
      }}
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
    />
  )
}

export default Upload
