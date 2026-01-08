import styles from "./Footer.module.css";

export default function Footer({latestUpdateYear}: {latestUpdateYear: number | undefined}) {
  return (
    <div className={styles.footer}>
      <div className={styles.decorationOpen}>
          <span className={styles.left}>
            <img src="/images/footer/wing-left.png" alt="wing-left"/>
          </span>
        <span className={styles.center}>Copyright</span>
        <span className={styles.right}>
            <img src="/images/footer/wing-right.png" alt="wing-right"/>
          </span>
      </div>
      <ul>
        <li>(C) {latestUpdateYear ?? ""} yo1000 | YO!CHI KIKUCHI. Built with Next.js.</li>
        <li>© 1999, 2019 SQUARE ENIX CO., LTD. All Rights Reserved.</li>
        <li>CHARACTER DESIGN: TETSUYA NOMURA</li>
        <li>LOGO ILLUSTRATION:© 1999 YOSHITAKA AMANO</li>
      </ul>
      <div className={styles.decorationClose}>
          <span className={styles.center}>
            <img src="/images/footer/wing-bottom.png" alt="wing-bottom"/>
          </span>
      </div>
    </div>
  );
}
