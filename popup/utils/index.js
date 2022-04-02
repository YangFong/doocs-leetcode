import { baseUrl } from "../config/index.js";
export const isLeetcode = (url) => url.includes("https://leetcode-cn.com/");
export const updatePage = (() => {
    const link = document.querySelector("#link");
    const list = document.querySelector("#list");
    const reg = /(?<=### \*\*)[\S\s]+?(?=\*\*)/g;
    return (href = "", readme = "") => {
        link.href = `${baseUrl}/#${href}`;
        list.innerHTML = readme
            .match(reg)
            .map(lang => `
          <li>
            <input type="checkbox" disabled checked />
            ${lang}
          </li>`)
            .join("");
    };
})();
export const post = async (url) => {
    const data = await fetch(`${baseUrl}${url}`);
    return await data.text();
};
