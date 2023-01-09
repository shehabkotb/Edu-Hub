const logger = (store) => (next) => (action) => {
  console.group(action.type)
  console.log('Action is:', action)
  let retVal = next(action)
  console.log('Next state is:', store.getState())
  console.groupEnd()
  return retVal
}

export default logger
