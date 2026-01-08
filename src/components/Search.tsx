"use client";

import styles from "./Search.module.css";
import {useEffect, useState} from "react";
import MiniSearch from "minisearch";

type IndexPayload = {
  version: number;
  builtAt: string;
  index: string;
};

export default function Search({rev}: {rev: string;}) {
  const [q, setQ] = useState("");
  const [miniSearch, setMiniSearch] = useState<MiniSearch | undefined>(undefined);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/search/${rev}`, { cache: "force-cache" });
      const payload = (await resp.json()) as IndexPayload;

      const loaded = MiniSearch.loadJSON(payload.index, {
        fields: ["title", "tags", "plainText"],
        storeFields: ["title", "path"],
        searchOptions: {
          prefix: true,
          boost: {
            title: 3,
            tags: 2,
            plainText: 1,
          },
        },
      });

      setMiniSearch(loaded);
    })();
  }, []);

  useEffect(() => {
    if (!miniSearch) return;

    const query = q.replace(/[\s　]*/, "");
    if (!query) return setResults([]);

    setResults(miniSearch.search(query));
  }, [q, miniSearch]);

  return (
    <div className={styles.search}>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <input id="q" name="q" type="search" placeholder="Search..." value={q} onChange={event => setQ(event.target.value)}/>
      </form>
      {results && results.length ? (
        <div className={styles.results}>
          <ul>
            {results.map(value => (
              <li key={value.path}>
                <a href={`/posts/${value.path}`}>{value.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : <></>}
    </div>
  );
}
