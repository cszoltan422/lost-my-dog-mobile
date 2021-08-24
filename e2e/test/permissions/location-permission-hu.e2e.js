import hu from "../../../src/i18n/hu/hu";
import {
    LOCATION_PERMISSION_ASK_DENIED_DESCRIPTION,
    LOCATION_PERMISSION_ASK_DESCRIPTION, LOCATION_PERMISSION_DENIED_TITLE,
    LOCATION_PERMISSION_TITLE
} from "../../../src/i18n/i18n.keys";

describe('Location Permission Screen - [hu]', () => {

    it('should open the location permissions screen to ask permissions if location permission is not granted [hu]', async () => {
        await device.launchApp({
            permissions: {
                location: 'unset'
            },
            languageAndLocale: {
                language: 'hu',
                locale: 'hu'
            }
        });
        await device.reloadReactNative();

        await expect(element(by.id('location-permission-title-text'))).toBeVisible();
        await expect(element(by.id('location-permission-title-text'))).toHaveText(hu[LOCATION_PERMISSION_TITLE]);

        await expect(element(by.id('location-permission-button'))).toBeVisible();

        await expect(element(by.id('location-permission-description-text'))).toBeVisible();
        await expect(element(by.id('location-permission-description-text'))).toHaveText(hu[LOCATION_PERMISSION_ASK_DESCRIPTION]);

        await element(by.id('location-permission-button')).tap();

        await expect(element(by.id('location-permission-button'))).not.toBeFocused();
    });

    it('should open the location permissions screen to open settings if location permission is denied [hu]', async () => {
        await device.launchApp({
            permissions: {
                location: 'never'
            },
            languageAndLocale: {
                language: 'hu',
                locale: 'hu'
            }
        });
        await device.reloadReactNative();

        await expect(element(by.id('location-permission-title-text'))).toBeVisible();
        await expect(element(by.id('location-permission-title-text'))).toHaveText(hu[LOCATION_PERMISSION_DENIED_TITLE]);

        await expect(element(by.id('location-permission-button'))).toBeVisible();

        await expect(element(by.id('location-permission-description-text'))).toBeVisible();
        await expect(element(by.id('location-permission-description-text'))).toHaveText(hu[LOCATION_PERMISSION_ASK_DENIED_DESCRIPTION]);
    });
});

