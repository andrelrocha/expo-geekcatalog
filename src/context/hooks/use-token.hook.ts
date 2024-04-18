import { useEffect, useState } from "react"

import { identity } from "../../libs/functional"
import { getToken, setToken } from "../../modules/auth.module"

type UseTokenOptions = {
  onGetToken?: <T>(str: T) => void
  onSetToken?: <T>(str: T) => void
}

const useToken = (opts?: UseTokenOptions) => {
  const _onGetToken = opts?.onGetToken || identity
  const _onSetToken = opts?.onSetToken || identity

  const [internalToken, setInternalToken] = useState<string | null>()

  const _setToken = (token: string) =>
    setToken(token).then(() => (setInternalToken(token), _onSetToken(token)))

  const _getToken = () => getToken().then((token) => (setInternalToken(token), _onGetToken(token)))

  useEffect(() => {
    _getToken()
  }, [])

  return [_setToken, { data: internalToken }] as [
    (token: string) => Promise<void>,
    { data: string | null | undefined },
  ]
}

export default useToken