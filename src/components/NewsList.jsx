import React from "react";
import shortid from "shortid";

function getDateString(dateTimeStr) {
  return new Date(dateTimeStr).toDateString();
}

const NewsItem = ({ item }) => (
  <div className="card mb-4">
    {item.urlToImage && (
      <img src={item.urlToImage} alt={item.title} className="card-img-top" />
    )}
    <div className="card-body">
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#424242" }}
      >
        <h5 className="card-title">{item.title}</h5>
      </a>
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        style={{ color: "#424242" }}
      >
        {item.content}
      </a>
      <div className="mt-2 d-flex align-items-center">
        <small>
          <strong>Published at {getDateString(item.publishedAt)}</strong>
        </small>
        <div
          style={{
            padding: "0.25rem",
            background: "#ededed",
            color: "#424242",
            borderRadius: "0.25rem",
            display: "inline-block",
            marginLeft: 'auto'
          }}
        >
          <small>{item.source.name}</small>
        </div>
      </div>
    </div>
  </div>
);

function NewsList({ news }) {
  return (
    <div>
      {/* {news && news.length === 0 && <h4>There is No News</h4>} */}
      {news && news.map((item) => <NewsItem key={shortid.generate()} item={item} />)}
    </div>
  );
}

export default NewsList;
