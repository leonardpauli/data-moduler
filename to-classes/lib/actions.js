// @flow
import {getTypeInstance, type DataTypeType} from './dataTypes'
import {type DataModuleClassType} from './DataModule'
import context from './context'


export class Action {
	static isGetter = false

	name: string // fieldName
	inputType: DataTypeType<*>
	returnType: DataTypeType<*>
	defaultFn: mixed=> *
	fn: Object=> * // wrapped defaultFn, during modulate
	data: Object

	constructor (config: Object = {}) { this.update(config) }
	update (config: Object = {}) {
		const {fn, input, returns, Module, actionName, ...data}
			= Object.assign(this.toJSON(), config)
		// const self = (...args)=> self.fn.bind(self)(...args)
		// self.constructor = this.constructor
		// Object.freeze(this)

		this.data = data
		
		if (fn!==void 0) {
			if (typeof fn!=='function')
				throw new Error(`expected fn to be function, but got ${typeof fn}`)
			this.defaultFn = fn
		}

		if (input!==void 0)
			this.inputType = getTypeInstance(input, {Module})

		if (returns!==void 0)
			this.returnType = getTypeInstance(returns, {Module})

		if (actionName!==void 0)
			this.name = actionName

		if (Module!==void 0)
			this.fn = (value: mixed, baseCtx)=> {
				// $FlowFixMe
				const ctx = context.get({Module, action: this}, baseCtx)
				console.log(value)
				const input = this.inputType.validate(value, {Module})
				return this.defaultFn({...baseCtx, ...ctx, input})
			}
	}

	get function (): (*)=> * {
		const self = (...args)=> this.fn.bind(this)(...args)
		self.action = this
		return self
	}

	toJSON () {
		return {
			input: this.inputType,
			returns: this.returnType,
			fn: this.defaultFn,
			data: this.data,
		}
	}
}
export type ActionType = Action

export class Getter extends Action {
	static isGetter = true

	toJSON () {
		return {...super.toJSON(), isGetter: true}
	}
}

// normalize action field into action instance
export const getActionInstance = (
	objectOrAction: Object | Action,
	{Module, isGetter}: {Module: DataModuleClassType, isGetter: boolean}
)=> {

	// new Action({...config})
	if (objectOrAction instanceof Action) {
		if (objectOrAction.constructor.isGetter != isGetter)
			throw new Error(`expected action.isGetter to be ${String(!!isGetter)}, `
				+`but got ${String(!!objectOrAction.constructor.isGetter)}`)
		return objectOrAction
	}

	// ()=> ie. send email or throw
	if (typeof objectOrAction==='function')
		return new (isGetter?Getter:Action)({fn: objectOrAction, Module})

	if (typeof objectOrAction!=='object')
		throw new Error('expected Action instance, fn, or '
			+`config object, but got ${typeof objectOrAction}`)

	return new (isGetter?Getter:Action)({...objectOrAction, Module})

	// TODO: check cases:
	// - ql object // ql/querylanguage is a plugin

}