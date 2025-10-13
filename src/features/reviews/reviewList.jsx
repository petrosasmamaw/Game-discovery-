import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews, addReview ,deleteReview  } from "./reviewSlice";

const ReviewList = ({ gameId }) => {
  const dispatch = useDispatch();
  const { List = [], loading, error } = useSelector((state) => state.reviews || {});
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const titleRef = useRef();
  const contentRef = useRef();
  const authorRef = useRef();

  useEffect(() => {
    dispatch(fetchReviews(gameId));
  }, [dispatch, gameId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value.trim();
    const content = contentRef.current.value.trim();
    const author = authorRef.current.value.trim();


    if (!title || !content || !author) {
      setLocalError('Please fill all fields!');
      return;
    }
    setLocalError('');
    setSubmitting(true);
    await dispatch(addReview({ gameId, title, content, author }));
    // refresh reviews after posting
    await dispatch(fetchReviews(gameId));
    setSubmitting(false);
    titleRef.current.value = '';
    contentRef.current.value = '';
    authorRef.current.value = '';
  };
  const handleDelete = async (id) => {
  await dispatch(deleteReview(id));
};

  return (
    <div className="reviews-section">
      <h3 className="reviews-title">💬 Reviews</h3>

      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          ref={titleRef}
          placeholder="Title"
          className="review-input"
        />
        <textarea
          ref={contentRef}
          placeholder="Write your review..."
          className="review-textarea"
        ></textarea>
        <input
          type="text"
          ref={authorRef}
          placeholder="Your name"
          className="review-input"
        />
        
        <button
          type="submit"
          className="review-submit"
          disabled={submitting}
        >
          {submitting ? 'Posting...' : 'Post Review'}
        </button>
      </form>

      {loading && <p className="reviews-loading">Loading reviews...</p>}

      <div className="reviews-list">
        {List.filter((r) => String(r.gameId) === String(gameId)).map((r) => (
          <div key={r.id} className="review-card">
            <strong className="review-title">{r.title}</strong>
            <p className="review-content">{r.content}</p>
            <small className="review-author">— {r.author}</small>
            <button className="review-delete" onClick={() => handleDelete(r.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
