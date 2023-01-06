export const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('eduhub-user')).token
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const getMultiPartAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('eduhub-user')).token
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  }
}

export const getS3Credintials = () => ({
  accessKeyId: '',
  secretAccessKey: ''
})
