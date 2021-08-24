import hu from "../../../src/i18n/hu/hu";
import {setLocation} from "../utils/utils";
import {
    DASHBOARD_LIST_END_REACHED,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO,
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE
} from "../../../src/i18n/i18n.keys";

describe('Dashboard Screen - [hu]', () => {

    beforeEach(async () => {
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
    });

    it('it should fetch the nearby lost dogs by default - [hu]', async () => {
        await expectDashboardHeaderIsVisibleWithDistanceLabel(hu[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ": 30 km");
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt', 'FOXI', hu[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);
    });

    it('it should fetch the nearby found dogs if I click on the Found tab - [hu]', async () => {
        await expectDashboardHeaderIsVisibleWithDistanceLabel(hu[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ": 30 km");

        await element(by.id('dashboard-header-tabs-found-button')).tap();

        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt Found', 'BORDER COLLIE', hu[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);
    });

    it('it should fetch new data on slider swipe - [hu]', async () => {
        await expectDashboardHeaderIsVisibleWithDistanceLabel(hu[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ": 30 km");
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt', 'FOXI', hu[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);

        await element(by.id('dashboard-header-slider')).swipe('right', 'fast', 0.99);

        await expectDashboardHeaderIsVisibleWithDistanceLabel(hu[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ": 100 km");
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt', 'FOXI', hu[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);
        await expectDashboardListItemAtIndexIsVisibleWithValues(1, 'Watt Far away', 'BORDER COLLIE', hu[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO]);

    });
});

const expectDashboardListItemAtIndexIsVisibleWithValues = async (index, dogName, dogBreed, dateLost) => {
    await expect(element(by.id('dashboard-list-container'))).toBeVisible();

    await expect(element(by.id(`dashboard-list-item-container-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-header-container-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-header-image-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-header-dog-name-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-header-dog-name-${index}`))).toHaveText(dogName);
    await expect(element(by.id(`dashboard-list-item-header-dog-breed-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-header-dog-breed-${index}`))).toHaveText(dogBreed);
    await expect(element(by.id(`dashboard-list-item-details-container-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-details-city-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-details-date-lost-${index}`))).toBeVisible();
    await expect(element(by.id(`dashboard-list-item-details-date-lost-${index}`))).toHaveText(dateLost);

    await expect(element(by.id('dashboard-list-end-reached-indicator-container'))).toBeVisible();
    await expect(element(by.id('dashboard-list-end-reached-indicator-text'))).toBeVisible();
    await expect(element(by.id('dashboard-list-end-reached-indicator-text'))).toHaveText(hu[DASHBOARD_LIST_END_REACHED]);
};

const expectDashboardHeaderIsVisibleWithDistanceLabel = async (text) => {
    await expect(element(by.id('dashboard-header-tabs-container'))).toBeVisible();
    await expect(element(by.id('dashboard-header-tabs-lost-button'))).toBeVisible();
    await expect(element(by.id('dashboard-header-tabs-found-button'))).toBeVisible();
    await expect(element(by.id('dashboard-header-slider-container'))).toBeVisible();
    await expect(element(by.id('dashboard-header-slider'))).toBeVisible();
    await expect(element(by.id('dashboard-header-slider-distance-text'))).toBeVisible();
    await expect(element(by.id('dashboard-header-slider-distance-text'))).toHaveText(text);
};
