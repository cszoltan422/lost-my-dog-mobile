import hu from '../../../src/i18n/hu/hu';
import {
    LOCATION_PERMISSION_ASK_DENIED_DESCRIPTION,
    LOCATION_PERMISSION_ASK_DESCRIPTION, LOCATION_PERMISSION_DENIED_TITLE,
    LOCATION_PERMISSION_TITLE
} from '../../../src/i18n/i18n.keys';
import {pressLocationPermissionButton} from '../../support/action/actions';
import {
    expectLocationPermissionButtonNotToBeFocused,
    expectLocationPermissionButtonToBeVisible, expectLocationPermissionDescriptionTextToBeVisibleWithText,
    expectLocationPermissionTitleTextToBeVisibleWithText
} from '../../support/assert/assertions';

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

        await expectLocationPermissionTitleTextToBeVisibleWithText(hu[LOCATION_PERMISSION_TITLE]);
        await expectLocationPermissionButtonToBeVisible();
        await expectLocationPermissionDescriptionTextToBeVisibleWithText(hu[LOCATION_PERMISSION_ASK_DESCRIPTION]);
        await pressLocationPermissionButton();
        await expectLocationPermissionButtonNotToBeFocused();
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

        await expectLocationPermissionTitleTextToBeVisibleWithText(hu[LOCATION_PERMISSION_DENIED_TITLE]);
        await expectLocationPermissionButtonToBeVisible();
        await expectLocationPermissionDescriptionTextToBeVisibleWithText(hu[LOCATION_PERMISSION_ASK_DENIED_DESCRIPTION]);
    });
});

