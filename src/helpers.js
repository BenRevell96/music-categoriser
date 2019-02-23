const fs = require('fs')

const { fileTypes } = require('./Constants.js')

const extractAudioFiles = fileName =>
  fileTypes.some(v => fileName.indexOf(v) >= 0)

const createAudioFileList = folderPath =>
  fs
    .readdirSync(`${folderPath}`, { withFileTypes: true })
    .filter(fileName => extractAudioFiles(fileName))

module.exports = {
  createAudioFileList
}
