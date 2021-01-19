export function getOnlyStringLog(args) {
  const stringArgs: any[] = [];
  for (const arg of args) {
    const type = typeof arg;
    if (type != "string" && type != "number" && type != "boolean") {
      stringArgs.push(type);
      continue;
    }
    stringArgs.push(arg);
  }
  return stringArgs;
}

const originalConsoleLog = console.log;
function onlyStringLog(...args) {
  const stringArgs = getOnlyStringLog([...args]);
  return originalConsoleLog(...stringArgs);
}

if (!process.client) {
  console.log("polyfill !process.client onlyStringLog");
  console.log = onlyStringLog;
  console.warn = onlyStringLog;
  console.error = onlyStringLog;
}

const _window = "undefined" != typeof window ? window : {} as { [key: string]: undefined };

export default _window;