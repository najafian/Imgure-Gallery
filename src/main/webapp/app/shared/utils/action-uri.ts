export enum ActionUri {
  // gallery = 'https://api.imgur.com/3/gallery/{{section}}/{{sort}}/{{window}}/{{page}}?showViral={{showViral}}&mature={{showMature}}&album_previews={{albumPreviews}}',
  gallery = 'https://api.imgur.com/3/gallery/1/{{sort}}/1/1.json?showViral=true&mature=true&album_previews=true',
  auth = '/auth',
  account = '/api/account'
}
