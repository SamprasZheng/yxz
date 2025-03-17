import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { Col, Container, Row } from "react-bootstrap";
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  // return (
  //   <header className={clsx('hero hero--dark', styles.heroBanner)}>
  //     <div className="container">
  //       {/* <Heading as="h1" className="hero__title">
  //         {siteConfig.title}
  //       </Heading>
  //       <p className="hero__subtitle">
  //         Hardware Engineer | System Validation | Debug & Automation
  //       </p> */}
  //     </div>
  //   </header>
  // );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="A portfolio site showcasing experience in Hardware Validation, Debugging, and Automation."
    >
      <main className={styles.heroBanner}>
        <Container>
          <Row>
            <Col sm={12} lg={6} className="col col--6">
              <img 
                src="https://github.com/SamprasZheng.png" 
                alt="Profile Picture"
                className={styles.profileImage}
              />
              
            </Col>
            <Col sm={12} lg={6} className="col col--6">
                <Heading as="h1">Buidl Buidl Buidl</Heading>
                <p>
                  I was born in 1996 in Yilan, Taiwan, and from an early age, I developed a deep passion for a wide range of knowledge domains. My childhood and teenage years were surrounded by books covering diverse topics, from economic trends and history to music and coffee. 
                </p>

                <p>
                  I graduated from National Chiao Tung University studying Electronics Engineering
                </p>

                <p>
                  I joined {" "}<a href="https://www.tronfuture.com/">TronFutureTech </a>
                  System Development Department working on SATCOM phased array development
                </p>


                <p>
                  I then joined Qualcomm to work on RF calibration algorithm development,WiFi 7 presilicon emulation & post-silicon verification.
                </p>

                <p>
                  Currently, I also actively learn Blockchain-related development 
                  (Especially {" "}<a href="https://polkadot.network/">Polkadot</a>) 
                  and contribute to {" "}<a href="https://github.com/New-JAMneration">NewJamneration</a>
                </p>

            </Col>


          </Row>
        </Container>
      </main>
    </Layout>
  );
}
