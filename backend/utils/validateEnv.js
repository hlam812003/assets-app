const { cleanEnv, port, str } = require("envalid");

module.exports = cleanEnv(process.env, {
	MYSQL_HOST: str(),
	MYSQL_USER: str(),
	MYSQL_PASSWORD: str(),
	MYSQL_DATABASE: str(),
	PORT: port(),
	SESSION_SECRET: str(),
});
