
const initiailState = {}

const reducers = (state = initiailState, action) => {
		return {
			...state,
			user: action.payload
	}
}

export default reducers