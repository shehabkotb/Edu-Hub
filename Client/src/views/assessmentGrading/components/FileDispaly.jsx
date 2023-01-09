import React from 'react'

import {
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FileOutlined,
  DownloadOutlined
} from '@ant-design/icons'
import { Button, Typography } from 'antd'

import PlagarismTag from '../../../components/PlagarismTag'

const { Text } = Typography

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
      {getFileType(file) === 'pdf' && (
        <Button
          type="link"
          style={{ fontSize: '16px' }}
          onClick={() => handleClick(file.url)}
        >
          {file.name}
        </Button>
      )}
      {getFileType(file) !== 'pdf' && (
        <Button href={file.url} type="link" style={{ fontSize: '16px' }}>
          {file.name}
          {<DownloadOutlined />}
        </Button>
      )}
      <PlagarismTag status={file.plagarismFileStatus} />
      {file.plagarismFileStatus === 'med' ||
        file.plagarismFileStatus === 'high' ||
        (file.plagarismFileStatus === 'veryHigh' && (
          <Text type="secondary">
            Copied from <Text strong>{file.plagiarisedFrom}</Text>
          </Text>
        ))}
    </div>
  )
}

const FileIcon = (props) => {
  const { fileType, ...rest } = props

  if (fileType === 'pdf') return <FilePdfOutlined {...rest} />
  else if (fileType === 'docx') return <FileWordOutlined {...rest} />
  else if (fileType === 'xls') return <FileExcelOutlined {...rest} />
  else return <FileOutlined style={{ marginRight: '6px', fontSize: '16px' }} />
}

export default FileDisplay
