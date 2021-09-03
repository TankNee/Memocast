import { protocol, app } from 'electron'
import Store from 'electron-store'
import url from 'url'
import fs from 'fs-extra'
import mime from 'mime'
import path from 'path'
import log from 'electron-log'
import { cacheNoteImage, getTempNoteDir, isResourceExist } from './helper'

const ClientStorage = new Store({
  name: 'ClientFileStorage'
})

console.log = log.log
console.error = log.error
log.transports.file.resolvePath = () => path.join(app.getPath('userData'), 'logs', new Date().getFullYear().toString(), (new Date().getMonth() + 1).toString(), 'main.log')

async function resourceProtocolHandler (request, callback) {
  // eslint-disable-next-line node/no-deprecated-api
  const u = url.parse(request.url)
  let p = u.path
  while (p.startsWith('/')) {
    p = p.substr(1)
  }
  const parts = p.split('/')
  if (parts.length !== 3) {
    return callback(Error('invalid url, parts !== 4'))
  }
  const [kbGuid, docGuid, resName] = parts
  let resourcePath
  try {
    if (!isResourceExist(kbGuid, docGuid, resName)) {
      const resources = ClientStorage.get('currentResources') || []
      const resource = resources.find(r => r.name === resName)
      if (!resource) throw new Error('Resource Not Found')
      resourcePath = await cacheNoteImage(resource.url, kbGuid, docGuid, resName)
    } else {
      resourcePath = path.join(getTempNoteDir(kbGuid, docGuid, 'appData'), resName)
    }
  } catch (error) {
    log.error(error)
    return callback(error)
  }
  // eslint-disable-next-line standard/no-callback-literal
  callback({
    statusCode: 200,
    headers: {
      'content-type': mime.getType(resName)
    },
    data: fs.createReadStream(resourcePath)
  })
}

export function registerMemocastProtocol () {
  protocol.registerStreamProtocol(
    'memocast',
    async (request, callback) => {
      //
      const result = await resourceProtocolHandler(request, callback)
      return result
      //
    },
    error => {
      if (error) {
        console.error(`Failed to register protocol: ${error.message}`)
      }
    }
  )
}
