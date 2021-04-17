// old way to upload

// import React, { useState } from 'react'

// import 'react-dropzone-uploader/dist/styles.css'
// import Dropzone from 'react-dropzone-uploader'

// import { Typography, Button, Modal, Form, Input, List } from 'antd'

// const Upload = () => {
//   // const handleSubmit = async (event) => {
//   //   event.preventDefault()

//   //   const formData = new FormData()
//   //   formData.append('sampleFile', event.target.sampleFile.files[0])

//   //   try {
//   //     const res = await axios.post('http://localhost:4000/upload', formData, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data'
//   //       }
//   //     })
//   //     console.log('success file was uploaded')
//   //   } catch (err) {
//   //     console.log(err)
//   //   }
//   // }
//   // return (
//   //   <div>
//   //     <form
//   //       onSubmit={handleSubmit}
//   //       id="uploadForm"
//   //       action="http://localhost:4000/upload"
//   //       method="post"
//   //       encType="multipart/form-data"
//   //     >
//   //       <input type="file" multiple name="sampleFile" />
//   //       <input type="submit" value="Upload!" />
//   //     </form>
//   //   </div>
//   // )

//   const courseId = '6071bc6237d90440749b0d0c'
//   const moduleId = '607290a4835a88203427158d'

//   const [form] = Form.useForm()

//   const getUploadParams = ({ file, meta }) => {
//     // debugger
//     const body = new FormData()
//     body.append('file', file)
//     body.append('title', form.getFieldValue('title'))
//     body.append('type', form.getFieldValue('type'))
//     return {
//       url: `http://localhost:4000/courses/${courseId}/modules/${moduleId}/module-item`,
//       body
//     }
//   }

//   const handleChangeStatus = ({ meta }, status) => {
//     console.log(status, meta)
//   }

//   const handleSubmit = (files, allFiles) => {
//     console.log(files.map((f) => f.meta))
//     allFiles.forEach((f) => f.remove())
//   }

//   // return (
//   //   <Dropzone
//   //     styles={{
//   //       dropzone: {
//   //         height: 'fit-content',
//   //         overflow: 'hidden'
//   //       },
//   //       inputLabel: { borderStyle: 'dotted' }
//   //     }}
//   //     getUploadParams={getUploadParams}
//   //     onChangeStatus={handleChangeStatus}
//   //     onSubmit={handleSubmit}
//   //   />
//   // )

//   return (
//     <>
//       <Form
//         name="add Course"
//         form={form}
//         // onFinish={addCourse}
//         requiredMark={false}
//         labelCol={{ span: 6 }}
//         wrapperCol={{ span: 18 }}
//       >
//         <Form.Item
//           name="title"
//           label="Title"
//           rules={[
//             {
//               required: true,
//               message: 'Please enter the name'
//             }
//           ]}
//         >
//           <Input placeholder="file name" />
//         </Form.Item>

//         <Form.Item name="type" label="type">
//           <Input.TextArea placeholder="(Optional)" allowClear />
//         </Form.Item>

//         <Dropzone
//           styles={{
//             dropzone: {
//               height: 'fit-content',
//               overflow: 'hidden'
//             },
//             inputLabel: { borderStyle: 'dotted' }
//           }}
//           getUploadParams={getUploadParams}
//           onChangeStatus={handleChangeStatus}
//         />

//         {/* <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item> */}
//       </Form>
//     </>
//   )
// }

// export default Upload
