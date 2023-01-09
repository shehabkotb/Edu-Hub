import axios from 'axios'

const check = async (text) => {
  console.log(text)
  try {
    const response = await axios.post(
      '',
      { body: text }
    )
    const res = response.data
    if (res == "1") {
      return false
    } else {
      return true
    }
  } catch (error) {
    console.log(error)
    return true
  }
}

const checkModerationService = { check }

export default checkModerationService
