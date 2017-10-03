import {DataType, getTypeInstance} from './dataTypes'

export class Action {
	inputType = undefined
	returnType = undefined
	defaultFn = undefined

	constructor (config = {}) {
		const {fn, input, returns, Module} = config
		
		if (fn!==void 0) {
			if (typeof fn!=='function')
				throw new Error(`expected fn to be function, but got ${typeof fn}`)
			this.defaultFn = fn
		}

		if (input!==void 0)
			this.inputType = getTypeInstance(input, {Module})

		if (returns!==void 0)
			this.returnType = getTypeInstance(returns, {Module})
	}

	toJSON () {
		return {
			input: this.inputType,
			returns: this.returnType,
			fn: this.defaultFn,
		}
	}
}

export class Getter extends Action {
	static isGetter = true

	toJSON () {
		return {...super.toJSON(), isGetter: true}
	}
}

// normalize action field into action instance
export const getActionInstance = (objectOrAction, {Module, isGetter})=> {

	// new Action({...config})
	if (objectOrAction instanceof Action) {
		if (objectOrAction.constructor.isGetter != isGetter)
			throw new Error(`expected action.isGetter to be ${!!isGetter}, `
				+`but got ${!!objectOrAction.constructor.isGetter}`)
		return objectOrAction
	}

	// ()=> ie. send email or throw
	if (typeof objectOrAction==='function')
		return new (isGetter?Getter:Action)({fn: objectOrAction, Module})

	if (typeof objectOrAction!=='object')
		throw new Error(`expected Action instance, fn, or config object, but got ${typeof objectOrAction}`)

	return new (isGetter?Getter:Action)({...objectOrAction, Module})

	// TODO: check cases:
	// - ql object // ql/querylanguage is a plugin

},