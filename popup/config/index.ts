/* leetcode 问题的基本 url。 */
export const baseUrl = "https://doocs.github.io/leetcode"

/* 将问题前缀映射到文件名前缀的映射。 */
export const map = new Map([
  ["剑指 Offer", ["lcof", /(?<=剑指 Offer ).+?(?=\.)/]],
  ["面试题", ["lcci", /(?<=面试题 ).+(?=\.)/]],
  ["", ["solution", /^\d+/]]
])
