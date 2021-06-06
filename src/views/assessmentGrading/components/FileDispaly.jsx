import React from 'react'

import {
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FileOutlined
} from '@ant-design/icons'
import { Button } from 'antd'

const FileDisplay = (props) => {
  const { files, handleClick } = props
  return (
    <>
      {files.map((file, index) => {
        return <FileItem key={index} file={file} handleClick={handleClick} />
      })}
    </>
  )
}

const FileItem = (props) => {
  const { file, handleClick } = props

  const getFileType = (file) => {
    const index = file.url.lastIndexOf('.')
    return file.url.slice(index + 1)
  }

  return (
    <div style={{ width: '100%', marginTop: '6px' }}>
      <FileIcon
        style={{ marginRight: '6px', fontSize: '16px' }}
        fileType={getFileType(file)}
      />
      <Button
        type="link"
        style={{ fontSize: '16px' }}
        onClick={() => handleClick(file.url)}
      >
        {file.name}
      </Button>
    </div>
  )
}

const FileIcon = (props) => {
  const { fileType, ...rest } = props

  if (fileType === 'pdf') return <FilePdfOutlined {...rest} />
  else if (fileType === 'docx') return <FileWordOutlined {...rest} />
  else if (fileType === 'xls') return <FileExcelOutlined {...rest} />
  else return <FileOutlined />
}

export default FileDisplay
