const getFileType = (url) => {
  const index = url.lastIndexOf('.')
  return url.slice(index + 1)
}

module.exports = { getFileType }
