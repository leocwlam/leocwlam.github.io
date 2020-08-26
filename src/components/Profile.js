import React from 'react';
import styled from 'styled-components';
import { Carousel, Card, Image /*, Badge, Button */ } from 'react-bootstrap';

import Company from './Company';

import coffeeTimeMoive from '../assets/moives/coffeeTime.mp4';
import contactImage from '../assets/pictures/contact-image.jpg';

import emailIcon from '../assets/icons/email.png';
import linkedInIcon from '../assets/icons/linkedIn.png';
import githubIcon from '../assets/icons/github.png';

const EMAILADDRESS = 'leocwlam@gmail.com';
const LINKEDINURL = 'https://www.linkedin.com/in/leocwlam/';
const GITHUBURL = 'https://github.com/leocwlam/';

const Styles = styled.div`
  .carousel {
    opacity: 0.95;
  }
  .carouselItem {
    left: 8rem;
  }
  .carouselCard {
    width: 53rem;
  }
  .cardImage {
    width: 20rem;
  }
  .cardImageIcon {
    width: 2rem;
  }
`;

function Profile(props) {

  const renderProfilePresent = () => {
    if (props.isContact) {
      return (
        <Image src={contactImage} className="cardImage" />
      );
    } else {
      return (
        <video width="320" height="240" autoPlay loop>
          <source src={coffeeTimeMoive} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      );
    } 
  };

  const homePageContent= () => {
    return (
      <Card.Text>
        <li>Having fun</li>
        <li>Keep your mind open</li>
        <li>Get out of your comfort zone</li>
        <li>See for yourself</li>
        <li>If you know you can do better.. then do better</li>
        <li>Your best teacher is your last mistake</li>
        <li>Dream on Deamer</li>
        <li>Trust your intuition.  You don't need to explain or justify your feeling to anyone, 
          just trust your own inner guidance, it knows best.</li>
      </Card.Text>
    );
  }

  const renderContent = () => {
    if (props.isContact) {
      return (
        <Card.Text>
          <br />
          <Image src={emailIcon} thumbnail className="cardImageIcon" />
          {' '}<a href={`mailto:{EMAILADDRESS}`} target="_blank">{' '}{EMAILADDRESS}</a>
          <br />
          <Image src={linkedInIcon} thumbnail className="cardImageIcon" />
          <a href={LINKEDINURL} target="_blank">{' '}LinkedIn</a>
          <br />
          <Image src={githubIcon} thumbnail className="cardImageIcon" />
          <a href={GITHUBURL} target="_blank">{' '}GitHub</a>
          <br />
        </Card.Text>
      );
    } else {
      return homePageContent();
    }
  };

  return (
    <Styles>
      <Carousel className="carousel">
        <Carousel.Item className="carouselItem">
          <Card border="light" className="carouselCard">
            <Card.Header>Leo Lam</Card.Header>
            <Card.Body>
              {renderProfilePresent()}
              {renderContent()}
            </Card.Body>
          </Card>
        </Carousel.Item>
        {(() => {
          if (!props.isContact) {
            return (
              <Carousel.Item className="carouselItem">
                <Company />
              </Carousel.Item>
            );
          }
        })()}
      </Carousel>
    </Styles>
  );
}

Profile.defaultProps = {
  isContact: false
}

export default Profile;