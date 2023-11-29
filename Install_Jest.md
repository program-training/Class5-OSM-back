#package.json

"scripts": {

    "test": "cross-env NODE_ENV=test jest --testTimeout=1000"

},

// copy in down package.json

"jest": {
"testMatch": [
"**/src/**/*.test.ts"
],
"roots": [
"<rootDir>/src"
],
"preset": "ts-jest",
"testEnvironment": "node",
"coveragePathIgnorePatterns": [
"/node_modules/"
],
"moduleNameMapper": {
"^@/(.\*)$": "<rootDir>/src/$1"
}
}

#פקודה שצריך להריץ

npm i -D jest supertest cross-env ts-jest @types/supertest @types/jest
