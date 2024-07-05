let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  const readStatus = this.read ? 'read' : 'not read yet';
  return `${title} by ${author}, ${pages} pages, ${readStatus}`;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

library.push(new Book('The God of the Woods', 'Liz Moore', 496, false));

function addBookToLibrary(data) {
  library.push(new Book(...data));
}

function displayBooks() {
  const bookList = document.getElementById('books');
  while(bookList.firstChild){
    bookList.removeChild(bookList.firstChild);
  }
  library.map(createBookListItem).forEach(li => bookList.appendChild(li));
}

function createBookListItem(book, i) {
  const li = document.createElement('li');
  const dl = document.createElement('dl');

  Object.entries(book).forEach((entry) => {
    if (entry[0] === 'title') {
      li.innerText = entry[1];
      return;
    }

    const dt = document.createElement('dt');
    dt.className = 'capitalize';
    dt.innerText = `${entry[0]}:`;

    const dd = document.createElement('dd');
    let text = entry[1];
    if (entry[0] === 'read') {
      text = entry[1] ? 'Yes' : 'No';
    }
    dd.innerText = text;

    dl.appendChild(dt);
    dl.appendChild(dd);
  });
  li.appendChild(dl);

  const readButton = document.createElement('button');
  readButton.innerText = book.read ? 'Mark as unread' : 'Mark as read';
  readButton.addEventListener('click', () => {
    book.toggleRead();
    displayBooks();
  });
  li.appendChild(readButton);

  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.addEventListener('click', () => removeBook(i));
  li.appendChild(removeButton);

  return li;
}

function removeBook(bookIndex) {
  library = library.filter((_book, i) => i !== bookIndex);
  displayBooks();
}

const newBookButton = document.getElementById('new');
newBookButton.addEventListener('click', () => dialog.showModal());
const dialog = document.getElementById('new-book-dialog');
const form = document.getElementById('book-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (e.submitter.value === 'cancel') {
    closeDialog();
    return;
  }

  const formData = new FormData(form);
  let data = [];
  for (const value of formData.values()) {
    data.push(value);
  }
  addBookToLibrary(data);
  closeDialog();
  displayBooks();
});

function closeDialog() {
  dialog.close();
  form.reset();
}


displayBooks();
