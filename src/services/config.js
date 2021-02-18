export const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('eduhub-user')).token
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}
