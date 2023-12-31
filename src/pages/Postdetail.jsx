import React, { useState, useEffect } from 'react';
import Header1 from '../components/Header1';
import Footer1 from '../components/Footer1';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Postdetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!userToken);

    fetchPostDetails();
  }, [postId]);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/posts/${postId}`);
      setPost(response.data);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    const userToken = localStorage.getItem('jwtToken');
    console.log('User Token:', userToken);

    if (!isLoggedIn) {
      console.log('User is not logged in. Please log in to comment.');
      return;
    }

    const decodedToken = jwtDecode(userToken);
    console.log('Decoded Token:', decodedToken);

    const userRoles = decodedToken?.roles || [];
    console.log('User Roles:', userRoles);

    console.log('Form Data:', { body: newComment, ...decodedToken });

    if (userRoles.some((role) => role.authority === 'ROLE_ADMIN' || role.authority === 'ROLE_AUTHOR')) {
      const postIdNumber = parseInt(postId, 10);

      const updatedFormData = {
        body: newComment,
        create_date: new Date().toISOString(),
        post: {
          id: postIdNumber,
        },
        utilisateur: {
          id: decodedToken.id,
        },
      };

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      console.log('Sending comment request...', updatedFormData);

      axios.post(`http://localhost:8080/comments`, updatedFormData, config)
        .then((response) => {
          console.log('Comment created:', response.data);
          setNewComment('');
          // Fetch updated comments after submission
          fetchPostDetails();
        })
        .catch((error) => {
          console.error('Error creating comment:', error);
        });
    } else {
      console.log('User does not have the required role to add a comment.');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header1 />
      <section className="section">
        <div className="container">
          <article className="row mb-4">
              <div className="col-lg-10 mx-auto mb-4">
                <h1 className="h2 mb-3">{post.title}</h1>

                <ul className="list-inline post-meta mb-3">
                  <li className="list-inline-item">
                    <i className="ti-user mr-2" />
                    {post.utilisateur && <a href="author.html">{post.utilisateur.username}</a>}
                  </li>
                  <li className="list-inline-item">Date : {post.createDate}</li>
                  <li className="list-inline-item">
                    Categories : {post.categorie && <a href="#!" className="ml-1">{post.categorie.title}</a>}
                  </li>
                </ul>
              </div>

              <div className="col-12 mb-3">
                <div className="post-slider">
                  <img src={post.imageUrl} className="img-fluid" alt="post-thumb" />
                </div>
              </div>
              <div className="col-lg-10 mx-auto">
                <div className="content">
                  <p>{post.body}</p>
                </div>
              </div>
          </article>

          {/* Comments section */}
          <div className="col-lg-9 col-md-12">
            <div className="mb-5 border-top mt-4 pt-5">
              <h3 className="mb-4">Comments</h3>
              {comments.length === 0 && <p>No comments available.</p>}
              {comments.map((comment) => (
                <div key={comment.id} className="media d-block d-sm-flex mb-4 pb-4">
                  <div className="media-body">
                    <a href="#!" className="h4 d-inline-block mb-3">{comment.utilisateur.username}</a>
                    <p>{comment.body}</p>
                    <span className="text-black-800 mr-3 font-weight-600">{comment.createDate}</span>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="mb-4">Leave a Reply</h3>
              <form onSubmit={handleCommentSubmit}>
                <div className="row">
                  <div className="form-group col-md-12">
                    <textarea
                      className="form-control shadow-none"
                      name="comment"
                      rows={7}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">Comment Now</button>
              </form>
              {!isLoggedIn && (
    <div style={{ color: 'red', marginBottom: '10px' }}>
      You need to log in to leave a comment.
    </div>
  )}
            </div>
          </div>
        </div>
      </section>
      <Footer1 />
    </div>
  );
};

export default Postdetail;
