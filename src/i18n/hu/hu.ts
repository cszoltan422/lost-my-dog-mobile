export default {
    general: {
        login: 'Bejelentkezés',
        signUp: 'Regisztráció',
        yes: 'Igen',
        no: 'Nem',
        firstName: 'Keresztnév',
        lastName: 'Vezetéknév',
        emailAddress: 'Email cím',
        username: 'Felhasználónév',
        password: 'Jelszó',
        phoneNumber: 'Telefonszám',
        name: 'Név',
        description: 'Leírás',
        male: 'Hím',
        female: 'Nőstény',
        found: 'Talált',
        lost: 'Elveszett',
        wandering: 'Kóbor',
        breed: 'Fajta',
        sex: 'Nem',
        color: 'Szín',
        status: 'Státusz',
        age: 'Kor',
        years: 'Éves',
        city: 'Város',
        distance: 'Távolság',
        unknown: 'Nem tudni',
        hasChip: 'Chippelt',
        chipNumber: 'Chip #',
        dateLost: 'Dátum',
        sendMessage: 'Üzenet küldése',
        callOwner: 'Gazdi hívása',
        lastSeenLocation: 'Utolsó ismert tartózkodás',
        oops: 'Hoppá',
        submit: 'Küldés',
        dashboard: 'Kezdőoldal',
        submitLostDog: 'Elveszett kutya jelentése',
        emailInvalid: 'Kérjük adjon meg egy megfelelő email címet',
        requiredField: '* kötelező mező',
    },
    dashboard: {
        emptyResult: 'Nem találtunk egy kutyát sem a keresési paraméterekkel!',
        endReached: 'Elérted a lista végét!',
        card: {
            submittedTimes: {
                justNow: 'Épp most',
                minutesAgo: 'perce',
                hoursAgo: 'órája',
                daysAgo: 'napja',
                weeksAgo: 'hete',
                monthsAgo: 'több mint egy hónapja',
            },
        },
    },
    locationPicker: {
        usageInfo: 'Koppints a térképre, hogy a kutya utolsó ismert tartózkodási helyét megváltoztasd!',
        currentCoordinates: 'Jelenlegi koordináták: ',
    },
    submitForm: {
        validation: {
            fieldEmpty: 'Ez a mező nem lehet üres',
            phoneNumberInvalid: 'Kérjük adjon meg egy megfelelő telefonszámot',
            noImage: 'Készíts vagy válassz ki egy képet az elveszett kutyusról!',
            imageTooLarge: 'A kép mérete nem lehet nagyobb mint 1 Gb!'
        },
        loading: {
            processing: 'Kitartást, dolgozunk a kérésen:',
            validatingForm: 'Beviteli mezők ellenőrzése',
            compressingImage: 'Kép tömörítése',
            sendingRequest: 'Kérés küldése',
        }
    },
    login: {
        forgotPassword: 'Elfelejtetted a jelszavad?',
        emptyPasswordOrUsername: 'A felhasználónév vagy a jelszó üres',
        wrongLoginCredentials: 'Hibás felhasználónév vagy a jelszó!',
    },
    signUp: {
        confirmPassword: 'Jelszó megerősítése',
        userNameInvalid: 'Olyan felhasználónevet válasszon ami legalább 5 karakter hosszú és az angol abc karaktereiből vagy számokból áll.',
        passwordInvalid: 'Kérjük adjon meg egy megfelelő jelszót. A jelszónak legalább:\n\t* 8 karakter hosszúnak kell lennie\n\t* tartalmaznia kell legalább egy számot\n\t* kisbetűkből és nagybetűkből kell hogy álljon.',
        passwordsNotMatching: 'A jelszavak nem egyeznek.',
        emptyFirstName: 'Kérjük adja meg a keresztnevét',
        emptyLastName: 'Kérjük adja meg a vezetéknevét',
        usernameTaken: 'A felhasználónév foglalt',
        emailTaken: 'Az email cím foglalt',
    },
    toast: {
        headerText: 'Probléma történt',
        unknownError: 'Ismeretlen hiba történt. Próbáld újra',
        submitLostDog: {
            unsafeImage: 'A kiválasztott kép tartalma nem biztonságos!',
            imageNotADog: 'Nem tudtuk a kutyát felismerni a képen. Válassz ki egy másik képet a kutyáról és próbáld újra!'
        }
    },
    permissions: {
        location: {
            enableLocation: 'Helymeghatarozás engedélyezése',
            allowLocation: 'Engedély megadása',
            askDescription: 'A Helymeghatarozás funkció szükséges a közelben levő megosztások megjelenítéséhez és az új megosztások megjelenítéséhez. Az alkalmazás használatának megkezdéséhez nyomja meg a „Hely engedélyezése” gombot. Ha nem működik, kérjük, látogassa meg az eszköz beállításait, és engedélyezze az alkalmazás hozzáférését a Helymeghatarozás funkcióhoz.',
            openSettings: 'Beallitások megnyitása',
            permissionDeniedDescription: 'Az alkalmazás működéséhez szükséges Helymeghatarozás funkció. Nyomja meg a „Beállítások megnyitása” gombot, és engedélyezze a helymeghatározási funkciót ehhez az alkalmazáshoz.',
        }
    },
};
// á é í ú ü ű ó ö ő