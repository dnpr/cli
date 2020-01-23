# cli

Build a command-line user interface with ease.

## Installation

```bash
npm install @dnpr/cli
```

## Usage

```javascript
const { parseArgs, parseFlagVal } = require("@dnpr/cli")
const { args, flags } = parseArgs(process.argv)
const boolean = parseFlagVal(flags, "-b", "boolean", true)
const number = parseFlagVal(flags, "-n", "number", 100)
const string = parseFlagVal(flags, "-s", "string", "hello")
const obj = parseFlagVal(flags, "-j", "json", { name: "dragonman225" })
```

## API

This library interprets arguments with the following rules:

* Arguments prefixed with "-" are treated as **flags**. **flags** are key-value pairs, e.g. "-flag=hello", and this library can parse values from flags. Note that the "=" cannot be omitted.

* Arguments not prefixed with "-" are treated as **normal arguments**. They are just strings, and this library don't touch them.

---

### parseArgs(argv)

Parse an argument vector into flags (arguments prefixed with "-") and normal arguments.

#### argv

Type: *string[]*

#### @returns

```
{
  args: string[]
  flags: string[]
}
```

`args` are normal arguments. `flags` are arguments prefixed with "-".

---

### parseFlagVal(flags, findPrefix, valType, defaultVal)

Parse a flag and return the parsed value in the specified type or return the default value.

#### flags

Type: *string[]*

#### findPrefix

e.g. "-flag"

Type: *string*

#### valType

Type: *string*, must be one of "boolean", "number", "string", "json".

Behavior of each `valType`:
 
"boolean" — If the flag is found and it has a value, i.e. the "xxx" in "-bool=xxx", this function returns true only when the value is "true". If the flag is found but it has no value, this function returns true. Otherwise, this function returns `defaultVal`.

"number" — If the flag has value, the value is parsed with Number(), if the parsed value is Number.NaN, this function returns `defaultVal`, otherwise it returns the parsed number. If the flag has no value or it is not found, this function always returns `defaultVal`.

"string" — If the flag has value, this function returns the value. Otherwise, it returns `defaultVal`.

"json" — If the flag has value and the value can be parsed by `JSON.parse()`, this function returns the value. Otherwise, it returns `defaultVal`.

#### defaultVal

Type: *any*

The type of `defaultVal` is not checked. The user must ensure that its type is consistent with the specified `valType`.