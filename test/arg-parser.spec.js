const { test } = require("zora")
const { parseArgs, parseFlagVal } = require("../src/arg-parser")

test("parseArgs()", (t) => {
  const argv = ["node", "index.js", "-i", "-s=6", "hello", "-b", "world"]
  const { args, flags } = parseArgs(argv)
  t.deepEqual(args, ["hello", "world"], "It should return args")
  t.deepEqual(flags, ["-i", "-s=6", "-b"], "It should return flags")
})

test("parseFlagVal()", (t) => {
  t.test("boolean", (t) => {
    const findPrefix = "-b"
    const valType = "boolean"
    const defaultVal = false
    const flags1 = ["-b=true"]
    const flags2 = ["-b=xxx"]
    const flags3 = ["-b"]
    const flags4 = ["-h"]
    t.equal(parseFlagVal(flags1, findPrefix, valType, defaultVal), true,
      "It should return true when the flag is found and its value is \"true\"")
    t.equal(parseFlagVal(flags2, findPrefix, valType, defaultVal), false,
      "It should return false when the flag is found and its value is not \"true\"")
    t.equal(parseFlagVal(flags3, findPrefix, valType, defaultVal), true,
      "It should return true when the flag is found and it has no value")
    t.equal(parseFlagVal(flags4, findPrefix, valType, defaultVal), defaultVal,
      "It should return the default value when the flag is not found.")
  })

  t.test("number", (t) => {
    const findPrefix = "-n"
    const valType = "number"
    const defaultVal = 2020
    const flags1 = ["-n=101"]
    const flags2 = ["-n=hello"]
    const flags3 = ["-n"]
    const flags4 = ["-h"]
    t.equal(parseFlagVal(flags1, findPrefix, valType, defaultVal), 101,
      "It should return the parsed number when the flag is found and its\
 value is a number")
    t.equal(parseFlagVal(flags2, findPrefix, valType, defaultVal), defaultVal,
      "It should return the default value when the flag is found but its\
 value is not a number")
    t.equal(parseFlagVal(flags3, findPrefix, valType, defaultVal), defaultVal,
      "It should return the default value when the flag is found but it\
 has no value")
    t.equal(parseFlagVal(flags4, findPrefix, valType, defaultVal), defaultVal,
      "It should return the default value when the flag is not found")
  })

  t.test("string", (t) => {
    const findPrefix = "-s"
    const valType = "string"
    const defaultVal = "NAST"
    const flags1 = ["-s=hello"]
    const flags2 = ["-s"]
    const flags3 = ["-h"]
    t.equal(parseFlagVal(flags1, findPrefix, valType, defaultVal), "hello",
      "It should return the value when the flag is found and has a value")
    t.equal(parseFlagVal(flags2, findPrefix, valType, defaultVal), defaultVal,
      "It should return the default value when the flag is found but has no value")
    t.equal(parseFlagVal(flags3, findPrefix, valType, defaultVal), defaultVal,
      "It should return the default value when the flag is not found")
  })

  t.test("json", (t) => {
    const findPrefix = "-j"
    const valType = "json"
    const defaultVal = { username: "dragonman225", password: "hello" }
    const flags1 = [`-j={"username": "alan", "password": "world"}`]
    const flags2 = [`-j={"username": "alan"`]
    const flags3 = ["-j"]
    const flags4 = ["-h"]
    t.deepEqual(parseFlagVal(flags1, findPrefix, valType, defaultVal),
      { username: "alan", password: "world" },
      "It should return the parsed object when the flag is found and\
 its value is valid JSON")
    t.deepEqual(parseFlagVal(flags2, findPrefix, valType, defaultVal), defaultVal,
      "It should return the default value when the flag is found and\
 its value is invalid JSON")
    t.deepEqual(parseFlagVal(flags3, findPrefix, valType, defaultVal), defaultVal,
      "It should return the default value when the flag is found but has no value")
    t.deepEqual(parseFlagVal(flags4, findPrefix, valType, defaultVal), defaultVal,
      "It should return the default value when the flag is not found")
  })
})