import React from "react";

import Header from "../components/Header";
import Loading from "../components/Loading";
import NewsList from "../components/NewsList";
import Pagination from "../components/Pagination";
import { newsCategory } from "../news";
import axios from "../utils/axios";

const maxItemPerPage = 10;
let currPage = 1;
class App extends React.Component {
  state = {
    data: [],
    isLoading: true,
    category: newsCategory.technology,
    searchTerm: "",
    pageSize: maxItemPerPage,
    currentPage: currPage,
    totalPage: 1,
    totalResults: 1,
    error: false,
  };

  getURL = (pageNumber) => {
    let url = "/?";
    if (this.state.category) url += `category=${this.state.category}`;
    if (this.state.searchTerm) url += `&q=${this.state.searchTerm}`;
    if (this.state.pageSize) url += `&pageSize=${this.state.pageSize}`;
    if (pageNumber) url += `&page=${pageNumber}`;

    return url;
  };

  getNews = () => {
    const { data } = axios.get(this.getURL());
    return data;
  };

  getData = (pageNumber) => {
    axios
      .get(this.getURL(pageNumber))
      .then((res) => {
        const totalResult =
          res.data.totalResults > 100 ? 100 : res.data.totalResults;
        this.setState({
          data: res.data.articles,
          isLoading: false,
          totalResults: totalResult,
          totalPage:
            Math.ceil(totalResult / this.state.pageSize) > 10
              ? 10
              : Math.ceil(totalResult / this.state.pageSize),
          error: false,
        });
      })
      .catch((e) => {
        this.setState({ isLoading: false, error: true });
        console.log(e);
      });
  };

  componentDidMount = () => {
    this.getData(currPage);
  };

  componentDidUpdate = (_prevProps, prevState) => {
    if (
      this.state.category !== prevState.category ||
      this.state.currentPage !== prevState.currentPage ||
      this.state.searchTerm !== prevState.searchTerm
    ) {
      this.getData(currPage);
    }
  };

  changeCategory = (category) => {
    currPage = 1;
    this.setState(
      {
        searchTerm: "",
        data: [],
        isLoading: true,
        category: category,
        currentPage: currPage,
      },
      () => {
        this.getData(currPage);
      }
    );
  };

  next = () => {
    if (this.isNext()) {
      currPage++;
      this.setState({
        data: [],
        isLoading: true,
        currentPage: currPage,
      });
    }
  };

  prev = () => {
    if (this.isPrev()) {
      currPage--;
      this.setState({
        data: [],
        isLoading: true,
        currentPage: currPage,
      });
    }
  };

  isNext = () => {
    return this.state.totalPage > currPage;
  };

  isPrev = () => {
    return currPage > 1;
  };

  setCurentPage = (value) => {
    if (+value > 0 && +value <= this.state.totalPage) {
      currPage = parseInt(value);
      this.setState({
        data: [],
        isLoading: true,
        error: false,
        currentPage: currPage,
      });
    }
  };

  search = (term) => {
    this.setState({ searchTerm: term, data: [], isLoading: true });
  };

  render() {
    const { data, category, currentPage, totalPage } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-md-3">
            <Header
              category={category}
              changeCategory={this.changeCategory}
              search={this.search}
            />
            {!this.state.isLoading && !this.state.error && (
              <div className="d-flex">
                <p className="text-black-50">
                  About {this.state.totalResults} Results Found
                </p>
                <p className="text-black-50" style={{ marginLeft: "auto" }}>
                  {this.state.currentPage} Page of {this.state.totalPage}
                </p>
              </div>
            )}
            {this.state.error && <h4>Please Check Your Internet Connection</h4>}
            {this.state.isLoading ? (
              <Loading />
            ) : (
              <div>
                <NewsList news={data} />
                {!this.state.error && (
                  <Pagination
                    next={this.next}
                    prev={this.prev}
                    isPrev={this.isPrev()}
                    isNext={this.isNext()}
                    totalPage={totalPage}
                    currentPage={currentPage}
                    setCurentPage={this.setCurentPage}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
