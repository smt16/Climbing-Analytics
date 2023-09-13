export function requestStartLog(path: string) {
  console.log(`\n\x1b[95mHandling request for ${path} \x1b[0m \n`);
}

export function notFoundLog(path: string) {
  console.log(`\n\x1b[91m404 Not found. Path: ${path} \x1b[0m \n`);
}
