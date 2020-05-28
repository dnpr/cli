const FlagTypes = {
  boolean: "boolean",
  number: "number",
  string: "string",
  json: "json"
}

/**
 * Parse an argument vector into flags (arguments prefixed with "-") 
 * and normal arguments.
 * @param {string[]} argv 
 */
function parseArgv(argv) {
  let flags = []
  let args = []

  for (let i = 2; i < argv.length; i++) {
    const testArg = argv[i]
    if (/^-/.test(testArg))
      flags.push(testArg)
    else
      args.push(testArg)
  }

  return {
    flags, args
  }
}

/**
 * Parse a flag and return the parsed value in the specified type or 
 * return the default value.
 * 
 * Supported `valType`: "boolean" (`FlagTypes.boolean`), 
 * "number" (`FlagTypes.number`), "string" (`FlagTypes.string`), 
 * "json" (`FlagTypes.json`). 
 * Always return `defaultVal` if `valType` does not match any of the above.
 * 
 * Behavior of each `valType`:
 * 
 * "boolean" — If the flag is found and it has a value, 
 * i.e. the "xxx" in "-bool=xxx", this function returns true 
 * only when the value is "true". If the flag is found but it has 
 * no value, this function returns true. Otherwise, this function 
 * returns `defaultVal`.
 * 
 * "number" — If the flag has value, the value is parsed with 
 * Number(), if the parsed value is Number.NaN, this function 
 * returns `defaultVal`, otherwise it returns the parsed number. 
 * If the flag has no value or it is not found, this function 
 * always returns `defaultVal`.
 * 
 * "string" — If the flag has value, this function returns the value. 
 * Otherwise, it returns `defaultVal`.
 * 
 * "json" — If the flag has value and the value can be parsed by 
 * `JSON.parse()`, this function returns the value. 
 * Otherwise, it returns `defaultVal`.
 * 
 * The type of `defaultVal` is not checked. The user must ensure 
 * that its type is consistent with the specified `valType`.
 * 
 * @param {string[]} flags - A flag array.
 * @param {string} findPrefix - The prefix of the flag, e.g. "-flag".
 * @param {string} valType - The type of the flag.
 * @param {any} defaultVal - A constant value of `valType`.
 * @returns {any} A value of `valType`.
 */
function parseFlagVal(flags, findPrefix, valType, defaultVal) {
  const flag = flags.find(flag =>
    (new RegExp(`^${findPrefix}`)).test(flag))

  if (!flag) return defaultVal

  const val = flag.split("=")[1]

  switch (valType) {

    case FlagTypes.boolean: {
      if (val) return val === "true"
      else return true
    }

    case FlagTypes.number: {
      if (val) {
        const maybeNum = Number(val)
        return (Number.isNaN(maybeNum)) ? defaultVal : maybeNum
      } else {
        return defaultVal
      }
    }

    case FlagTypes.string: {
      if (val) return val
      else return defaultVal
    }

    case FlagTypes.json: {
      if (val) {
        try {
          const obj = JSON.parse(val)
          return obj
        } catch (error) {
          return defaultVal
        }
      } else {
        return defaultVal
      }
    }

    default:
      return defaultVal

  }
}

module.exports = {
  FlagTypes, parseArgv, parseFlagVal
}