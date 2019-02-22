const fs = require('fs')
const audioMetaData = require('audio-metadata')

const { fileTypes } = require('./Constants.js')

// todo these can all be sync 🚨🚨🚨🚨🚨

const extractAudioFiles = fileName => {
  return fileTypes.some(v => fileName.indexOf(v) >= 0)
}

const createAudioFileList = folderPath =>
  new Promise(resolve => {
    fs.readdir(`${folderPath}`, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err)
      }
      return resolve(files.filter(fileName => extractAudioFiles(fileName)))
    })
  })

const readAudioFile = (folderPath, file) =>
  new Promise(resolve => {
    fs.readFile(`${folderPath}/${file}`, (err, data) => {
      if (err) {
        console.log(err)
      }
      console.log(audioMetaData.ogg(data))
      // console.log(data)
      resolve(data)
    })
  })
module.exports = {
  createAudioFileList,
  readAudioFile,
}
