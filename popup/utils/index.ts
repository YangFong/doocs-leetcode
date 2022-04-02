import {baseUrl} from "../config/index.js"

/**
 * 当前链接是否属于力扣中国站点
 * @param {string} url
 * @returns boolean
 */
export const isLeetcode = (url: string) => url.includes("https://leetcode-cn.com/")

/**
 * 更新插件界面
 */
export const updatePage = (() => {
  // 图标
  const link = document.querySelector<HTMLLinkElement>("#link")
  // 列表
  const list = document.querySelector("#list")

  const reg = /(?<=### \*\*)[\S\s]+?(?=\*\*)/g
  return (href = "", readme = "") => {
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
})()


/**
 * 简化请求
 * @param url
 * @returns
 */
export const post = async (url: string) => {
  const data = await fetch(`${baseUrl}${url}`)
  return await data.text()
}
