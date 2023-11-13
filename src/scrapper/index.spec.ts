import { ChapterListPage } from "./index";
import fs from 'fs';
import path from 'path';

const exampleHtmlPath = path.join(__dirname, './fixtures/jujutsu-kaisen.html');
const exampleHtml = fs.readFileSync(exampleHtmlPath, 'utf8');

describe('ChapterListPage', () => {
	describe('hasUpdates', () => {
		it('returns true if there is an available chapter newer than the supplied one', async () => {
			const chapterListPage = await new ChapterListPage('fake url').loadContent(exampleHtml)

			const result = await chapterListPage.hasUpdates(240)

			expect(result).toEqual(true)
		})

		it("returns false if there isn't an available chapter newer than the supplied one", async () => {
			const chapterListPage = await new ChapterListPage('fake url').loadContent(exampleHtml)

			const result = await chapterListPage.hasUpdates(241)

			expect(result).toEqual(false)
		})
	})
})
