const request = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw errorData;
      }
    } catch (e) {
      throw {
        message: e.message,
        status: e.status,
      };
    }
  };

const api = {
  getMovies: async (page) => {
    try {
      const movies = await request(
        `https://yts.mx/api/v2/list_movies.json?limit=10&page=${page}`
      );
      return {
        isError: false,
        data: movies?.data?.movies,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
  getMovieDetail: async () => {
    try {
        const movie = await request(
          "https://yts.mx/api/v2/movie_details.json?movie_id=10&with_images=true&with_cast=true"
        );
        return {
          isError: false,
          data: movie?.data?.movie,
        };
      } catch (e) {
        return {
          isError: true,
          data: e,
        };
      }
  },
};

export { api };