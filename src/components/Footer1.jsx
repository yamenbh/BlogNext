
const Footer1 = () => {
    return (

    <footer className="section-sm pb-0 border-top border-default">
        <div className="container">
        <div className="row justify-content-between">
            <div className="col-md-3 mb-4">
            <a className="mb-4 d-block" href="index.html">
                <h6>NextBlog</h6>
            </a>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
            </div>
            <div className="col-lg-2 col-md-3 col-6 mb-4">
            <h6 className="mb-4">Quick Links</h6>
            <ul className="list-unstyled footer-list">
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="terms-conditions.html">Terms Conditions</a></li>
            </ul>
            </div>
            <div className="col-lg-2 col-md-3 col-6 mb-4">
            <h6 className="mb-4">Social Links</h6>
            <ul className="list-unstyled footer-list">
                <li><a href="?">facebook</a></li>
                <li><a href="?">twitter</a></li>
                <li><a href="?">linkedin</a></li>
                <li><a href="?">github</a></li>
            </ul>
            </div>
            <div className="col-md-3 mb-4">
            <h6 className="mb-4">Subscribe Newsletter</h6>
            <form className="subscription" action="" method="post">
                <div className="position-relative">
                <i className="ti-email email-icon" />
                <input type="email" className="form-control" placeholder="Your Email Address" />
                </div>
                <button className="btn btn-primary btn-block rounded" type="submit">Subscribe now</button>
            </form>
            </div>
        </div>
        <div className="scroll-top">
            <a href="?" id="scrollTop"><i className="ti-angle-up" /></a>
        </div>
        <div className="text-center">
            <p className="content">© 2023 - Design &amp; Develop By <a href="?" target="_blank">wearenextdigital</a></p>
        </div>
        </div>
    </footer>
    );
};

export default Footer1;
