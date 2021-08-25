import hu from '../../../src/i18n/hu/hu';
import {setLocation} from '../utils/utils';
import {
    DASHBOARD_LIST_END_REACHED,
    DASHBOARD_LIST_ITEM_DISAPPEARED_DATE_OVER_A_MONTH_AGO,
    DASHBOARD_SEARCH_PARAMETERS_DISTANCE,
    DETAILS_DOG_AGE_LABEL_TITLE,
    DETAILS_DOG_BREED_LABEL_TITLE,
    DETAILS_DOG_CITY_LABEL_TITLE,
    DETAILS_DOG_COLOR_LABEL_TITLE,
    DETAILS_DOG_DATE_LOST_LABEL_TITLE,
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

describe('Details Screen - [hu]', () => {

    it('it should open the details screen when pressing an item on the dashboard - [hu]', async () => {
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
        await pressOnItemInDashboardListAtIndex(0);
        await expectDetailsScreenTopSectionIsVisible();
        await expectDetailsScreenDogDetailsAreVisibleWithLabels({
            dogName: hu[DETAILS_DOG_NAME_LABEL_TITLE],
            dogBreed: hu[DETAILS_DOG_BREED_LABEL_TITLE],
            gender: hu[DETAILS_DOG_SEX_LABEL_TITLE],
            color: hu[DETAILS_DOG_COLOR_LABEL_TITLE],
            status: hu[DETAILS_DOG_STATUS_LABEL_TITLE],
            dogAge: hu[DETAILS_DOG_AGE_LABEL_TITLE],
            location: hu[DETAILS_DOG_CITY_LABEL_TITLE],
            dateLost: hu[DETAILS_DOG_DATE_LOST_LABEL_TITLE]
        });

        await expectActionsButtonsToBeVisible();
        await scrollOnViewByIdTo('details-screen-scroll-view', 'up');
        await expectMapsViewWithMarkerToBeVisible();
    });
});
