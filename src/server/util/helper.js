import { privateDecrypt, constants } from 'crypto'
import { privateKey } from '../config/auth'

const blockDecrypt = block => {
  try {
    const decrypted = privateDecrypt({
      key: privateKey,
      padding: constants.RSA_PKCS1_PADDING
    }, block)
    return decrypted
  } catch (err) {
    if (block.length === 128) {
      return blockDecrypt(block.slice(0, 127))
    }

    throw err
  }
}

export const decrypt = cipher => {
  if (!cipher) {
    throw new Error('ciper cannot be null')
  }

  let rtn = ''

  const buffer = Buffer.from(cipher, 'base64')
  const blocks = Math.ceil(buffer.length / 128)

  for (let i = 0; i < blocks; i++) {
    rtn += blockDecrypt(buffer.slice(i * 128, (i + 1) * 128))
  }

  return decodeURI(rtn)
}
