import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faStackExchange,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Socials = [
  {
    link: "https://github.com/shawntabrizi/",
    icon: faGithub,
  },
  {
    link: "https://www.linkedin.com/in/shawn-tabrizi/",
    icon: faLinkedin,
  },
  {
    link: "https://twitter.com/shawntabrizi",
    icon: faTwitter,
  },
  {
    link: "https://stackexchange.com/users/1489538",
    icon: faStackExchange,
  },
  {
    link: "https://www.instagram.com/shawntabrizi/",
    icon: faInstagram,
  },
  {
    link: "https://www.youtube.com/channel/UCl2YcZijUhWJweYeiOIYNdA",
    icon: faYoutube,
  },
  {
    link: "mailto:shawntabrizi@gmail.com",
    icon: faEnvelope,
  },
];

export default function FooterLinks() {
  return (
    <div className="text--center">
      {Socials.map((social, index) => (
        <a key={index} href={social.link} target="_blank">
          <FontAwesomeIcon
            icon={social.icon}
            inverse
            size="3x"
            transform="shrink-6"
          />
        </a>
      ))}
    </div>
  );
}
