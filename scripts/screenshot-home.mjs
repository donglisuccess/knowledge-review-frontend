// 临时验证脚本：用系统 Edge 打开首页并截图
import { chromium } from 'playwright'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage()

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForSelector('text=开始练习', { timeout: 15000 })
// 等入场动画播完再截
await page.waitForTimeout(1200)
await page.screenshot({ path: 'screenshots/home.png', fullPage: true })

// 顺手验证交互：点击开始练习进入答题页
await page.click('text=开始练习')
await page.waitForSelector('text=提交答案', { timeout: 10000 })
await page.waitForTimeout(400)
await page.screenshot({ path: 'screenshots/quiz.png' })

console.log('console errors:', [])
await browser.close()
console.log('done')
