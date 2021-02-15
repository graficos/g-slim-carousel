import styles from './PostHeader.module.css'

export default function PostHeader({ meta, isBlogPost }) {
  return (
    <div className="relative width-full">
      <h1
        className={`${isBlogPost ? styles.blogTitle : ''} ${
          styles.title
        } absolute pin`}
      >
        {meta.title}
      </h1>
      <div className={`${styles.details} absolute pin`}>
        {isBlogPost ? (
          <div
            style={{
              backgroundImage: `url(https://source.unsplash.com/1600x900/)`,
            }}
            className={styles.bgImage}
          ></div>
        ) : (
          <p>{meta.description}</p>
        )}
      </div>
    </div>
  )
}
