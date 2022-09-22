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

export function mapPhaseToTarget(type: 'piecewise' | 'periodic'): PhaseTargets {
	switch (type) {
		case 'piecewise':
			return PhaseTargets.TIMESTAMP;
		case 'periodic':
			return PhaseTargets.DURATION;
	}
}

export function mapTargetToPhase(type: 'timestamp' | 'duration'): PhaseTypes {
	switch (type) {
		case 'timestamp':
			return PhaseTypes.PIECEWISE;
		case 'duration':
			return PhaseTypes.PERIODIC;
	}
}
