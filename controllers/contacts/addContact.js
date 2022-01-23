const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')
const listContacts = require('./listContacts')

const contactsPath = path.join('db', 'contacts.json')

const addContact = async (name, email, phone) => {
  const newContact = { id: v4(), name, email, phone }
  const contacts = await listContacts()
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  console.log('The contact has been successfully added')
  return newContact
}

module.exports = addContact
