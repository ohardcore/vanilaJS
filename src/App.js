import ScrollView from './components/ScrollView.js';
import { api } from "./api/movieApi.js";

export default class App {
  constructor($target) {
    const hello = new ScrollView({
      $target,
      fetchData: async () => {
        const response = await api.getMovies();
        const detailResponse = await api.getMovieDetail();
        if (!response.isError) {
          hello.setData([...hello.data, ...response.data]);
        }
        // else if (!detailResponse.isError) {
        //   hello.setData([...hello.data, ...detailResponse.data]);
        // }
        else {
          alert('No data')
        }
      },
    });
  }
  getFilter(){
    hello = hello.filter((data) => data.language.includes("en"));
  }
}