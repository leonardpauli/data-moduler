/* eslint no-console:0 */
import {log} from '../src/stringFromObject'

console.reset = ()=> process.stdout.write('\x1b\x63')
// console.reset()

import baseModule, {moduler} from './just-markdown'


// for (let i=0; i < 10; i++) console.log('\n')
// console.log('-----------------------------------------------------------------')



// Markdown (export API documentation using baseModule)
// baseModule.markdown.writeFile({
// 	outputFile: `${__dirname}/api-documentation.md`,
// 	includedPluginDescriptions: moduler.plugins,
// })

// const store = new moduler.tmpstore.Store()
// moduler.tmpstore.store = store // for CRUD actions
// baseModule.tmpstore.attach({store})
// baseModule.mutations.create.tmpstore()
// log(baseModule, 7)
// log(baseModule.modules, 10)

// const {User} = baseModule.modules
// log('\nCREATE')
// User.mutations.create.tmpstore({name: 'Hugo'})
// User.mutations.create.tmpstore({name: 'Hanna'})
// User.mutations.create.tmpstore({name: 'Erik'})
// log('\nLIST'); log(User.getters.list.tmpstore())
// log('\nLOAD'); log(User.getters.load.tmpstore({id: 0})())
// log('\nCREATE'); log(User.mutations.create.tmpstore({name: 'Lo'}))
// log('\nDELETE'); log(User.mutations.delete.tmpstore({id: '1'})())
// log('\nUPDATE'); log(User.mutations.update.tmpstore({id: '0'})({name: 'Hugosan'}))
// log('\nLIST'); log(User.getters.list.tmpstore({name: 'o'}))

// log(baseModule.modules.User)



// GraphQL (define API schema using baseModule)
const schema = baseModule.graphql.getSchema() // GraphQLSchema
// log(schema._mutationType, 4)

// Setup express
import express from 'express'
const app = express()

// Understand JSON in body
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Serve GraphQL endpoint using express
import GraphHTTP from 'express-graphql'
app.use('/graphql', GraphHTTP({
	schema,
	pretty: true,
	graphiql: true,
	rootValue: {baseModule}, // important for all default logic
}))


// Start serving
const APP_PORT = 3045
app.listen(APP_PORT, ()=> console.log(`serving at localhost:${APP_PORT}`))



console.log('-----------------------------------------------------------------')
for (let i=0; i < 10; i++) console.log('\n')