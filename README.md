# cli

Build a command-line user interface with ease.

## Installation

```bash
npm install @dnpr/cli
```

## Usage

```javascript
const { FlagTypes, parseArgv, parseFlagVal } = require("@dnpr/cli")
const { args, flags } = parseArgv(process.argv)
const boolean = parseFlagVal(flags, "-b", FlagTypes.boolean, true)
const number = parseFlagVal(flags, "-n", FlagTypes.number, 100)
const string = parseFlagVal(flags, "-s", FlagTypes.string, "hello")
const obj = parseFlagVal(flags, "-j", FlagTypes.json, { name: "dragonman225" })
```

## API

This library interprets arguments with the following rules:

* An argument starting with "-" is a **flag**. It is a key-value pair in the form "-key=value". Note that when specifying a value, "=" cannot be omitted.
* An argument not starting with "-" is a **normal argument**. This library does not process it.

---

### parseArgv(argv)

Parse an argument vector into **flag**s and **normal argument**s.

#### argv

Type: *string[]*

#### @returns

```javascript
{
  flags: string[], // flags
  args: string[]   // normal arguments
}
```

---

### parseFlagVal(flags, findPrefix, valType, defaultVal)

Parse a flag and return the parsed value in the specified type or return the default value.

#### flags

Type: *string[]*

#### findPrefix

Type: *string*

e.g. "-flag"

It can also be a regex, such as "(-f|--flag)".

#### valType

Type: *string*, <s>must be one of "boolean", "number", "string", "json".</s>

**It is recommended to use the `FlagTypes` constant as shown in [Usage](#Usage) instead of directly specifying the strings.**

Behavior of each `valType`:

`FlagTypes.boolean` — If the flag is found and it has a value, i.e. the "xxx" in "-bool=xxx", this function returns true only when the value is "true". If the flag is found but it has no value, this function returns true. Otherwise, this function returns `defaultVal`.

`FlagTypes.number` — If the flag has value, the value is parsed with `Number()`, if the parsed value is `Number.NaN`, this function returns `defaultVal`, otherwise it returns the parsed number. If the flag has no value or it is not found, this function always returns `defaultVal`.

`FlagTypes.string` — If the flag has value, this function returns the value. Otherwise, it returns `defaultVal`.

`FlagTypes.json` — If the flag has value and the value can be parsed by `JSON.parse()`, this function returns the value. Otherwise, it returns `defaultVal`.

#### defaultVal

Type: *any*

The type of `defaultVal` is not checked. The user must ensure that its type is consistent with the specified `valType`.