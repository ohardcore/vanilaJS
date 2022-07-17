const infinityScroll = (fetchData) => {
  return new IntersectionObserver((entires, observer) => {
    entires.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchData();
        observer.unobserve(entry.target);
      }
    });
  }, {});
};

export default infinityScroll;