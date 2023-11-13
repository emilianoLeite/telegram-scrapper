import axios from "axios";
import cheerio from "cheerio";
abstract class Webpage {
	constructor(public url: string) {}

	public async navigate() {
		return axios.get(this.url);
	}
}

// class HomePage extends Webpage {}

class DetailPage extends Webpage {
	public async hasUpdates(): Promise<boolean> {
		try {
			const response = await axios.get(this.url);
			const html = response.data;
			const $ = cheerio.load(html);
			let foundUpdate = false;

			$("em").each((_idx, el) => {
				const text = $(el).text();
				if (text && text.match(/coerces/)) {
					console.log(`found element ${text}`);
					foundUpdate = true;
				}
			});

			return foundUpdate;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}

export async function scrapeWebsite(url: string) {
	return new DetailPage(
		"https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html"
	).hasUpdates();
}
