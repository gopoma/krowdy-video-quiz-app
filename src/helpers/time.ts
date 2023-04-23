export const sleep = async (ms: number): Promise<string> => {
  return await new Promise((resolve) => {
    setTimeout(() => { resolve(`slept for ${ms} ms`) }, ms)
  })
}
