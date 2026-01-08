import styles from "./page.module.css";
import CoverImage from "@/components/postList/CoverImage";
import PostContent from "@/components/post/PostContent";
import {countTags} from "@/lib/countTags";

export const dynamic = 'error';
export const revalidate = false;
export const dynamicParams = false;

export default async function () {
  const maxCount = countTags.at(0)?.count ?? 1;
    return (
      <div className={styles.tags}>
        <CoverImage coverSource={"/images/cover-tagtag.png"} captionSource={"/images/cover-tagtag-caption.png"}/>
        <PostContent title={"All tags"}>
          <ul>
            {countTags.map(tag => (
              <li key={`${tag.tag}`}>
                <a style={{
                  fontSize: `${12 + 20 * tag.count / maxCount}px`,
                  color: `rgb(${181 - 96 * -(tag.count / maxCount - 1)}, ${181 - 96 * -(tag.count / maxCount - 1)}, ${205 - 96 * -(tag.count / maxCount - 1)})`
                }} href={`/tags/${tag.tag}`}>{tag.tag}({tag.count})</a>
              </li>
            ))}
          </ul>
        </PostContent>
      </div>
    );
}
