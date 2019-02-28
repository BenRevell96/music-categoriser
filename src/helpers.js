const fs = require('fs')
const taglib = require('taglib2')
const alias = require('macos-alias')

const { fileTypes, folderPath } = require('./Constants.js')

const createAudioFileList = folderPath =>
  fs
    .readdirSync(`${folderPath}`, { withFileTypes: true })
    .filter(fileName => fileTypes.some(v => fileName.indexOf(v) >= 0))

const fileReader = fileName =>
  taglib.readTagsSync(`${folderPath}/${fileName}`.toString())

const isSorted = ({ comment }) => {
  try {
    JSON.parse(comment)
  } catch (e) {
    return false
  }
  return JSON.parse(comment)
}

const clearExistingComment = (fileName, metaDataObj) =>
  taglib.writeTagsSync(`${folderPath}/${fileName}`.toString(), {
    ...metaDataObj,
    comment: ''
  })

const checkTagPlaylistExists = playlist =>
  fs.existsSync(`${folderPath}/${playlist}`)

const writeFileToTagPlaylist = (fileName, playlist) => {
  const fileAlias = alias.create(`${folderPath}/${fileName}`)
  console.log(fileAlias)
}

const createPlaylist = playlistName =>
  fs.mkdirSync(`${folderPath}/${playlistName}`)

const handleTags = (fileName, { comment = '' }) => {
  const tags = comment.split(',') || []

  // remove comment if non tag comment exists
  if (tags.length === 1 && comment.length > 15) {
    return clearExistingComment(fileName, metaDataObj)
  }

  for (i = 0; i < tags.length; i++) {
    const tagExists = checkTagPlaylistExists(tags[i])
    if (tagExists) {
      return writeFileToTagPlaylist(fileName)
    } else {
      // here we should ask to create folder as an improvement
      createPlaylist(tags[i])
      writeFileToTagPlaylist(fileName)
    }
  }
}

module.exports = {
  createAudioFileList,
  fileReader,
  handleTags,
  isSorted
}
