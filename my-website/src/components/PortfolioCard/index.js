import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";

const defaultImage = "static/assets/images/default-project-image.png";
// /assets/images/sampras.jpeg
// const defaultImage = "/assets/images/sampras.jpeg";

const Card = ({
  name,
  stars,
  fork,
  forksCount,
  homepage,
  html_url,
  language,
  description,
  screenshot
}) => {
  return (
    <div className={styles.card}>
      <img
        // src= "assets/images/sampras.jpeg"
        // src={ screenshot ? screenshot : defaultImage}
        // className={styles.cardImgTop}
        // alt={name}
      />
      <div className={styles.cardBody}>
        {!fork && (
          <Row className="text--center">
            <Col xs={4} className="col col--4">{language}</Col>
            <Col xs={4} className="col col--4">
              <FontAwesomeIcon icon={faStar} />
              {stars}
            </Col>
            <Col xs={4} className="col col--4">
              <FontAwesomeIcon icon={faCodeFork} />
              {forksCount}
            </Col>
          </Row>
        )}
        <h5 className={styles.cardTitle}>{name}</h5>
        <p className={styles.cardText}>{description}</p>
      </div>
      <div className={styles.cardFooter}>
        {homepage && !fork && (
          <a href={homepage} className={clsx(styles.btn, styles.btnPrimary)}>
            Try it out!
          </a>
        )}
        {html_url && (
          <a href={html_url} className={clsx(styles.btn, styles.btnSecondary)}>
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
