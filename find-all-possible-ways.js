const dicts = [
  'i',
  'like',
  'sam',
  'sung',
  'samsung',
  'mobile',
  'ice',
  'cream',
  'man go'
] // dictionary

// stage 1
console.log(findAllPossibleWays(dicts, 'ilikesamsungmobile')) // => ["i like sam sung mobile ", "i like samsung mobile "]
console.log(findAllPossibleWays(dicts, 'ilikeicecreamandmango')) // => ["i like ice cream and man go"]

// stage 2
console.log(
  findAllPossibleWays(dicts, 'ilikeicecreamandmango', [
    'i',
    'like',
    'sam',
    'sung',
    'mobile',
    'icecream',
    'man go',
    'mango'
  ])
) // => ["i like icecream and man go", "i like icecream and mango"]

// stage 3
console.log(
  findAllPossibleWays(
    dicts,
    'ilikeicecreamandmango',
    ['i', 'like', 'sam', 'sung', 'mobile', 'icecream', 'man go', 'mango'],
    true
  )
) // => ["i like ice cream and man go", "i like ice cream and mango", "i like icecream and man go", "i like icecream and mango"]

function findAllPossibleWays(dicts, input, customizedDicts, merged) {
  const myDists = customizedDicts // customizedDicts ?
    ? merged // need merge?
      ? [...customizedDicts, ...dicts]
      : [...customizedDicts]
    : [...dicts]
  myDists.push('and') // 人为添加连词 and
  const letters = input.split('') // 输入字符串打散
  // 字典标记
  let tempDistMarks = {}
  myDists.forEach(_ => {
    _.split(' ').forEach(i => {
      tempDistMarks[i] = true
    })
  })
  let leafNodes = [] // 后续用到所有树叶
  let paths = [] // 结果
  const resultRoot = getAllWordNodes(0, letters, {
    value: null,
    isRoot: true,
    childrens: []
  })

  traversal(resultRoot) // 遍历获取所有叶子

  leafNodes.forEach(_ => {
    // 通过叶子找到所有路径
    let path = findPathByLeaf(_)
    path && paths.push(path)
  })

  // 递归生成字符树
  function getAllWordNodes(n, letters, root) {
    let tempStr = ''
    letters.slice(n).forEach((_, index) => {
      tempStr += _
      if (tempDistMarks[tempStr]) {
        let node = {
          value: tempStr,
          childrens: [],
          index: n + index + 1,
          parent: root
        }
        root.childrens.push(node)
      }
    })
    root.childrens = root.childrens.map(_ => {
      return {
        value: _.value,
        index: _.index,
        childrens: getAllWordNodes(_.index, letters, _).childrens,
        parent: root
      }
    })
    return { ...root }
  }

  function traversal(node) {
    // 遍历获取所有叶子
    if (!node.isRoot && node.childrens.length === 0) {
      leafNodes.push(node)
      return false
    }
    let tempNode = node
    tempNode.childrens.forEach(_ => {
      traversal(_)
    })
  }
  function findPathByLeaf(leafNode) {
    // 通过叶子找到路径
    let path = ''
    let tempNode = leafNode
    while (tempNode) {
      if (tempNode.value) {
        path = `${tempNode.value} ${path}`
      }
      tempNode = tempNode.parent
    }
    return path.trim()
  }

  return paths.filter(_ => input === _.split(' ').join('')) // 最终验证
}
