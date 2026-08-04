import { Scrypt } from 'lucia'
import { createInterface } from 'node:readline/promises'

const prompt = createInterface({ input: process.stdin, output: process.stdout, terminal: true })
const password = await prompt.question('Choose a strong, unique administrator password: ')
await prompt.close()
if (password.length < 16) throw new Error('Use at least 16 characters for the administrator password.')
console.log(await new Scrypt().hash(password))
