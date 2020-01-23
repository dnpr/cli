const path = require("path")
const { spawn } = require("child_process")

const tasks = ["arg-parser.spec.js"]

for (let i = 0; i < tasks.length; i++) {
  const taskProcess =
    spawn("node", [path.join(__dirname, tasks[i])])
  taskProcess.stdout.pipe(process.stdout)
  taskProcess.stderr.pipe(process.stderr)
}