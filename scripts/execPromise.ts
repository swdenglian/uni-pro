import { exec } from 'node:child_process'

export function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error)
      }
      else {
        resolve(stdout) // 可选：需要输出结果时保留
      }
    })
  })
}
