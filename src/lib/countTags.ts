import {getPosts} from "@/lib/posts";
import {hiddenTags} from "@/lib/hiddenTags";

const tagMap: Map<string, number> = getPosts()
  .flatMap(post => post.meta.tags ?? [])
  .filter(tag => !hiddenTags.includes(tag))
  .reduce((acc, cur) => {
    acc.set(cur, (acc.get(cur) ?? 0) + 1);
    return acc;
  }, new Map<string, number>());

export const countTags: {tag: string, count: number}[] = [...tagMap.keys()]
  .map(key => ({
    tag: key,
    count: tagMap.get(key) ?? 0,
  }))
  .toSorted((a, b) => b.count - a.count);
