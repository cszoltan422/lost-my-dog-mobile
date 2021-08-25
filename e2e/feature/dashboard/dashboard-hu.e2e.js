import hu from '../../../src/i18n/hu/hu';
import {setLocation} from '../utils/utils';
import {
    DASHBOARD_LIST_END_REACHED,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO,
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE
} from '../../../src/i18n/i18n.keys';
import {
    expectDashboardHeaderIsVisibleWithDistanceLabel, expectDashboardListContainerIsVisibleWithText,
    expectDashboardListItemAtIndexIsVisibleWithValues
} from '../../support/assert/assertions';
import {
    pressDashboardHeaderFoundTabButton,
    swipeDashboardHeaderSlider,
    waitForSplashAnimationToFinish
} from '../../support/action/actions';

describe('Dashboard Screen - [hu]', () => {

    it('it should fetch the nearby lost dogs by default - [hu]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            },
            languageAndLocale: {
                language: 'hu',
                locale: 'hu'
            }
        });
        await device.reloadReactNative();
        await setLocation(37.785834, -122.406417, device);
        await waitForSplashAnimationToFinish('application-container');

        await expectDashboardHeaderIsVisibleWithDistanceLabel(hu[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 30 km');
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt', 'FOXI', hu[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO], hu[DASHBOARD_LIST_END_REACHED]);
    });

    it('it should fetch the nearby found dogs if I click on the Found tab - [hu]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            },
            languageAndLocale: {
                language: 'hu',
                locale: 'hu'
            }
        });
        await device.reloadReactNative();
        await setLocation(37.785834, -122.406417, device);
        await waitForSplashAnimationToFinish('application-container');

        await expectDashboardHeaderIsVisibleWithDistanceLabel(hu[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 30 km');
        await expectDashboardListContainerIsVisibleWithText(hu[DASHBOARD_LIST_END_REACHED]);
        await pressDashboardHeaderFoundTabButton();
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt Found', 'BORDER COLLIE', hu[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);
    });

    it('it should fetch new data on slider swipe - [hu]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            },
            languageAndLocale: {
                language: 'hu',
                locale: 'hu'
            }
        });
        await device.reloadReactNative();
        await setLocation(37.785834, -122.406417, device);
        await waitForSplashAnimationToFinish('application-container');

        await expectDashboardHeaderIsVisibleWithDistanceLabel(hu[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 30 km');
        await expectDashboardListContainerIsVisibleWithText(hu[DASHBOARD_LIST_END_REACHED]);
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt', 'FOXI', hu[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);

        await swipeDashboardHeaderSlider('right', 'fast', 0.99);

        await expectDashboardHeaderIsVisibleWithDistanceLabel(hu[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 100 km');
        await expectDashboardListContainerIsVisibleWithText(hu[DASHBOARD_LIST_END_REACHED]);
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt', 'FOXI', hu[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);
        await expectDashboardListItemAtIndexIsVisibleWithValues(1, 'Watt Far away', 'BORDER COLLIE', hu[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);
    });
});
