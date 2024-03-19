function assertIsDefined(value) {
	if (!value) {
		throw Error(`Expected 'value' to be defined, but received ${value}`);
	}
}

module.exports = assertIsDefined;
