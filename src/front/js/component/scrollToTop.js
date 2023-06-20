import React from "react";
import PropTypes from "prop-types";

class ScrollToTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.toggleVisibility);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleVisibility);
  }

  toggleVisibility = () => {
    if (window.pageYOffset > 20) {
      this.setState({ isVisible: true });
    } else {
      this.setState({ isVisible: false });
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  render() {
    const { location, children } = this.props;
    const { isVisible } = this.state;

    return (
      <>
        {children}
        {isVisible && (
          <button
            type="button"
            className="fixed inline-block p-3 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out bottom-5 right-5"
            id="btn-back-to-top"
            onClick={this.scrollToTop}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              className="w-4 h-4"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
              ></path>
            </svg>
          </button>
        )}
      </>
    );
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.node
};

export default ScrollToTop;
