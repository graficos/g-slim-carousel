import styles from './PostHeader.module.css'

export default function PostHeader({ meta, isBlogPost }) {
  return (
    <div className={`${styles.minHeightHeader} relative w-full`}>
      <div
        className={`${styles.details} absolute inset-0 mb-4 pb-4 w-full z-0`}
      >
        {isBlogPost ? (
          <div
            style={{
              backgroundImage: `url(https://source.unsplash.com/1600x900/)`,
            }}
            className={`${styles.bgImage} ${styles.minHeightHeader}`}
          ></div>
        ) : (
          <p>{meta.description}</p>
        )}
      </div>
      <h1
        className={`${isBlogPost ? styles.blogTitle : ''} ${styles.title} ${
          styles.minHeightHeader
        } absolute inset-0 w-full z-1 text-center grid place-items-center text-5xl leading-tight`}
      >
        <span className="line-clamp-4">{meta.title}</span>
      </h1>
    </div>
  )
}
