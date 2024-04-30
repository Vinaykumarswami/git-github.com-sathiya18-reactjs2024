const books = [
    { title: "Book 1", author: "Author 1", price: 10, available: true },
    { title: "Book 2", author: "Author 2", price: 15, available: false },
    { title: "Book 3", author: "Author 3", price: 20, available: true },
    { title: "Book 4", author: "Author 4", price: 10, available: true },
    { title: "Book 5", author: "Author 5", price: 15, available: false },
    { title: "Book 6", author: "Author 4", price: 20, available: true },
    { title: "Book 7", author: "Author 1", price: 10, available: true },
    { title: "Book 8", author: "Author 2", price: 15, available: false },
    { title: "Book 9", author: "Author 3", price: 20, available: true },
    { title: "Book 10", author: "Author 11", price: 10, available: true },
    { title: "Book 11", author: "Author 12", price: 15, available: false },
    { title: "Book 12", author: "Author 13", price: 20, available: true },
  ];
  
  const searchInput = document.getElementById('searchInput');
  const resultsDiv = document.getElementById('results');
  const totalPriceDiv = document.getElementById('totalPrice');

  function renderResults(query) {
    resultsDiv.innerHTML = ''; 
    let totalPrice = 0;
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));
    filteredBooks.forEach(book => {
      const buttonLabel = book.available ? "Borrow" : "Return";
      const buttonClass = book.available ? "available" : "borrowed";
      const button = `<button class="${buttonClass}" onclick="toggleAvailability('${book.title}')">${buttonLabel}</button>`;
      const borrowInfo = book.available ? '' : `<div>Borrowed Time: ${book.borrowTime}</div><div>Return Time: ${book.returnTime}</div>`;
      resultsDiv.innerHTML += `<div><strong>Title:</strong> ${book.title}, <strong>Author:</strong> ${book.author}, <strong>Price:</strong> $${book.price} ${button} ${borrowInfo}</div>`;
      totalPrice += book.price;
    });
   
    totalPriceDiv.innerHTML = `<strong>Total Price for all ten books:</strong> $${totalPrice}`;
  }
  

  function toggleAvailability(title) {
    const book = books.find(book => book.title === title);
    if (book.available) {
      book.available = false;
      const now = new Date();
      book.borrowTime = now.toLocaleString();
     
      const returnDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      book.returnTime = returnDate.toLocaleString();
    } else {
      book.available = true;
      book.borrowTime = null;
      book.returnTime = null;
    }
    renderResults(searchInput.value); 
  }
  
 
  searchInput.addEventListener('input', function() {
    renderResults(this.value);
  });
  
 
  renderResults('');
  