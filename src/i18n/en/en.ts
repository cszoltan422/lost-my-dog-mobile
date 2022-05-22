export default {
    general: {
        login: 'Login',
        signUp: 'Sign up',
        yes: 'Yes',
        no: 'No',
        firstName: 'First Name',
        lastName: 'Last Name',
        emailAddress: 'Email address',
        username: 'Username',
        password: 'Password',
        phoneNumber: 'Phone number',
        name: 'Name',
        description: 'Description',
        male: 'Male',
        female: 'Female',
        found: 'Found',
        lost: 'Lost',
        wandering: 'Wandering',
        breed: 'Breed',
        sex: 'Sex',
        color: 'Color',
        status: 'Status',
        age: 'Age',
        years: 'Years',
        city: 'City',
        distance: 'Distance',
        unknown: 'Unknown',
        hasChip: 'Has chip',
        chipNumber: 'Chip #',
        dateLost: 'Date lost',
        sendMessage: 'Send message',
        callOwner: 'Call owner',
        lastSeenLocation: 'Last seen location',
        oops: 'Ooops',
        submit: 'Submit',
        dashboard: 'Dashboard',
        submitLostDog: 'Submit Lost Dog',
        emailInvalid: 'Please provide a valid email address',
        requiredField: '* required field',
    },
    dashboard: {
        emptyResult: 'No dogs are found with the search parameters!',
        endReached: 'You\'ve reached the end!',
        card: {
            submittedTimes: {
                justNow: 'Just now',
                minutesAgo: 'minute(s) ago',
                hoursAgo: 'hour(s) ago',
                daysAgo: 'day(s) ago',
                weeksAgo: 'week(s) ago',
                monthsAgo: 'over a month ago',
            },
        },
    },
    locationPicker: {
        usageInfo: 'Tap on the map to change the dog\'s last seen location!',
        currentCoordinates: 'Current coordinates: ',
    },
    submitForm: {
        validation: {
            fieldEmpty: 'This field can\'t be empty',
            phoneNumberInvalid: 'Please provide a valid phone number',
            noImage: 'Please select or take a picture of the dog!',
            imageTooLarge: 'The size of the image must not exceed 1 Gb!'
        },
        loading: {
            processing: 'Hold on, we are processing your request:',
            validatingForm: 'Validating form',
            compressingImage: 'Compressing image',
            sendingRequest: 'Sending the request',
        }
    },
    login: {
        forgotPassword: 'Forgot password?',
        emptyPasswordOrUsername: 'The username or password is empty!',
        wrongLoginCredentials: 'Incorrect username or password!',
    },
    signUp: {
        confirmPassword: 'Confirm password',
        userNameInvalid: 'Please create a username with only alphanumeric characters and minimum length of 5 characters.',
        passwordInvalid: 'Please provide a valid password. Your password must have:\n\t* at least 8 characters\n\t* contain at least one number \n\t* have a mixture of uppercase and lowercase letters',
        passwordsNotMatching: 'Passwords do not match.',
        emptyFirstName: 'Please enter your first name.',
        emptyLastName: 'Please enter your last name.',
        usernameTaken: 'Username already taken',
        emailTaken: 'Email already taken',
    },
    toast: {
        headerText: 'Something went wrong',
        unknownError: 'Unknown error occurred. Please try again',
        submitLostDog: {
            unsafeImage: 'The selected image has an unsafe content!',
            imageNotADog: 'Cannot recognize dog on the image. Please try again with a different image!'
        }
    },
    permissions: {
        location: {
            enableLocation: 'Enable location',
            allowLocation: 'Allow location',
            askDescription: 'Location is required in order to show posts nearby you and to let you post to your local area. Press „Allow location” to start using the app. If it doesn\'t work, please visit your device settings and allow access to location for this application.',
            openSettings: 'Open Settings',
            permissionDeniedDescription: 'Permission to use the Location is required for the application to function. Press „Open Settings” and allow Location permission for this application.',
        }
    }
};