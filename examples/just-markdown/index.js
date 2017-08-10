// Simple usage of DataModuler


// Setup the moduler (DataModuler) with plugins
import DataModuler, {plugins} from '../../src'
const {markdown, tmpstore} = plugins
export const moduler = new DataModuler({
	plugins: [tmpstore()],
})

// Define the modules (User, Note)
const { allowNull, isStatic } = moduler.dataFlags
const { STRING, BOOLEAN, INT, SELF } = moduler.dataTypes

const Color= {
	fields: {
		hex: STRING,
	},
	mutations: {
		create: {
			// User,
			// BOOLEAN,
			// type: User,
			// type: INT,

			// input: User,
			// input: INT,
			default: context=> console.warn(
				'mutation not implemented /or/ implementation not supported in this platform', context),
			tmpstore: context=> console.dir({mutation: context.hello, context}),
		},
	},
}
const User = {
	modules: {
		// Color,
	},
	fields: {
		// lal: SELF,
		name: STRING,
		// rang1: Color,
		// rang2: {type: Color},
		// title: { STRING, allowNull,
		// 	comment: '*ie.* CEO, or Happiness Hero',
		// },
	},
	// getters: {
	// 	uppercaseName: { STRING,
	// 		tmpstore: ({self})=> self.name.toUpperCase(),
	// 	},
	// 	masterUserName: { SELF, isStatic,
	// 		default: props=> console.dir({MASTER: props}) || 'MASTER',
	// 	},
	// },
	// mutations: {
	// 	changeName: {
	// 		input: {name: STRING},
	// 		tmpstore: ({hello, self}, {name})=> `${hello}, ${self.name} -> ${name} !!!`,
	// 	},
	// 	create: { SELF, isStatic,
	// 		input: {
	// 			name: STRING,
	// 			password: STRING,
	// 		},
	// 		tmpstore: ({input: {name, password}})=> `${name} + ${password}`,
	// 	},
	// 	sendEmailToAll: { isStatic, // isStatic if SELF isn't necessary as input
	// 		default: ()=> 'sending email...',
	// 	},
	// },
}

// const actionInputNormaliser =
// 	({action, args, root: {req: {user}, res}, module})=>
// 		({user, module})

const Note = {
	comment: '*Tips:* Write one note every day in the morning',
	fields: {
		text: STRING,
		user: User,
	},
	// mutations: {
	// 	set: {
	// 		sql: ({module: {type: {sql: model}}})=> model.create('...'),
	// 		vuex: ({module: {name}})=> ({state}, data)=> state.xx = data, // vuex plugin has own normaliser
	// 			// this becomes a mutation called like $store.commit(`${module.name}/set`, data)
	// 		// authorised: ({_user})=> false, // only accessable from actions
	// 	},
	// },
	// actions: {
	// 	create: {
	// 		fn: ({module, user})=> ({text})=> module.mutations.set({text: `${user.name}: ${text}`}),
	// 		authorised: ({user})=> !!user,
	// 	},
	// },
	// fetchers: {
	// 	get: {
	// 		shared: {},
	// 		vuex: ()=> {},
	// 	},
	// },
	// getters: {
			// list: ({get})=> get(`...`),
			// load: {
			// 	fn: (fetchers)=> fetchers.get('...'),
			// 	authorised: '...',
			// },
	// },

}

// Parse the base module (including all the models)
const rawBaseModule = {
	name: 'DemoAPI',
	title: 'Simple, markdown only, demo',
	comment: 'In this example, we got the specs for a note-taking tool.',
	modules: {User},
}
const baseModule = moduler.parse(rawBaseModule)
export default baseModule
