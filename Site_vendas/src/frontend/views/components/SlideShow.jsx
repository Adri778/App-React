import { useState, useEffect } from 'react';

const SlideShow = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="slideshow">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(rgba(192, 183, 183, 0), rgba(112, 112, 112, 0)), url(${slide.image})` }}
        >
          <div className="slide-content">
            <h2 className="slide-title">{slide.title}</h2>
            <p className="slide-subtitle">{slide.subtitle}</p>
          </div>
        </div>
      ))}
      <div className="slide-indicators">
        {slides.map((_, idx) => (
          <div key={idx} className={`indicator ${idx === currentSlide ? 'active' : 'inactive'}`} />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;