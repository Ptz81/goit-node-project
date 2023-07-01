const db = require('./db');
const { Command } = require('commander');

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const allContacts = await db.listContacts();
            return console.log(allContacts);
        case 'get':
            const oneContact = await db.getContactById(id);
            return console.log(oneContact);
        case 'add':
            const newContact = await db.addContact({name, email, phone});
            return console.log(newContact);
        case 'update':
            const updateById = await db.updateContact(id, { name, email, phone });
            return console.log(updateById);
        case 'remove':
            const removeById = await db.removeContact(id);
            return console.log(removeById);
    default:
      console.warn('\x1B[31m Unknown action type!');
    }
}
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();
invokeAction(argv);