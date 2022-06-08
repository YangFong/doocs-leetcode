import { isLeetcode, updatePage, post } from "../utils/index.js"
import { map } from "../config/index.js"

// 手动初始化
getSolution()

/* 聆听选项卡的变化。 */
chrome.tabs.onUpdated.addListener((_id, changeInfo) => {
  // 存在 title 属性时，表示加载完毕，进入下一步
  if (changeInfo.title != null) {
    getSolution()
  }
})

/**
 * 它返回当前窗口中当前活动的选项卡
 * @returns 当前选项卡
 */
async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab
}

/**
 * 它获取当前选项卡的 url 和标题，然后检查该 url 是否为 leetcode url。如果是，它将呈现解决方案。
 * @returns 函数中最后一个表达式的值。
 */
async function getSolution() {
  const { url, title } = await getCurrentTab()

  if (!isLeetcode(url)) {
    updatePage()
    return
  }

  // 查看当前是否处于特殊题库当中
  for (const key of map.keys()) {
    if (title.startsWith(key)) {
      const [type, reg] = map.get(key)
      const titleRes = title.match(reg)
      if (titleRes == null) {
        break
      }
      let code = titleRes[0]
      if (key === "") {
        code = code.padStart(4, "0")
      }
      render(type, code)
      break
    }
  }
}

/**
 * 它从 GitHub 存储库获取 README.md 文件，提取存储库的基本 URL，然后从基本 URL 获取 README.md 文件
 * @param type - 代码的类型，“js”或“ts”
 * @param code - 您要呈现的语言的代码。
 */
async function render(type, code) {
  const data = await post(`/${type}/README.md`)
  const [baseUrl] = data.match(
    type === "solution"
      ? new RegExp(`(?<=${code}.{2,}?]\\().+(?=\\))`)
      : new RegExp(`(?<=\\[${code}.{2,}?]\\().+(?=\\))`)
  )
  const readme = await post(baseUrl)

  updatePage(baseUrl, readme)
}
