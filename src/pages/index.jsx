import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header1 from "../components/Header1";
import Footer1 from "../components/Footer1";
import { Link } from 'react-router-dom'; // Import Link from React Router

const Index = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/posts'); // Replace with your actual API endpoint
      console.log("Posts data:", response.data);
      setPosts(response.data);


    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const truncateBody = (body, maxLength) => {
    if (body.length <= maxLength) {
      return body;
    }
    // If the body is longer than maxLength, truncate and append "..."
    return body.substring(0, maxLength) + '...';
  };

  return (
    <div>
      <Header1 />
      <br/><br/>
      <section>
        <div className="container">
          <div className="col-12">
            <div className="post-slider">
              <img loading="lazy" src="assets/images/post/post-1.png" className="img-fluid" alt="post-thumb" />
            </div>
          </div>
        </div>
      </section>
      <section className="section-sm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 mb-5 mb-lg-0">
              <h2 className="h5 section-title">Recent Posts</h2>
              <div className="row">
                {posts.map((post) => (
                  <div className="col-lg-4 col-sm-6" key={post.id}>
                    <article className="card mb-4">
                      <div className="post-slider slider-sm slick-initialized slick-slider">
                        <div className="slick-list draggable">
                          <div className="slick-track" style={{ opacity: 1, width: '346px', transform: 'translate3d(0px, 0px, 0px)' }}>
                            <img src={post.imageUrl} className="card-img-top slick-slide slick-current slick-active" alt="post-thumb" data-slick-index={0} aria-hidden="false" tabIndex={0} style={{ width: '346px' }} />
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <h3 className="h4 mb-3">
                          <a className="post-title" href={`post-details-${post.id}.html`}>
                            {post.title}
                          </a>
                        </h3>
                        <ul className="card-meta list-inline">
                          <li className="list-inline-item">
                            <span>Categorie: {post.categorie.title}</span>  <br />  
                            <span>{post.utilisateur.username}</span>

                          </li>
                          <li className="list-inline-item">
                            <i className="ti-calendar" /> {post.createDate}
                          </li>
                        </ul>
                        <p>{truncateBody(post.body, 150)}</p> {/* Adjust the maxLength as needed */}
                        <Link to={`/Postdetail/${post.id}`} className="btn btn-outline-primary">
                        Read More
                      </Link>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer1 />
    </div>
  );
};

export default Index;
