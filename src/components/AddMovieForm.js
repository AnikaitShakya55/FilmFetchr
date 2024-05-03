import React, { useState } from 'react';
import styles from './AddMovieForm.module.css';

const AddMovieForm = (props) => {
  const [title, setTitle] = useState('');
  const [openingText, setOpeningText] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    if (title.trim() === '' || openingText.trim() === '' || releaseDate.trim() === '') {
      return;
    }
    const newMovie = {
      title: title.trim(),
      openingText: openingText.trim(),
      releaseDate: releaseDate.trim()
    };
    props.addMovieHandler(newMovie);
    setTitle('');
    setOpeningText('');
    setReleaseDate('');
  };

  const titleChangeHandler = event => {
    setTitle(event.target.value);
  };

  const openingTextChangeHandler = event => {
    setOpeningText(event.target.value);
  };

  const releaseDateChangeHandler = event => {
    setReleaseDate(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} className={styles.addMovieForm}>
      <div className={styles.formControl}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={titleChangeHandler}
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="openingText">Opening Text:</label>
        <textarea
          id="openingText"
          rows="3"
          value={openingText}
          onChange={openingTextChangeHandler}
        />
      </div>
      <div className={styles.formControl}>
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          type="date"
          id="releaseDate"
          value={releaseDate}
          onChange={releaseDateChangeHandler}
        />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
