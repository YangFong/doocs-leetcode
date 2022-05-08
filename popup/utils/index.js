import { baseUrl } from "../config/index.js";
export function isLeetcode(url) {
    return url.includes("https://leetcode-cn.com/") || url.includes("https://leetcode.cn/");
}
export function updatePage(href = "", readme = "") {
    const link = document.querySelector("#link");
    const list = document.querySelector("#list");
    const reg = /(?<=### \*\*)[\S\s]+?(?=\*\*)/g;
    if (readme === "") {
        link.href = `${baseUrl}`;
        list.innerHTML = "";
    }
    else {
        link.href = `${baseUrl}/#${href}`;
        list.innerHTML = readme
            .match(reg)
            .map(lang => `
          <li>
            <input type="checkbox" disabled checked />
            ${lang}
          </li>`)
            .join("");
    }
}
export async function post(url) {
    const data = await fetch(`${baseUrl}${url}`);
    return await data.text();
}
