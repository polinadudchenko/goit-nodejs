const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join('db', 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const allContacts = JSON.parse(data)
  return allContacts
}

module.exports = listContacts
