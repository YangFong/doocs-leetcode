import { baseUrl } from "../config/index.js"

/**
 * 它检查 url 是否是 leetcode url。
 * @param {string} url - 您要打开的页面的 URL。
 * @returns 一个接受字符串并返回布尔值的函数。
 */
export function isLeetcode(url: string) {
  return url.includes("https://leetcode-cn.com/") || url.includes("https://leetcode.cn/")
}


/**
 * 它需要一个 URL 和一个 Markdown 字符串，并使用 Markdown 的内容更新页面
 * @param [href] - 页面的链接。
 * @param [readme] - 自述文件的内容。
 */
export function updatePage(href = "", readme = "") {
  // 图标
  const link = document.querySelector<HTMLLinkElement>("#link")
  // 列表
  const list = document.querySelector("#list")
  /* 匹配`之间的内容的正则表达式 */
  const reg = /(?<=### \*\*)[\S\s]+?(?=\*\*)/g

  if (readme === "") {
    link.href = `${baseUrl}`
    list.innerHTML = ""
  } else {
    link.href = `${baseUrl}/#${href}`
    // TODO 空代码块不应该展示
    list.innerHTML = readme
      .match(reg)
      .map(
        lang => `
          <li>
            <input type="checkbox" disabled checked />
            ${lang}
          </li>`
      )
      .join("")
  }
}

/**
 * 它需要一个 url，获取它，然后将响应作为文本返回
 * @param {string} url - 要获取的 URL。
 * @returns 解析为字符串的承诺。
 */
export async function post(url: string) {
  const data = await fetch(`${baseUrl}${url}`)
  return await data.text()
}
