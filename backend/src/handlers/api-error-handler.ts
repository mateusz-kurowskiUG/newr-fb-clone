import DBMessage from '../enums/DBMessage'

interface IApiErrorHanglerReturn {
  error: string
}

const apiErrorHandler = ({ error, set }): IApiErrorHanglerReturn => {
  switch (error.message) {
    case DBMessage.NOT_AVAILABLE:
      set.status = 503
      return { error: error.message }

    case DBMessage.INVALID_ARGUMENT:
      set.status = 400
      return { error: error.message }

    case DBMessage.DOES_NOT_EXIST:
      set.status = 404
      return { error: error.message }

    default:
      set.status = 404
      return { error: error.message }
  }
}
export default apiErrorHandler
