import en from '../../../src/i18n/en/en';
import {
    DASHBOARD_LIST_END_REACHED,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO,
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE,
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_BREED_LABEL_TITLE, DETAILS_DOG_CHIP_NUMBER,
    DETAILS_DOG_CITY_LABEL_TITLE,
    DETAILS_DOG_COLOR_LABEL_TITLE,
    DETAILS_DOG_DATE_LOST_LABEL_TITLE, DETAILS_DOG_HAS_CHIP,
    DETAILS_DOG_NAME_LABEL_TITLE,
    DETAILS_DOG_SEX_LABEL_TITLE,
    DETAILS_DOG_STATUS_LABEL_TITLE
} from '../../../src/i18n/i18n.keys';
import {
    expectActionsButtonsToBeVisible,
    expectDashboardHeaderIsVisibleWithDistanceLabel,
    expectDashboardListItemAtIndexIsVisibleWithValues, expectDetailsScreenDogDetailsAreVisibleWithLabels,
    expectDetailsScreenTopSectionIsVisible, expectMapsViewWithMarkerToBeVisible
} from '../../support/assert/assertions';
import {
    pressOnItemInDashboardListAtIndex, scrollOnViewByIdTo, waitForSplashAnimationToFinish,
} from '../../support/action/actions';

describe('Details Screen - [en]', () => {

    it('it should open the details screen when pressing an item on the dashboard - [en]', async () => {
        await device.launchApp({
            permissions: {
                location: 'always'
            },
        });
        await device.reloadReactNative();
        
        await waitForSplashAnimationToFinish('application-container');

        await expectDashboardHeaderIsVisibleWithDistanceLabel(en[DASHBOARD_SEARCH_PARAMETERS_DISTANCE] + ': 30 km');
        await expectDashboardListItemAtIndexIsVisibleWithValues(0, 'Watt', 'FOXI', en[DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO], en[DASHBOARD_LIST_END_REACHED]);
        await pressOnItemInDashboardListAtIndex(0);
        await expectDetailsScreenTopSectionIsVisible();
        await expectDetailsScreenDogDetailsAreVisibleWithLabels({
            dogName: en[DETAILS_DOG_NAME_LABEL_TITLE],
            dogBreed: en[DETAILS_DOG_BREED_LABEL_TITLE],
            gender: en[DETAILS_DOG_SEX_LABEL_TITLE],
            color: en[DETAILS_DOG_COLOR_LABEL_TITLE],
            status: en[DETAILS_DOG_STATUS_LABEL_TITLE],
            dogAge: en[DETAILS_DOG_AGE_LABEL_TITLE],
            hasChip: en[DETAILS_DOG_HAS_CHIP],
            chipNumber: en[DETAILS_DOG_CHIP_NUMBER],
            location: en[DETAILS_DOG_CITY_LABEL_TITLE],
            dateLost: en[DETAILS_DOG_DATE_LOST_LABEL_TITLE]
        });

        await expectActionsButtonsToBeVisible();
        await scrollOnViewByIdTo('details-screen-scroll-view', 'up');
        await expectMapsViewWithMarkerToBeVisible();
    });
});
