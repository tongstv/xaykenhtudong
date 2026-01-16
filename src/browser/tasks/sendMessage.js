
function parseCookie(raw){return raw.split(";").map(c=>{const [n,...r]=c.trim().split("=");return {name:n,value:r.join("="),domain:".tiktok.com",path:"/"};});}
export async function sendMessage(page, job){
 await page.context().addCookies(parseCookie(job.tiktok.cookie));
 await page.goto(job.data.url,{waitUntil:"networkidle",timeout:60000});
 await page.waitForTimeout(2000);
 await page.evaluate(()=>{const b=[...document.querySelectorAll("button,div,span")].find(e=>["Message","Nhắn tin"].includes(e.textContent?.trim())); b?.click();});
 await page.waitForTimeout(1500);
 await page.waitForSelector("textarea",{timeout:10000});
 await page.fill("textarea", job.data.message);
 await page.evaluate(()=>{const b=[...document.querySelectorAll("button,div,span")].find(e=>["Send","Gửi"].includes(e.textContent?.trim())); b?.click();});
 await page.waitForTimeout(1500);
}
