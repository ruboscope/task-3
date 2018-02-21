
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognizing;
var personList = [],
    computerList = [];
    // Использую заранее заданный массив городов, т.к. еще не нашел источника, откуда можно вытянуть города на букву.
var cityList = ['Шанхай', 'Пекин', 'Гуанчжоу', 'Харбин', 'Гонконг', 'Шэньчжэнь', 'Чунцин', 'Урумчи', 'Ухань', 'Ланьчжоу', 'Баотоу', 'Синин', 'Хэфэй', 'Гуйян', 'Шэньян', 'Далянь', 'Ляньюньган', 'Фучжоу', 'Сямынь', 'Хуанши', 'Чанша', 'Шаоян', 'Шицзячжуан', 'Таншань', 'Циньхуандао', 'Ханьдань', 'Чэндэ', 'Чжанцзякоу', 'Дацин', 'Хэган', 'Цзямусы', 'Цицикар', 'Чжэнчжоу', 'Аньян', 'Кайфэн', 'Пуян', 'Наньян', 'Пиндиншань', 'Лоян', 'Синьсян', 'Синьян', 'Гирин', 'Чанчунь', 'Наньчан', 'Нанкин', 'Уси', 'Чанчжоу', 'Сучжоу', 'Янчжоу', 'Янчэн', 'Сюйчжоу', 'Тайчжоу', 'Вэньчжоу', 'Нинбо', 'Ханчжоу', 'Цзинань', 'Циндао', 'Жичжао', 'Тайань', 'Яньтай', 'Цзыбо', 'Тайюань', 'Датун', 'Линьфынь', 'Сиань', 'Хуайань', 'Суцянь', 'Лицзян', 'Куньмин', 'Хух-Хото', 'Лючжоу', 'Наньнин', 'Тяньцзинь', 'Фуян', 'Иян', 'Юэян', 'Хайкоу', 'Хуайбэй', 'Хуайнань', 'Шаогуань', 'Фошань', 'Дунгуань', 'Шаньтоу', 'Чжаньцзян', 'Чжуншань', 'Чжухай', 'Инкоу', 'Ляоян', 'Фусинь', 'Фушунь', 'Бэньси', 'Аньшань', 'Гуанъюань', 'Наньчун', 'Чэньчжоу', 'Чэнду', 'Дэян', 'Цзыгун', 'Паньчжихуа', 'Эчжоу', 'Ичан', 'Мяньян', 'Линьи', 'Чжэньцзян', 'Ибинь', 'Уху', 'Вэйфан', 'Баодин', 'Баоцзи', 'Хэцзэ', 'Шанжао', 'Дунъин', 'Ляочэн', 'Бочжоу', 'Хэнъян', 'Путянь', 'Мумбай', 'Дели', 'Калькутта', 'Ченнай', 'Бангалор', 'Хайдарабад', 'Ахмадабад', 'Пуна', 'Сурат', 'Джайпур', 'Канпур', 'Лакхнау', 'Нагпур', 'Газиабад', 'Индаур', 'Коямпуттур', 'Кочин', 'Патна', 'Каликут', 'Бхопал', 'Триссур', 'Вадодара', 'Агра', 'Вишакхапатнам', 'Малаппурам', 'Тируванантапурам', 'Каннур', 'Лудхияна', 'Нашик', 'Виджаявада', 'Мадурай', 'Варанаси', 'Мирут', 'Фаридабад', 'Раджкот', 'Джамшедпур', 'Сринагар', 'Джабалпур', 'Асансол', 'Васаи-Вирар', 'Аллахабад', 'Дханбад', 'Кальян', 'Аурангабад', 'Амритсар', 'Джодхпур', 'Ранчи', 'Райпур', 'Коллам', 'Гвалиор', 'Бхилаи', 'Чандигарх', 'Тируччираппалли', 'Кота', 'Сан-Паулу', 'Рио-де-Жанейро', 'Салвадор', 'Бразилиа', 'Форталеза', 'Белу-Оризонти', 'Манаус', 'Куритиба', 'Ресифи', 'Порту-Алегри', 'Белен', 'Гояния', 'Гуарульюс', 'Кампинас', 'Сан-Луис', 'Сан-Гонсалу', 'Масейо', 'Москва', 'Санкт-Петербург Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Самара', 'Казань', 'Омск', 'Челябинск', 'Уфа', 'Ростов-на-Дону', 'Красноярск', 'Волгоград', 'Пермь', 'Воронеж', 'Джакарта', 'Сурабая', 'Бандунг', 'Бекаси', 'Медан', 'Тангеранг', 'Депок', 'Семаранг', 'Палембанг', 'Тангеранг-Селатан', 'Макасар', 'Батам', 'Пеканбару', 'Богор', 'Токио', 'Йокогама', 'Осака', 'Нагоя', 'Саппоро', 'Кобе', 'Киото', 'Фукуока', 'Кавасаки', 'Сайтама', 'Хиросима', 'Сэндай', 'Лагос', 'Кано', 'Ибадан', 'Бенин-Сити', 'Порт-Харкорт', 'Кадуна', 'Аба', 'Абуджа', 'Майдугури', 'Илорин', 'Варри', 'Мехико', 'Гвадалахара', 'Монтеррей', 'Пуэбла-де-Сарагоса', 'Чиуауа', 'Сьюдад-Хуарес', 'Тихуана', 'Леон', 'Несауалькойотль', 'Сапопан', 'Сеул', 'Пусан', 'Инчхон', 'Тэгу', 'Тэджон', 'Кванджу', 'Чханвон', 'Сувон', 'Ульсан', 'Соннам', 'Нью-Йорк', 'Лос-Анджелес', 'Чикаго', 'Хьюстон', 'Финикс', 'Филадельфия', 'Сан-Антонио', 'Даллас', 'Сан-Диего', 'Карачи', 'Лахор', 'Фейсалабад', 'Равалпинди', 'Хайдарабад', 'Мултан', 'Гуджранвала', 'Пешавар', 'Исламабад', 'Тегеран', 'Мешхед', 'Кередж', 'Тебриз', 'Шираз', 'Исфахан', 'Кум', 'Ахваз', 'Стамбул', 'Анкара', 'Измир', 'Бурса', 'Адана', 'Газиантеп', 'Сидней', 'Мельбурн', 'Брисбен', 'Перт', 'Аделаида', 'Йоханнесбург', 'Кейптаун', 'Претория', 'Дурбан', 'Соуэто', 'Дакка', 'Читтагонг', 'Нараянгандж', 'Кхулна', 'Газипур', 'Каир', 'Александрия', 'Гиза', 'Шубра-Эль-Хейма', 'Богота', 'Барранкилья', 'Кали', 'Медельин', 'Каракас', 'Маракайбо', 'Валенсия', 'Баркисимето', 'Манила', 'Кесон-Сити', 'Калукан', 'Давао', 'Эр-Рияд', 'Джидда', 'Мекка', 'Медина', 'Берлин', 'Мюнхен', 'Гамбург', 'Кёльн', 'Багдад', 'Мосул', 'Басра', 'Эрбиль', 'Киншаса', 'Лубумбаши', 'Мбужи-Майи', 'Кананга', 'Касабланка', 'Рабат', 'Марракеш', 'Фес', 'Киев', 'Харьков', 'Одесса', 'Буэнос-Айрес', 'Кордова', 'Росарио', 'Ханой', 'Хошимин', 'Хайфон', 'Тайбэй', 'Гаосюн', 'Тайчжун', 'Торонто', 'Монреаль', 'Лондон', 'Бирмингем', 'Мадрид', 'Барселона', 'Рим', 'Милан', 'Алма-Ата', 'Астана', 'Дамаск', 'Халеб', 'Кито', 'Гуаякиль', 'Аккра', 'Кумаси', 'Дуала', 'Яунде', 'Хартум', 'Омдурман', 'Санта-Крус-де-ла-Сьерра', 'Эль-Альто', 'Янгон', 'Мандалай', 'Найроби', 'Дубай', 'Бангкок', 'Сингапур', 'Белград', 'Хараре', 'Сана', 'Мапуту', 'Вена', 'Монровия', 'Куала-Лумпур', 'Конакри', 'Окленд', 'Тегусигальпа', 'Гватемала', 'Абиджан', 'Браззавиль', 'Манагуа', 'Пномпень', 'Монтевидео', 'Уагадугу', 'София', 'Бейрут', 'Антананариву', 'Сантьяго', 'Аддис-Абеба', 'Бамако', 'Луанда', 'Порт-о-Пренс', 'Гавана', 'Могадишо', 'Санто-Доминго', 'Дакар', 'Лима', 'Дар-эс-Салам', 'Лусака', 'Кампала', 'Триполи', 'Алжир', 'Пхеньян', 'Амман', 'Минск', 'Бухарест', 'Варшава', 'Прага', 'Будапешт', 'Афины', 'Баку', 'Ереван', 'Тбилиси', 'Кабул', 'Ташкент', 'Улан-Батор', 'Париж'];
var row;
var noteBlockFlag = true;
var timer;
var stopLetters = ['ь', 'ъ', 'ы', 'й'];
var recognition = new SpeechRecognition();
recognition.lang = 'ru-RU'
reset();
recognition.onend = reset;

recognition.onstart = function () {
    recognizing = true;
    inputSearchField.disabled = true;
    inputSearchButton.style.visibility = 'hidden';
    speechRec.style.color = '#a6001a';
    speechRec.style.animation = 'pulse 1s infinite';
};
recognition.onerror = function (event) {
    // Что будет при ошибке?
    if (event.error == 'no-speech') {
        reset();
    }
    if (event.error == 'audio-capture') {
        reset();
    }
    if (event.error == 'not-allowed') {
        reset();
    }
};

recognition.onend = function () {
    reset();
};

recognition.onresult = function (event) {
    for (var i = 0; i < event.results.length; ++i) {
        if (event.results) {
            recognizing = true;
            inputSearchField.value = event.results[i][0].transcript;
            outputField.value = event.results[i][0].transcript;
            speechRec.style.color = '#fff';
            speechRec.style.animation = '';
            inputSearch();
        }
    }
}

function reset() {
    recognizing = false;
    speechRec.style.color = '#fff';
    speechRec.style.animation = '';
}

function speechSearch() {
    if (recognizing) {
        inputSearchField.disabled = false;
        inputSearchButton.style.display = 'block';
        recognition.stop();
        reset();
    } else {
        recognition.start();
    }
}
function inputSearch() {
    var city = inputSearchField.value.toLowerCase();
    if (personList.length > 0) {
        var lastLetter = (stopLetters.includes(computerList[computerList.length - 1].slice(-1)) ? computerList[computerList.length - 1].slice(-2, -1) : computerList[computerList.length - 1].slice(-1));
    }
    if (city && city.length > 2) {
        if (personList.length > 0 && city.charAt(0) == lastLetter) {
            checkCityInLists(city, true, personList);
        }
        else if (personList.length == 0) {
            timerBlock.style.display = 'block';
            checkCityInLists(city, true, personList);
        }
        else {
            alert('Ваш город начинается не с той буквы! Буква для города -"' + lastLetter + '"');
        }
    }
    else {
        alert('Ваш город не подходит! Попробуйте другой!')
    }
}
function countdownTimer(opponent) {
    if (typeof timer !== 'undefined') clearInterval(timer);
    var countDownDate = new Date().getTime() + 20000;
    timer = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var seconds = Math.floor((distance % (1000 * 60)) / 1200);
        secondsLeft.innerHTML = seconds + "s ";
        if (distance < 0) {
            clearInterval(timer);
            timerBlock.style.display = 'none';
            // .innerHTML = "Игра окончена";
            checkWinner();
        }
    }, 1000);
    if (opponent == false) {
        computerRound();
    }
    else {
        personRound();

    }
}


function computerRound() {
    computerRoundText.style.display = "block";
    personRoundText.style.display = "none";
    personInputBlock.style.display = 'block';

    document.body.style.backgroundColor = '#f2552c';
    //block inputa i bottuna
    setTimeout(function () {
        var lastLetter = (stopLetters.includes(personList[personList.length - 1].slice(-1)) ? personList[personList.length - 1].slice(-2, -1) : personList[personList.length - 1].slice(-1));
        var letterCityList = cityList.filter(x => x.charAt(0) == lastLetter.toUpperCase());
        var letterRandName = '';
        try {
            letterRandName = letterCityList[getRandomArbitrary(0, letterCityList.length)].toLowerCase();
        } catch (e) {
            clearInterval(timer);
            timerBlock.style.display = 'none';
            // .innerHTML = "Игра окончена";
            checkWinner();
        }
        // console.log('computeword is' + letterRandName);
        checkCityInLists(letterRandName, false, computerList);
    }, 2000);
}
function getRandomArbitrary(min, max) {
    return Math.floor((Math.random() * (max - min) + min));
}

function personRound() {
    personInputBlock.style.display = 'block';
    document.body.style.backgroundColor = '#4F84C4';

    computerRoundText.style.display = "none";
    personRoundText.style.display = "block";

//Игра между компьютерами
    /*setTimeout(function () {
        if(computerList.length > 0){
            var lastLetter = (stopLetters.includes(computerList[computerList.length - 1].slice(-1)) ? computerList[computerList.length - 1].slice(-2, -1) : computerList[computerList.length - 1].slice(-1));
            var letterCityList = cityList.filter(x => x.charAt(0) == lastLetter.toUpperCase());
            var letterRandName = '';
                try {
                    letterRandName = letterCityList[getRandomArbitrary(0, letterCityList.length)].toLowerCase();
                } catch (e) {
                    clearInterval(timer);
                    timerBlock.style.display = 'none';
                    // .innerHTML = "Игра окончена";
                    checkWinner();
                }
            checkCityInLists(letterRandName, true, personList);

        }
                }, 2000);*/

}

function checkCityInLists(city, opponent, opponentList) {

    if (personList.includes(city) || computerList.includes(city)) {
        if (opponent == false) {
            console.log('Компьютер ошибся!');
            computerRound();
        }
        else {
            alert('Ошибка! Данное слово уже использовалось! Введите другое слово!');
            return;
        }
    }
    else {
        checkCityOnMapAndPush(city, opponent, opponentList);
    }
}
function checkCityOnMapAndPush(city, opponent, opponentList) {
    var flag = true;
    var myGeocoder = ymaps.geocode(city, { kind: 'locality', results: 1 });
    var iconColor = 'islands#redDotIconWithCaption';

    if (opponent) {
        iconColor = 'islands#darkBlueDotIconWithCaption';
        row = resultsTable.insertRow(1)
    }
    myGeocoder.then(
        function (res) {
            // Выбираем первый результат геокодирования.
            var obj = res.geoObjects.get(0);
            /*проблема с отсутсвующими на карте объектами пока не решена*/
            if (!obj) {
                // city = city + ' *';
            }
            // Координаты геообъекта.
            var coords = obj.geometry.getCoordinates();
            // Область видимости геообъекта.
            var bounds = obj.properties.get('boundedBy');


            obj.options.set('preset', iconColor);
            // Получаем строку с адресом и выводим в иконке геообъекта.
            obj.properties.set('iconCaption', city.charAt(0).toUpperCase() + city.slice(1));
            // Добавляем первый найденный геообъект на карту.
            myMap.geoObjects.add(obj);
        },
        function (err) {
            flag = false;
            alert('Ошибка! Подобный город не найден.');
        }
    );
    if (flag) {
        // var cityTotalBefore = ymaps.geoQuery(myMap.geoObjects).searchIntersect(myMap).getLength();
        // if(cityTotalBefore < (personList.length + computerList.length) && noteBlockFlag){
        //     row.lastElementChild.textContent += ' *';
        //     noteBlockFlag = false;
        // }
        // console.log(cityTotalBefore);
        outputField.value = city.charAt(0).toUpperCase() + city.slice(1);
        // console.log(city);
        row.insertCell(+(!opponent)).innerHTML = city.charAt(0).toUpperCase() + city.slice(1);
        opponentList.push(city);
        if (!opponent) {
            inputSearchField.value = stopLetters.includes(city) ? city.charAt(city.length - 2).toUpperCase() : city.charAt(city.length - 1).toUpperCase();
        }
        countdownTimer(!opponent);
    }
}
function callMe(fakeFlag) {
    flag = fakeFlag;
}

function startGame(again) {

    computerRoundText.style.display = "none";
    personRoundText.style.display = "block";
    startButtonBlock.style.display = 'none';
    mainBlock.style.display = 'block';
    if (again) {
        init();
        personList = [];
        computerList = [];
        inputSearchField.value = '';
        outputField.value = '';
        row = undefined;
        noteBlockFlag = true;
        for (var i = resultsTable.rows.length - 1; i > 0; i--) {
            resultsTable.deleteRow(i)
        }
        noteBlock.style.display = 'none';
        resultsBlock.style.display = 'none';
    }
    else {
        document.body.style.color = 'white';
        header.setAttribute('id', 'headerInGame');
    }
    personRound();
}

function checkWinner() {
    mainBlock.style.display = 'none';
    myMap.destroy();
    myMap = null;
    if (personList.length > computerList.length) {
        whoIs.innerHTML = 'ТЫ';
        document.body.style.backgroundColor = '#4F84C4';
    }
    else {
        whoIs.innerHTML = 'КОМПЬЮТЕР';
        document.body.style.backgroundColor = '#f2552c';
    }
    resultsBlock.style.display = "block";
    if (!noteBlockFlag) {
        noteBlock.style.display = 'block';
    }
}


/****mapBlock****/

ymaps.ready(init);
function init() {

    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("mapBlock").
    myMap = new ymaps.Map('mapBlock', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [53.55, 27.33], // Минск
        zoom: 1
    });

}