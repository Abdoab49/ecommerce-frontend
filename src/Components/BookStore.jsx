import React, { useState, useEffect } from 'react';
import styles from './BookStore.module.css';

const BookStore = () => {
  const [books] = useState([
    // الكتب الستة الأولى (الموجودة)
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: "$22.99",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "Between life and death there is a library, filled with books containing alternate versions of your life.",
      category: "fiction",
      pages: 304,
      publisher: "Viking",
      published: "August 13, 2020",
      stars: 4.5,
      ratings: 12342,
      isNew: true
    },
    {
      id: 2,
      title: "The Song of Achilles",
      author: "Madeline Miller",
      price: "$16.95",
      image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "A retelling of the Trojan War through the eyes of Patroclus, an awkward young prince who forms an unbreakable bond with Achilles.",
      category: "fiction",
      pages: 416,
      publisher: "Ecco",
      published: "September 20, 2011",
      stars: 4.7,
      ratings: 9876,
      isNew: false
    },
    {
      id: 3,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: "$15.00",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "Set in the Jazz Age on Long Island, this tale of a mysterious millionaire, Jay Gatsby, his love for Daisy Buchanan, and lavish parties.",
      category: "classics",
      pages: 180,
      publisher: "Scribner",
      published: "April 10, 1925",
      stars: 4.3,
      ratings: 24680,
      isNew: false
    },
    {
      id: 4,
      title: "Project Hail Mary",
      author: "Andy Weir",
      price: "$28.99",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "Ryland Grace is the sole survivor on a desperate, last-chance mission to save humanity. Alone in space with no memory of his assignment.",
      category: "scifi",
      pages: 496,
      publisher: "Ballantine Books",
      published: "May 4, 2021",
      stars: 4.8,
      ratings: 7543,
      isNew: true
    },
    {
      id: 5,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: "$17.99",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "Alicia Berenson, a famous painter, shoots her husband five times in the face and then never speaks another word.",
      category: "mystery",
      pages: 336,
      publisher: "Celadon Books",
      published: "February 5, 2019",
      stars: 4.2,
      ratings: 18763,
      isNew: false
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      price: "$18.00",
      image: "https://images.unsplash.com/photo-1531072901881-d644216d4bf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "On the desert planet Arrakis, young Paul Atreides must navigate political intrigue, ecological importance, and his own destiny.",
      category: "scifi",
      pages: 896,
      publisher: "Ace Books",
      published: "August 1, 1965",
      stars: 4.6,
      ratings: 34098,
      isNew: false
    },

    // الكتب الستة الجديدة (7 إلى 12)
    {
      id: 7,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: "$14.99",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "The story of racial injustice and the loss of innocence in the American South, told through the eyes of young Scout Finch.",
      category: "classics",
      pages: 336,
      publisher: "J.B. Lippincott & Co.",
      published: "July 11, 1960",
      stars: 4.8,
      ratings: 45678,
      isNew: false
    },
    {
      id: 8,
      title: "1984",
      author: "George Orwell",
      price: "$13.99",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "A dystopian social science fiction novel about a totalitarian society under constant surveillance.",
      category: "classics",
      pages: 328,
      publisher: "Secker & Warburg",
      published: "June 8, 1949",
      stars: 4.7,
      ratings: 56789,
      isNew: false
    },
    {
      id: 9,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "Bilbo Baggins is a hobbit who enjoys a comfortable life until a wizard named Gandalf and a group of dwarves recruit him for a treasure hunt.",
      category: "fiction",
      pages: 310,
      publisher: "George Allen & Unwin",
      published: "September 21, 1937",
      stars: 4.9,
      ratings: 78901,
      isNew: false
    },
    {
      id: 10,
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      price: "$25.00",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "Four elderly friends in a retirement village form a club to solve cold cases, but find themselves investigating a real murder.",
      category: "mystery",
      pages: 368,
      publisher: "Viking Press",
      published: "September 3, 2020",
      stars: 4.4,
      ratings: 23456,
      isNew: true
    },
    {
      id: 11,
      title: "Children of Time",
      author: "Adrian Tchaikovsky",
      price: "$21.99",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "The last remnants of humanity search for a new home among the stars, while on a terraformed planet, spiders evolve to build their own civilization.",
      category: "scifi",
      pages: 600,
      publisher: "Tor Books",
      published: "June 4, 2015",
      stars: 4.6,
      ratings: 18765,
      isNew: false
    },
    {
      id: 12,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      price: "$18.99",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      synopsis: "Aging Hollywood starlet Evelyn Hugo finally reveals the truth about her glamorous and scandalous life, including her seven marriages.",
      category: "fiction",
      pages: 400,
      publisher: "Atria Books",
      published: "June 13, 2017",
      stars: 4.7,
      ratings: 34567,
      isNew: true
    }
  ]);

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let result = books;
    if (category !== 'all') {
      result = result.filter(book => book.category === category);
    }
    if (searchTerm) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredBooks(result);
  }, [category, searchTerm, books]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) starsHTML += '★';
    if (halfStar) starsHTML += '½';
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) starsHTML += '☆';
    return starsHTML;
  };

  const handleButtonClick = (e) => {
    e.target.style.opacity = '0.7';
    setTimeout(() => {
      e.target.style.opacity = '1';
    }, 200);
  };

  return (
    <div className={styles.container}>
      <div className={styles.paperTexture}></div>
      
      <div className={styles.header}>
        <h1 className={styles.logo}>Athenaeum Books</h1>
        <p className={styles.tagline}>Where timeless tales meet modern margins</p>
      </div>
      
      <div className={styles.controls}>
        <select 
          className={styles.filterDropdown} 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="fiction">Fiction</option>
          <option value="classics">Classics</option>
          <option value="mystery">Mystery & Thriller</option>
          <option value="scifi">Science Fiction</option>
        </select>
        
        <div className={styles.searchBox}>
          <input 
            className={styles.searchInput} 
            type="text" 
            placeholder="Search titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className={styles.bookGrid}>
        {filteredBooks.map(book => (
          <div key={book.id} className={styles.bookCard}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                {book.isNew && <div className={`${styles.bookBadge} ${styles.newArrival}`}>New Arrival</div>}
                <img className={styles.bookImage} src={book.image} alt={book.title} />
                <div className={styles.bookDetails}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>{book.author}</p>
                  <div className={styles.bookRatings}>
                    <span className={styles.stars}>{renderStars(book.stars)}</span>
                    <span className={styles.ratingCount}>({book.ratings.toLocaleString()})</span>
                  </div>
                  <p className={styles.bookPrice}>{book.price}</p>
                </div>
              </div>
              <div className={styles.cardBack}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookSynopsis}>{book.synopsis}</p>
                <div className={styles.bookInfoRow}>
                  <span className={styles.infoLabel}>Pages:</span>
                  <span className={styles.infoValue}>{book.pages}</span>
                </div>
                <div className={styles.bookInfoRow}>
                  <span className={styles.infoLabel}>Publisher:</span>
                  <span className={styles.infoValue}>{book.publisher}</span>
                </div>
                <div className={styles.bookInfoRow}>
                  <span className={styles.infoLabel}>Published:</span>
                  <span className={styles.infoValue}>{book.published}</span>
                </div>
                <button className={styles.addToCart} onClick={handleButtonClick}>Add to Cart</button>
                <button className={styles.addToWishlist} onClick={handleButtonClick}>Add to Wishlist</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookStore;