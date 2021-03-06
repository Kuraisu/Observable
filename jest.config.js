module.exports = {
    "roots": [
        "<rootDir>/src",
        "<rootDir>/examples"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "moduleDirectories": ["node_modules", "."]
};
