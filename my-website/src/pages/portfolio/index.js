import React from "react";
import RawData from "./github-repo-info.json";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import PortfolioCard from "../../components/PortfolioCard";
import { Col, Row, Container } from "react-bootstrap";

function sort_by_stars(a, b) {
  return b.stars - a.stars;
}
let sorted_data = RawData.sort(sort_by_stars);

function Repository(props) {
  return (
    <Col xs={12} md={6} lg={4} className="col col--4">
      <PortfolioCard {...props} />
    </Col>
  );
}

function Repositories() {
  return (
    <section className={styles.repositories}>
      <Container>
        <Row>
          {sorted_data
            .filter((a) => a.fork == false)
            .map((props, idx) => (
              <Repository key={idx} {...props} />
            ))}
        </Row>
        <Heading as="h1">Contributing To:</Heading>
        <Row>
          {sorted_data
            .filter((a) => a.fork == true)
            .map((props, idx) => (
              <Repository key={idx} {...props} />
            ))}
        </Row>
      </Container>
    </section>
  );
}

export default function Portfolio() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Portfolio`}
      description={`Portfolio of ${siteConfig.title}.`}
    >
      <main>
        <Repositories />
      </main>
    </Layout>
  );
}
