import {performModuleModifications} from './moduleModifications'
import {dataTypes, getActionInstance} from './dataTypes'
const {getTypeInstance} = dataTypes

// normalises fields
// text: String, -> text: new STRING(config),
export const modulateFields = ({Module, fields})=> {
	const resFields = {}
	Object.keys(fields).forEach(fieldName=> {
		const objectOrRawType = fields[fieldName]
		const typeInstance = getTypeInstance(objectOrRawType, {Module})
		resFields[fieldName] = typeInstance
	})
	return resFields
}

// normalises actions
// ql/querylanguage is a plugin
// create: ql | new Action(config) | fn | config, -> create: new Action(config),
export const modulateActions = ({Module, fields, isGetter})=> {
	const resFields = {}
	Object.keys(fields).forEach(fieldName=> {
		const objectOrAction = fields[fieldName]
		const actionInstance = getActionInstance(objectOrAction, {Module, isGetter})
		resFields[fieldName] = actionInstance
	})
	return resFields
}

// normalises fields and actions/getters
// + executes moduleModifications matching self's submodule tree
const modulate = Module=> {
	Module.fields = modulateFields({Module, fields: Module.fields})
	Module.actions = modulateFields({Module, fields: Module.actions})
	Module.getters = modulateFields({Module, fields: Module.getters, isGetter: true})

	Module.moduleModifications = performModuleModifications(
		Module.moduleModifications, [Module, ...Module.allSubmodules()])
}
export default modulate
