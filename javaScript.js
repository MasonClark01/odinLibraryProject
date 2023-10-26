let usersLibrary = []
const bookshelfDiv = document.getElementById("books")
const addBook = document.getElementById("newBook")
const overlay = document.querySelector("#overlay")

function book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
function displayBooks(){
    bookshelfDiv.innerHTML = ""
    console.log("firing!")
    for(b in usersLibrary){
        const bCard = document.createElement("div")
        bCard.classList.add("book")
        const bTitle = document.createElement("p")
        const bAuthor = document.createElement("p")
        const bPages = document.createElement("p")
        const bRead = document.createElement("button")

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
        bRead.addEventListener("click", toggleReadStatus)
        bCard.appendChild(bTitle)
        bCard.appendChild(bAuthor)
        bCard.appendChild(bPages)
        bCard.appendChild(bRead)
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
    newAuthor.type = "text"
    pages.type = "text"
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
    submit.addEventListener("click", (e) => createBook(newName.value, newAuthor.value, pages.value, read.checked))
}
function createBook(name, author, pageCount, status){
    const newBookCard = new book(name, author, pageCount, status)
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
addBook.addEventListener("click", newBook)