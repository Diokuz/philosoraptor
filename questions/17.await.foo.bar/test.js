const foo = () => ({
  bar: () => 'bar-return'
})

async function run() {
  const result = await foo().bar()

  console.log('result', result) // 'bar-return'
}

run()

const foo2 = () => ({
  bar: async () => 'bar-return2'
})

async function run2() {
  const result = await foo2().bar()

  console.log('result', result) // 'bar-return2'
}

run2()

const foo3 = () => ({
  bar: async () => 'bar-return3'
})

async function run3() {
  const result = await foo3().bar()

  console.log('result', result) // 'bar-return3'
}

run3()
