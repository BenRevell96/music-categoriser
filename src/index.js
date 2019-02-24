const {
  createAudioFileList,
  fileReader,
  handleTags,
  isSorted
} = require('./helpers.js')
const { folderPath } = require('./Constants.js')
console.time('timer')
// get list of audio filenames
const files = createAudioFileList(folderPath)

// loop over names and get file data
for (i = 0; i < files.length; i++) {
  // get the meta data of current file
  const fileMetaDataObj = fileReader(files[i])

  // check if labels are already added
  const commentObject = isSorted(fileMetaDataObj)
  if (commentObject && commentObject instanceof Array) {
    return
  }

  return handleTags(files[i], fileMetaDataObj)
}
console.timeEnd('timer')
