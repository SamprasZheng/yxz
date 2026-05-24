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
                // src={"assets/images/DSC013041.jpg"}
                // src="https://github.com/SamprasZheng.png" 
                src= "assets/images/sampras.jpeg"
                // className={styles.roundedCircle}
                // src={"my-website/static/img/sampras.jpeg"}
                // alt="Profile Picture"  
                className={styles.profileImage}
              />
              
            </Col>
            <Col sm={12} lg={6} className="col col--6">
                <Heading as="h1">Buidl Buidl Buidl</Heading>
                <p>
                  I was born in 1996 in Yilan, Taiwan, and from an early age, I developed a deep passion for a wide range of knowledge domains. My childhood and teenage years were surrounded by books covering diverse topics, from economic trends and history to music and coffee. 
                </p>

                <p>
                  I earned my B.S. and M.S. in Electronics Engineering from National Chiao Tung University, where my graduate research focused on phased-array design, PLL modeling, and satellite systems design.
                </p>

                <p>
                  During and after grad school I joined {" "}<a href="https://www.tronfuture.com/">TronFutureTech</a>,
                  starting as a research engineer on S-Band anti-drone and X-Band communication payload development, then advancing to senior engineer on Ka/Ku-Band SATCOM user terminals and phased-array frontend design — with hands-on space-grade reliability verification including radiation testing, thermal cycling, vibration, and EMC compliance.
                </p>

                <p>
                  I then joined Qualcomm to work on RF calibration algorithm development (DPD, TPC, CPR), Wi-Fi 6/7 pre-silicon emulation, and post-silicon verification.
                </p>

                <p>
                  Currently I am a Senior System-Level Product Engineer at NVIDIA in the Silicon Co-Design Group, leading engineering studies and chip characterization reviews for N1X-class CPU and GB20X-class GPU programs.
                </p>

                <p>
                  Over the past year, I returned to deep hands-on engineering and expanded my AI stack, including Model Context Protocol (MCP) workflows for automation and agent-driven productivity.
                </p>

                <p>
                  I continue to build in blockchain (especially {" "}<a href="https://polkadot.network/">Polkadot</a>), space infrastructure, and RF phased-array SATCOM. My current cross-domain thesis is: AI deployment from Earth to orbit, crypto-native infrastructure in space, and radiation-validated hardware paths for commercial compute in space environments.
                </p>

            </Col>


          </Row>
        </Container>
      </main>
    </Layout>
  );
}
