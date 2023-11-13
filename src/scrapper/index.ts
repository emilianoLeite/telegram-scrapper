import cheerio from "cheerio";
import puppeteer from 'puppeteer';

abstract class Webpage {
	constructor(public url: string) { }
	public htmlContent?: string

	public async loadContent(htmlContent?: string): Promise<this> {
		if (htmlContent) {
			this.htmlContent = htmlContent
			return this
		} else if (this.url) {
			this.htmlContent = await this.navigate()
			return this
		} else {
			throw new Error('Impossible to load content. No htmlContent was supplied and no url is available.')
		}
	}

	public async navigate() {
		const browser = await puppeteer.launch({ headless: 'new' });
		const page = await browser.newPage();
		await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
		await page.goto(this.url);
		const html = await page.content();
		await browser.close();
		return html
	}
}

export class ChapterListPage extends Webpage {
	private chapterRegex = /Ch\.(\d+)/;

	public async hasUpdates(lastestReadChapter: number) {
		try {
			{
				if (this.htmlContent) {
					const $ = cheerio.load(this.htmlContent);
					const tableRows = $("table#chapter_table tbody tr")
					const latestAvailableChapterTitle = tableRows.first().text().trim()
					const match = latestAvailableChapterTitle.match(this.chapterRegex);
					const latestAvailableChapterNumber = match ? Number(match[1]) : 0;

					return latestAvailableChapterNumber > lastestReadChapter
				}

				return false
			}
			// const response = await axios.get(this.url, {
			// 	headers: {
			// 		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
			// 	}
			// })
			// const html = response.data;
			// const body = $("body")
			// fs.writeFile(filePath, $.html(), (err) => {
			// 	if (err) {
			// 		console.error('An error occurred:', err);
			// 	} else {
			// 		console.log('File written successfully.');
			// 	}
			// });
			// console.log(body.html())
			// const tableRows = $("table#chapter_table tbody tr")
			// console.log(`table rows ${JSON.stringify(tableRows.first(), null, 2)}`)

			// if (tableRows.length === 0) {
			// 	// panic('chapter list not found')
			// 	return false
			// }

			// tableRows.each((_idx, el) => {
			// 	const text = $(el).text();
			// 	console.log(`found element ${text}`);
			// });

			// return true
		} catch (error) {
			console.error(`error`, error);
			return false;
		}
	}
}

export async function scrapeWebsite(url: string) {
	// return new ChapterListPage(
	// 	url
	// ).hasUpdates();
}
