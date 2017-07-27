import {getFieldNormaliser} from './getFieldsNormaliser'


// getActionNormaliser -> (...) -> actionNormaliser
const getActionNormaliser = ({dataTypes})=> (module, fieldNormaliser)=> action=> {
	const {BOOLEAN} = dataTypes


	// type
	// default to parent module?
	// throw new Error(`data-moduler: action/getter ${actionName}
	// 	in module ${module.name} needs a type field`)
	// const typeKeyNamed = Object.keys(dataTypes).find(k=>
	// 	Object.keys(action).indexOf(k)>=0)
	// const typeKey = typeKeyNamed || 'type'
	// if (!action[typeKey]) action.type = BOOLEAN.type
	// action.type = fieldNormaliser({[typeKey]: action[typeKey]}).type
	// if (typeKeyNamed) delete action[typeKeyNamed]
}


// singleActionsNormaliser
const getSingleActionsNormaliser = actionNormaliser=> ({defaults, custom, preNormaliseAction})=> {
	const actions = Object.assign({}, custom)

	// extend or remove default actions
	Object.keys(defaults).forEach(k=> {
		if (actions[k]===undefined) actions[k] = {}
		if (!actions[k]) return delete actions[k]

		actions[k] = Object.assign({}, defaults[k], actions[k])
	})

	// process action
	Object.keys(actions).forEach(actionName=> {
		const action = actions[actionName]
		preNormaliseAction(action)
		actionNormaliser(action)
	})

	return actions
}



// getActionsNormaliser
const getActionsNormaliser = _moduler=> module=> {
	const mutations = module.mutations = module.mutations || {}
	mutations.lol = 123123

	// 1. first: get plugin adapters + default adapter
	// // default: mutation: (context, fn)=> fn(context) // just pass context directly
	// adapters:
	// 	mutation: (context, fn)=> fn({...context, lala:123}, state)
	// 		// optionally transform context, and/or call fn differently
	// 			(ie. like it would be done usually in the target
	// 				(ie. for veux actions, commit fn is passed))
	// 	fetcher: (context, fn)=> fn(context)
	// 	-> [namespace]: mutation...
	// 	--
	// 	2. wrap all mutations in corresponding adapters
	// 	3. write typeReducer for tmpstore, to use mutations
	// 	4. plan more
	// 	5. same but for fetchers
	// 	6. try actions/getters (allow to use other plugin mutations/fetchers/actions/getters if available)
	// 	  (do that with a new simple demo exposer (tmpexposer), not graphql yet)
	// 		ie. graphgl fetcher uses tmpstore fetcher (or getter?), with some processing in between
	// 	diff: fetchers/mutations are tinier and more atomic than getters/actions
	// 	7. Markdown plugin support actions (write them out somehow with optional comments and examples maybe)
	// 	8. test relations
	// 	9. commit
	// 	10. simple graphql support (similar to tmpexposer, maybe wait with relations)
	// 	11. graphql relations support
	// 	12. commit
	// 	13. write CRUD actions for one model, inc. relations
	// 	14. fix CRUD plugin to auto add actions to entities
	// 	15. commit
	// 	16. make relations bi-directional (even though only defined once, ie. auto add field to other)
	// 	17. commit
	// 	plan some more
	// 	sequelize plugin
	// 	. commit
	// 	plan some for access-control and validation
	// 	access-control / authorised field
	// 	. commit
	// 	validation
	// 	. commit
	


	// ----
	// const {actions: rawActions, getters: rawGetters} = module

	// const fieldNormaliser = getFieldNormaliser(moduler)(module)
	// const actionNormaliser = getActionNormaliser(moduler)(module, fieldNormaliser)
	// const singleActionsNormaliser = getSingleActionsNormaliser(actionNormaliser)

	// const getters = singleActionsNormaliser({
	// 	key: 'actions',
	// 	module,
	// 	// defaultGetters = getDefaultGetters(moduler)(module) from plugins
	// 	// 		naah, rather just let the plugins add actions themselves
	// 	// 		move out as much as possible to the plugins, as long as repetition can be avoided
	// 	// 			ie. maybe provide a helper for setting actions if it involves a lot of code,
	// 	// 				but as long as it doesn't, don't
	// 	// custom: module[key],
	// 	preNormaliseAction: fields=> {
	// 		fields.method = fields.method || 'GET'
	// 	},
	// })

	// // const defaultActions = getDefaultActions(moduler)(module)
	// // const actions = singleActionsNormaliser(defaultActions, rawActions, fields=> {
	// // 	fields.method = fields.method || 'POST'
	// // })

	// return { actions, getters }
}



// export
export default getActionsNormaliser
