import React from 'react'

import {
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FileOutlined
} from '@ant-design/icons'

const FileDisplay = (props) => {
  const { files } = props
  return (
    <>
      {files.map((file, index) => {
        return <FileItem key={index} file={file} />
      })}
    </>
  )
}

const FileItem = (props) => {
  const { file } = props

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
      <a style={{ fontSize: '16px' }} href={file.url}>
        {file.name}
      </a>
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
