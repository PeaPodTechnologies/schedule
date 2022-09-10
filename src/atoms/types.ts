/**
 * enum declarations
 */

/**
 * enum of types a peapod's phase
 */
export enum PhaseTypes {
	PIECEWISE = 'piecewise',
	PERIODIC = 'periodic'
}

export enum PhaseTargets {
	TIMESTAMP = 'timestamp',
	DURATION = 'duration'
}

/**
 * mapping function declarations
 */

export function mapPhaseToTarget(type: PhaseTypes): PhaseTargets {
	switch (type) {
		case PhaseTypes.PIECEWISE || 'piecewise':
			return PhaseTargets.TIMESTAMP;
		case PhaseTypes.PERIODIC || 'periodic':
			return PhaseTargets.DURATION;
	}
}

export function mapTargetToPhase(type: PhaseTargets): PhaseTypes {
	switch (type) {
		case PhaseTargets.TIMESTAMP || 'timestamp':
			return PhaseTypes.PIECEWISE;
		case PhaseTargets.DURATION || 'duration':
			return PhaseTypes.PERIODIC;
	}
}
