// data-moduler
// Created by Leonard Pauli, July 2017 (to-classes started 1 oct)
// Copyright Leonard Pauli, All rights reserved

import DataModule, {validateAgainstFields} from './DataModule'

import flags from './flags'
import dataTypes from './dataTypes'

import plugins from './plugins'
import destinations from './destinations'

import modulate from './modulate'
import ValidationError from './ValidationError'
import {
	performModuleModification,
	performModuleModifications,
} from './moduleModifications'

// only inported to run setup scripts
import initialSetup from './initialSetup'

export {
	DataModule,
	dataTypes, flags,
	plugins, destinations,
	modulate,
	ValidationError,
	validateAgainstFields,
	performModuleModification,
	performModuleModifications,
}

export default class DataModuler {
	
}