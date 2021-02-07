const URL_API = 'http://localhost:3000/api'

$( document ).ready(function() {
    getWords()

    const   btnMenu = document.querySelector('#menu'),
        menuContent = document.querySelector('.menu-content');

    btnMenu.addEventListener('click', () =>{
        menuContent.classList.toggle('menu-active');
    });

    $('#btnReload').on('click', function (e) {
        e.preventDefault()
        getWords()
    })

    $('#modal1 #btnSave').on('click', function (e) {
        e.preventDefault()

        let english = $('#wordEnglish').val()
        let spanish = $('#wordSpanish').val()
        let pronunciation = $('#pronunciation').val()

        if(wordEnglish==="" || wordSpanish==="" || pronunciation===""){
            showMessage(`<strong>All fields are required!</strong>`)
            return false;
        }

        saveWord({ english, spanish, pronunciation })
    })
});

function showMessage(msg) {
    $('#msgvalidation').html(msg).css("display", "");
    setTimeout(function() {
        $('#msgvalidation').html('').css("display", "none");
    }, 2000 );
}

function getWords() {
    $('#wrapperCards').html('')
    $('#loading').css("display", "")
    $('#msgvalidation').css("display", "none")

    fetch(`${URL_API}/vocabulary`)
        .then( (response) => response.json() )
        .then(data => {
            printHtml(data)
        })
        .catch((error) => console.error(error))
}

function saveWord(word) {
    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(word)
    }
    fetch(`${URL_API}/vocabulary`, options)
        .then( (response) => response.json() )
        .then(data => {
            if(data.vocabulary && data.vocabulary === "WORD_EXIST") {
                showMessage(`<strong>The word already exists!</strong>`)
                return false
            }

            showMessage(`<strong>The word was added successfully!</strong>`)

            getWords()
        })
        .catch((error) => {
            console.error(error)
            showMessage(`<strong>An error has occurred, please try again later!</strong>`)
        })
}

function printHtml(data) {
    let html = []
    if(data.vocabularies && data.vocabularies.length > 0) {
        data.vocabularies.forEach(item => {
            html.push(`
                <div class=" card [ is-collapsed ] ">
                    <div class="card__inner [ js-expander ]">
                        <span>${item.english}</span>
                        <i class="fa fa-folder-o"></i>
                    </div>
                    <div class="card__expander">
                        <i class="fa fa-close [ js-collapser ]"></i>
                        <div class="card__more_info">
                            <strong class="card__subtitle">Spanish:</strong> ${item.spanish} <br>
                            <strong class="card__subtitle">Pronunciation:</strong> /${item.pronunciation}/
                        </div>
                    </div>
                </div>
            `)
        })
    }

    $('#loading').css("display", "none");
    $('#wrapperCards').html(html.join(' '))
    eventCards()
}

function eventCards() {
    const $cell = $('.card');

    //open and close card when clicked on card
    $cell.find('.js-expander').click(function() {

        const $thisCell = $(this).closest('.card');

        if ($thisCell.hasClass('is-collapsed')) {
            $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed').addClass('is-inactive');
            $thisCell.removeClass('is-collapsed').addClass('is-expanded');

            if ($cell.not($thisCell).hasClass('is-inactive')) {
                //do nothing
            } else {
                $cell.not($thisCell).addClass('is-inactive');
            }

        } else {
            $thisCell.removeClass('is-expanded').addClass('is-collapsed');
            $cell.not($thisCell).removeClass('is-inactive');
        }
    });

    //close card when click on cross
    $cell.find('.js-collapser').click(function() {

        const $thisCell = $(this).closest('.card');

        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
        $cell.not($thisCell).removeClass('is-inactive');

    });
}