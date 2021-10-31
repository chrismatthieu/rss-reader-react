import React, { useState } from "react";
export default function App() {
  const [rssUrl, setRssUrl] = useState("");
  const [items, setItems] = useState([{ title: "", link: "", author: "" }]);
  const getRss = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlRegex =
      /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    if (!urlRegex.test(rssUrl)) {
      return;
    }
    const res = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el: any) => ({
      link: el.querySelector("link").innerHTML,
      title: el.querySelector("title").innerHTML,
      author: el.querySelector("author").innerHTML,
    }));
    setItems(feedItems);
  };
  return (
    <div className="App">
      <form onSubmit={getRss}>
        <div>
          <label> rss url</label>
          <br />
          <input onChange={(e) => setRssUrl(e.target.value)} value={rssUrl} />
        </div>
        <input type="submit" />
      </form>
      {items.map((item: any) => {
        return (
          <div>
            <h1>{item.title}</h1>
            <p>{item.author}</p>
            <a href={item.link}>{item.link}</a>
          </div>
        );
      })}
    </div>
  );
}
