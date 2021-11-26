let myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
}

Book.prototype.info  = function() {
    return this.title + " by " + this.author + ", " + 
    this.pages + " pages, " + ((read)? "read" : "not read yet"); 
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

// Function to add Book object to the myLibrary array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

const books_div = document.querySelector(".books");

function displayBooks() {
    books_div.innerHTML = "";

    
    myLibrary.forEach((libraryBook, index) => {
        const card = document.createElement("div");
        card.setAttribute("class", "book-card");
        card.setAttribute("data-index-book", index)

        const title_p = document.createElement("p");
        title_p.innerText = "Title: " + libraryBook.title;

        const author_p = document.createElement("p");
        author_p.innerText = "Author: " + libraryBook.author;

        const pages_p = document.createElement("p");
        pages_p.innerText = "Pages: " + libraryBook.pages;

        const read_p = document.createElement("p");
        read_p.innerText = "Read: " + ((libraryBook.read)? "Yes" : "No");

        const remove_btn = document.createElement("button");
        remove_btn.innerText = "Remove";

        const read_btn = document.createElement("button");
        read_btn.innerText = "Read";

        read_btn.addEventListener("click", function(e) {
            const idx = Number(card.getAttribute("data-index-book"));
            myLibrary[idx].toggleRead();
            read_p.innerText = "Read: " + ((libraryBook.read)? "Yes" : "No");
        });

        remove_btn.addEventListener("click", function(e) {
            myLibrary.splice(index, 1);
            displayBooks();
        });

        card.appendChild(title_p);
        card.appendChild(author_p);
        card.appendChild(pages_p);
        card.appendChild(read_p);
        card.appendChild(remove_btn);
        card.appendChild(read_btn);

        books_div.appendChild(card);
    })
}

// Add test book
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary(theHobbit);



const newBook_btn = document.querySelector("#newBook");
const form_div = document.querySelector(".form-overlay");
form_div.style.visibility = "hidden";

const container = document.querySelector(".container");

newBook_btn.addEventListener("click", function () {
    toggleForm();
    
});

const cancel_btn = document.querySelector("#cancel");

cancel_btn.addEventListener("click", function () {
    toggleForm();
    resetInputs();
});

const add_btn = document.querySelector("#add");
const title_txt = document.querySelector("#title");
const author_txt = document.querySelector("#author");
const pages_txt = document.querySelector("#pages");
const read_chk = document.querySelector("#read");

add_btn.addEventListener("click",  function() {
    const newBook = new Book(
        title_txt.value,
        author_txt.value,
        pages_txt.value,
        read_chk.checked
        );
    
    resetInputs();
    addBookToLibrary(newBook);
    toggleForm();
    displayBooks();
})

function resetInputs() {
    title_txt.value = "";
    author_txt.value = "";
    pages_txt.value = "";
    read_chk.checked = false;
}


function toggleForm() {
    if(form_div.style.visibility == "hidden") {
        form_div.style.visibility = "visible";
        container.style.visibility = "hidden"
    } else {
        form_div.style.visibility = "hidden";
        container.style.visibility = "visible"
    }
}

displayBooks();