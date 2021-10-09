import en from '../../../src/i18n/en/en';
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

describe('Dashboard Screen', () => {

    it('it should fetch the nearby lost dogs by default - [en]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            },
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await expectDashboardHeaderIsVisibleWithDistanceLabel(en[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 30 km');
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt', 'FOXI', en[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO], en[DASHBOARD_LIST_END_REACHED]);
    });

    it('it should fetch the nearby found dogs if I click on the Found tab - [en]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            },
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await expectDashboardHeaderIsVisibleWithDistanceLabel(en[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 30 km');
        await expectDashboardListContainerIsVisibleWithText(en[DASHBOARD_LIST_END_REACHED]);
        await pressDashboardHeaderFoundTabButton();
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt Found', 'BORDER COLLIE', en[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);
    });

    it('it should fetch new data on slider swipe - [en]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            },
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await expectDashboardHeaderIsVisibleWithDistanceLabel(en[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 30 km');
        await expectDashboardListContainerIsVisibleWithText(en[DASHBOARD_LIST_END_REACHED]);
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt', 'FOXI', en[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);

        await swipeDashboardHeaderSlider('right', 'fast', 0.99);

        await expectDashboardHeaderIsVisibleWithDistanceLabel(en[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 100 km');
        await expectDashboardListContainerIsVisibleWithText(en[DASHBOARD_LIST_END_REACHED]);
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt Far away', 'BORDER COLLIE', en[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);
        await expectDashboardListItemAtIndexIsVisibleWithValues(1, 'Watt', 'FOXI', en[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);
    });
});
