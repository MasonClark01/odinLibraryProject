let usersLibrary = []
const bookshelfDiv = document.getElementById("books")
const addBook = document.getElementById("newBook")
const overlay = document.querySelector("#overlay")

function book(title, author, pages, read, bIndexValue){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.bIndexValue = bIndexValue
}
function displayBooks(){
    bookshelfDiv.innerHTML = ""
    for(b in usersLibrary){
        usersLibrary[b].bIndexValue = b
        const bCard = document.createElement("div")
        bCard.classList.remove.item
        bCard.classList.add("book")
        bCard.classList.add(`bookNum_${usersLibrary[b].bIndexValue}`)
        const bTitle = document.createElement("p")
        const bAuthor = document.createElement("p")
        const bPages = document.createElement("p")
        const bRead = document.createElement("button")
        const bDelete = document.createElement("button")
        bDelete.innerText = "Delete"

        bTitle.innerText = usersLibrary[b].title
        bAuthor.innerText = usersLibrary[b].author
        bPages.innerText = usersLibrary[b].pages
        if(usersLibrary[b].read === true){
            bRead.innerText = "Read"
            bRead.style.backgroundColor = "rgba(65, 255, 65, 0.7)"
        }
        else{
            bRead.innerText = "Not Read"
            bRead.style.backgroundColor = "rgba(255, 65, 65, 0.7)"
        }
        bDelete.addEventListener("click", deleteBook)
        bRead.addEventListener("click", toggleReadStatus)
        bCard.appendChild(bTitle)
        bCard.appendChild(bAuthor)
        bCard.appendChild(bPages)
        bCard.appendChild(bRead)
        bCard.appendChild(bDelete)
        bookshelfDiv.appendChild(bCard)
    }
}

function newBook(){
    // Setting up form input fields
    const newB = document.createElement("form")
    const newName = document.createElement("input")
    const newAuthor = document.createElement("input")
    const pages = document.createElement("input")
    const read = document.createElement("input")
    const submit = document.createElement("input")
    const exit = document.createElement("input")
    //Setting input types
    newName.type = "text"
    newName.required = true
    newAuthor.type = "text"
    newAuthor.required = true
    pages.type = "text"
    pages.pattern = "\d*"
    read.type = "checkbox"
    submit.type = "button"
    exit.type = "button"
    //AddingLabels
    newName.placeholder = "Title"
    newAuthor.placeholder = "Author"
    pages.placeholder = "Pages"

    const readDiv = document.createElement("div")
    const readLabel = document.createElement("label")
    readLabel.innerText = "Read?"
    readDiv.appendChild(readLabel)
    readDiv.appendChild(read)

    const submitDiv = document.createElement("div")
    const submitLabel = document.createElement("label")
    submitLabel.innerText = "Submit:"
    submitDiv.appendChild(submitLabel)
    submitDiv.appendChild(submit)

    const exitDiv = document.createElement("div")
    const exitLabel = document.createElement("label")
    exitLabel.innerText = "Exit:"
    exitDiv.appendChild(exitLabel)
    exitDiv.appendChild(exit)

    read.classList.add("isRead")
    //AppendingInputs&Labels To the Form
    newB.appendChild(newName)
    newB.appendChild(newAuthor)
    newB.appendChild(pages)
    newB.appendChild(readDiv)
    newB.appendChild(submitDiv)
    newB.appendChild(exitDiv)
    //Opening the overlay and displaying the Form
    overlay.appendChild(newB)
    overlay.style.display = "flex"

    //Creating book card for html

    newB.classList.add("newBookForm")
    submit.addEventListener("click", (e) => createBook(newName.value, newAuthor.value, pages.value, read.checked, usersLibrary.length))
    exit.addEventListener("click", (e) => exitOverlay())
}
function createBook(name, author, pageCount, status, bIndexValue){
    const newBookCard = new book(name, author, pageCount, status, bIndexValue)
    console.log(newBookCard)
    usersLibrary.push(newBookCard)
    displayBooks()
    //Resetting and hiding the overlay
    overlay.innerHTML = ""
    overlay.style.display = "none"
}
function toggleReadStatus(){
    if(this.innerText === "Read"){
        this.innerText = "Not Read"
        this.style.backgroundColor = "rgba(255, 65, 65, 0.7)"
    }
    else{
        this.innerText = "Read"
        this.style.backgroundColor = "rgba(65, 255, 65, 0.7)"
    }
}
function exitOverlay(){
    overlay.innerHTML = ""
    overlay.style.display = "none"
}

function deleteBook(){
    const fetchBookNum = this.parentNode.classList.item(1)
    const bookNumToDelete = fetchBookNum.split("_")
    const bookToDelete = bookNumToDelete[1]
    for(i in usersLibrary){
        if(usersLibrary[i].bIndexValue === bookToDelete){
            usersLibrary.splice(bookToDelete, 1)
            displayBooks()
        }
    }
}

addBook.addEventListener("click", newBook)