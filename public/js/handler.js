const URL_API = 'http://localhost:3000/api'

$( document ).ready(function() {
    getVocabulary()

    const   btnMenu = document.querySelector('#menu'),
        menuContent = document.querySelector('.menu-content');

    btnMenu.addEventListener('click', () =>{
        menuContent.classList.toggle('menu-active');
    });

    $('#btnReload').on('click', function (e) {
        e.preventDefault()
        getVocabulary()
    })
});

function getVocabulary() {
    $('#wrapperCards').html('')
    $('#loading').css("display", "");

    fetch(`${URL_API}/vocabulary`)
        .then( (response) => response.json() )
        .then(data => {
            printHtml(data)
        })
        .catch((error) => console.error(error))
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