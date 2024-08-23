document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const bookResults = document.getElementById("bookResults");
    const clearBtn = document.getElementById('clearBtn');
    const loadingOverlay = document.querySelector('.loading-overlay');

    if (searchBtn) {
        searchBtn.addEventListener("click", fetchBooks);
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", clearResults); // Added event listener for clearBtn
    }

    function fetchBooks() {
        loadingOverlay.style.display = 'flex';
        const query = searchInput.value.trim();
        if (!query) {
            loadingOverlay.style.display = 'none';
            alert("Please enter a book title to search.");
            return;
        }

        const apiUrl = `https://openlibrary.org/search.json?q=${query}`;
        bookResults.innerHTML = "<p>Please wait...</p>";

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                loadingOverlay.style.display = 'none';
                displayBooks(data.docs);
            })
            .catch(error => {
                loadingOverlay.style.display = 'none';
                console.error("Error fetching books:", error);
                bookResults.innerHTML = "<p>Failed to load book data. Please try again.</p>";
            });
    }

    function displayBooks(books) {
        if (books.length === 0) {
            bookResults.innerHTML = "<p>No books found. Please try a different search.</p>";
            return;
        }

        bookResults.innerHTML = "";
        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.className = "book-card";

            const bookTitle = document.createElement("h3");
            bookTitle.textContent = book.title;
            bookCard.appendChild(bookTitle);

            if (book.cover_i) {
                const coverImage = document.createElement("img");
                coverImage.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
                coverImage.alt = "Book Cover";
                coverImage.style.display = "block"; // Make the image a block-level element
                coverImage.style.margin = "0 auto"; // Center the image horizontally
                bookCard.appendChild(coverImage);
            }         

            const openLibraryLink = document.createElement("a");
            openLibraryLink.href = `https://openlibrary.org${book.key}`;
            openLibraryLink.textContent = "View on Open Library";
            openLibraryLink.target = "_blank";
            openLibraryLink.style.display = "block"; // Make the link a block-level element
            openLibraryLink.style.textAlign = "center"; // Center the text within the link
            bookCard.appendChild(openLibraryLink);

            if (book.author_name) {
                const bookAuthor = document.createElement("p");
                bookAuthor.innerHTML = `<strong>Author:</strong> ${book.author_name.join(", ")}`;
                bookCard.appendChild(bookAuthor);
            }

            if (book.first_publish_year) {
                const publishYear = document.createElement("p");
                publishYear.innerHTML = `<strong>First Published:</strong> ${book.first_publish_year}`;
                bookCard.appendChild(publishYear);
            }

            if (book.edition_count) {
                const editionCount = document.createElement("p");
                editionCount.innerHTML = `<strong>Edition Count:</strong> ${book.edition_count}`;
                bookCard.appendChild(editionCount);
            }

            if (book.ebook_access) {
                const ebookAccess = document.createElement("p");
                ebookAccess.innerHTML = `<strong>Ebook Access:</strong> ${book.ebook_access}`;
                bookCard.appendChild(ebookAccess);
            }

            if (book.language) {
                const bookLanguage = document.createElement("p");
                bookLanguage.innerHTML = `<strong>Language:</strong> ${book.language.join(", ")}`;
                bookCard.appendChild(bookLanguage);
            }

            if (book.isbn) {
                const isbnContainer = document.createElement("div");
                isbnContainer.className = "isbn-container";
                const isbnLabel = document.createElement("p");
                isbnLabel.innerHTML = `<strong>ISBN:</strong>`;
                isbnContainer.appendChild(isbnLabel);
                book.isbn.forEach(isbn => {
                    const isbnBox = document.createElement("span");
                    isbnBox.className = "isbn-box";
                    isbnBox.textContent = isbn;
                    isbnContainer.appendChild(isbnBox);
                });
                bookCard.appendChild(isbnContainer);
            }

            bookResults.appendChild(bookCard);
        });
    }

    function clearResults() {
        bookResults.innerHTML = "";
        searchInput.value = "";
    }
});
