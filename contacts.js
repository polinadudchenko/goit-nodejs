const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join('db', 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const allContacts = JSON.parse(data)
  return allContacts
}

const getContactById = async contactId => {
  const allContacts = await listContacts()
  const contact = allContacts.find(item => item.id === contactId)
  if (!contact) {
    return null
  }
  return contact
}

const addContact = async (name, email, phone) => {
  const newContact = { id: v4(), name, email, phone }
  const contacts = await listContacts()
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const removeContact = async contactId => {
  const contacts = await listContacts()
  const contactIdx = contacts.findIndex(
    item => item.id === contactId.toString(),
  )
  if (contactIdx === -1) {
    return null
  }
  const contactToDelete = contacts[contactIdx]
  contacts.splice(contactIdx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contactToDelete
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}
