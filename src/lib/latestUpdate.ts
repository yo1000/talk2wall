import "server-only";

import {getPosts} from "@/lib/posts";

export function latestUpdate() {
  return getPosts()
    .map(post => post.meta.created)
    .filter(date => date instanceof Date)
    .toSorted((a, b) => b?.getTime() - a?.getTime())
    .at(0);
}

export function latestUpdateYear() {
  return latestUpdate()?.getFullYear();
}
