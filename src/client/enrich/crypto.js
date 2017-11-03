import { Buffer } from 'buffer'
import { publicEncrypt, constants } from 'crypto'

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDH/b8R+bDeOArUlvxe7nN1gPTO
oV3YmuwQoqH2B1TjfaADBMzZYnRJg+uBJ0dSYzGBj5yR/6jNNJG9ElM9oIXe4BZ5
YGeAeUmdars9lgdbN3sYf9pV7EZhuu7ClxSC75L0Ni8HlOhHXx6fS2VxN0Y8d5bY
VeuD+WMDoxqaTJt80QIDAQAB
-----END PUBLIC KEY-----`

export const encrypt = origin => {
  const buffer = Buffer.from(encodeURI(JSON.stringify(origin)))
  const blocks = Math.ceil(buffer.length / 117)
  const cipherBuffer = Buffer.alloc(blocks * 128)
  for (let i = 0; i < blocks; i++) {
    const chunk = buffer.slice(i * 117, (i + 1) * 117)
    publicEncrypt({
      key: publicKey,
      padding: constants.RSA_PKCS1_PADDING
    }, chunk).copy(cipherBuffer, i * 128)
  }
  return cipherBuffer.toString('base64')
}

export default {
  install (Vue, options) {
    if (this.installed) return

    this.installed = true

    Object.defineProperties(Vue.prototype, {
      $encrypt: {
        get () {
          return encrypt
        }
      }
    })
  }
}
