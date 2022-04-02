import { isLeetcode, updatePage, post } from "../utils/index.js"
import { map } from "../config/index.js"

// 手动初始化
getSolution()

/**
 * 监听路由变化
 */
chrome.tabs.onUpdated.addListener((_id, changeInfo) => {
  // 存在 title 属性时，表示加载完毕，进入下一步
  if (changeInfo.title != null) {
    getSolution()
  }
})

// 获取当前浏览站点信息
async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return tab
}

// 更新显示
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

async function render(type, code) {
  const data = await post(`/${type}/README.md`)
  const [baseUrl] = data.match(new RegExp(`(?<=\\[${code}.{2,}?]\\().+(?=\\))`))
  const readme = await post(baseUrl)

  updatePage(baseUrl, readme)
}
