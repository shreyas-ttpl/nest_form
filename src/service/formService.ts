import puppeteer from 'puppeteer';
import { fieldData, subtypes } from "../dto/formDto";

export const automateFormService = async ( url: string, data: Record<string, fieldData> ) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);
        for (let i = 0; i < Object.keys(data).length; i++) {
            const key = Object.keys(data)[i];
            const { type, value, subtype } = data[key];
            switch (subtype) {
                case subtypes.RADIO:
                    await page.click(`${type}[name="${key}"][value="${value}"]`);
                    break;
                case subtypes.FILE:
                    const [fileChooser] = await Promise.all([
                        page.waitForFileChooser(),
                        page.click(`${type}[name="${key}"]`),
                      ]);
                    await fileChooser.accept([value]);
                    break;
                case subtypes.CHECKBOX:
                    await page.click(`${type}[type="${subtype}"][value="${key}"]`);
                    break;
                case subtypes.SUBMIT:
                    await page.click(`${type}[type="${key}"]`);
                    break;
                default:
                    await page.type(`${type}[name="${key}"]`, value);
                    break;
            }
        }
        await browser.close();
        return {};
    } catch (error) {
        console.error('Error in filling form ', error.message);
        throw error;
    }
}
