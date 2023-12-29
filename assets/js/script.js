// script.js

let currentPage = 1;
const loadingElement = document.getElementById('loading');

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1) {
        currentPage++;
        searchBooks(true);
    }
});

const filterSelect = document.getElementById('filterSelect');
const sortSelect = document.getElementById('sortSelect');
filterSelect.addEventListener('change', searchBooks);
sortSelect.addEventListener('change', searchBooks);

function showLoading() {
    loadingElement.style.display = 'block';
}

function hideLoading() {
    loadingElement.style.display = 'none';
}

function searchBooks(paginate = false) {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value;
    const filter = filterSelect.value;
    const sort = sortSelect.value;

    if (!query) {
        alert('Пожалуйста, введите запрос');
        return;
    }
    if (!paginate) {
        document.getElementById('results').innerHTML = '';
        currentPage = 1;
    }

    showLoading();

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&filter=${filter}&sort=${sort}&startIndex=${(currentPage - 1) * 10}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            hideLoading();
        });
}
function searchBooks(paginate = false) {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value;
    const filterSelect = document.getElementById('filterSelect');
    const sortSelect = document.getElementById('sortSelect');
    const filter = filterSelect.value;
    const sort = sortSelect.value;

    if (!query) {
        alert('Пожалуйста, введите запрос');
        return;
    }
    if (!paginate) {
        document.getElementById('results').innerHTML = '';
        currentPage = 1;
    }

    showLoading();

    
    let url;
    if (filter === 'all') {
        
        url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&sort=${sort}&startIndex=${(currentPage - 1) * 10}`;
    } else {
       
        url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&filter=${filter}&sort=${sort}&startIndex=${(currentPage - 1) * 10}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            hideLoading();
        });
}

function displayResults(books) {
    const resultContainer = document.getElementById('results');

    books.forEach(book => {
        const bookEl = document.createElement('div');
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Неизвестные авторы';
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://www.wikihow.com/images/thumb/a/a3/What-book-should-i-read-quiz-image.png/1200px-What-book-should-i-read-quiz-image.png';
        const description = book.volumeInfo.description ? book.volumeInfo.description : 'Нет описания';
        const language = book.volumeInfo.language ? book.volumeInfo.language : 'Неизвестный язык';
        const infoLink = book.volumeInfo.infoLink ? book.volumeInfo.infoLink : '#';

        bookEl.classList.add('wrapper');
        bookEl.innerHTML = `
        <div class="product-img">
            <img src="${thumbnail}" height="430" width="340">
        </div>
        <div class="product-info">
            <div class="product-text">
                <h1>${book.volumeInfo.title}</h1>
                <p class="description">${description}</p>
                <p>Авторы: ${authors}</p>
                <p>Язык: ${language}</p>
                <a href="${infoLink}" target="_blank">Подробнее</a>
            </div>
        </div>`;

        
        bookEl.addEventListener('mouseover', () => {
            const descriptionElement = bookEl.querySelector('.description');
            descriptionElement.style.display = 'block';
        });

        bookEl.addEventListener('mouseout', () => {
            const descriptionElement = bookEl.querySelector('.description');
            descriptionElement.style.display = 'none';
        });

        resultContainer.appendChild(bookEl);
    });
}


