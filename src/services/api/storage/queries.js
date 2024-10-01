import axios from 'axios'

export async function uploadFile(uploadUrl, file) {
  if (!uploadUrl) {
    return
  }
  const headers = {
    'Content-Type': file.type,
  }
  await apiPutFile(uploadUrl.upload_url, headers, file).then(() =>
    console.log('Successfully uploaded')
  )
}

async function apiPutFile(url, headers, file) {
  return await axios.put(url, file, { headers: headers })
}
