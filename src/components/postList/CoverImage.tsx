import styles from "./CoverImage.module.css"

export default function CoverImage(
  {coverSource, captionSource, captionText}: {coverSource: string, captionSource?: string, captionText?: string}) {

  return (
    <div className={styles.coverImage}>
      <img className={styles.cover} alt={"cover"} src={coverSource}/>
      {
        captionSource ? <img className={styles.caption} alt={"caption"} src={captionSource}/> :
          captionText ? <h1 className={styles.caption}>{captionText}</h1> : <></>
      }
    </div>
  )
}
