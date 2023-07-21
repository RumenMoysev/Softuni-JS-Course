const {chromium} = require('playwright-chromium')
const chai = require('chai')

const host = 'http://127.0.0.1:5500/1.Messenger/'

let data1 = {
    list: [
        {
            author: 'Spami',
            text: 'Hello, are you there?'
        },
        {   author:'Garry',
            text: 'Yep, whats up :?'
        },
        {
            author: 'Spami',
            text: 'How are you? Long time no see? :)'
        },
        {
            author: 'George',
            text: 'Hello, guys! :))'
        },
        {
            author: 'Spami',
            text: 'Hello, George nice to see you! :)))'
        }
    ]
}

let browser
let context
let page

describe('a', function() {
    before(async () => {
       browser = await chromium.launch({headless: false, slowMo: 1000})
    })
    after(async () => {
        await browser.close()
    })

    beforeEach(async () => {
        context = await browser.newContext();
        setupContext(context);
        page = await context.newPage();
    });
    afterEach(async () => {
        await page.close();
        await context.close();
    });

    describe('1test', function() {
        it('should loadMEssages',async function() {
            const data = data1.list

            await page.goto(host)
            await page.waitForSelector('#page')
            await page.click('input[value="Refresh"')
            
            const post = await page.$$eval('textarea', (t) => t.map((s) => s.value))

            chai.expect(post[0]).to.equal(
                `${data[0].author}: ${data[0].content}\n${data[1].author}: ${data[1].content}\n${data[2].author}: ${data[2].content}`
            )
        })
    })
})