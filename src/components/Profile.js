import React from 'react'
import styled from 'styled-components'
import { Carousel, Card, Image /*, Badge, Button */ } from 'react-bootstrap'

import Company from './Company'

import coffeeTimeMoive from '../assets/moives/coffeeTime.mp4'
import contactImage from '../assets/pictures/contact-image.jpg'
import contactImage2 from '../assets/pictures/contact-image2.jpg'
import contactImage3 from '../assets/pictures/contact-image3.png'
import contactImage4 from '../assets/pictures/contact-image4.jpg'

import emailIcon from '../assets/icons/email.png'
import linkedInIcon from '../assets/icons/linkedIn.png'
import githubIcon from '../assets/icons/github.png'

const EMAILADDRESS = 'leocwlam@gmail.com'
const LINKEDINURL = 'https://www.linkedin.com/in/leocwlam/'
const GITHUBURL = 'https://github.com/leocwlam/'

const CONTACTIMAGES = [
  contactImage,
  contactImage2,
  contactImage3,
  contactImage4
]

const SHARINGTHOUGHTS = [
  'Having fun',
  'Keep your mind open',
  'Get out of your comfort zone',
  'See for yourself',
  'If you know you can do better.. then do better',
  'Your best teacher is your last mistake',
  'Dream on Deamer',
  'Trust your intuition. You don\'t need to explain or justify your feeling to anyone, just trust your own inner guidance, it knows best.'
  ]

const Styles = styled.div`
  .carousel {
    opacity: 0.9;
  }
  .carouselProfileItem {
    left: 2rem;
  }
  .carouselContactItem {
    left: 0rem;
  }
  .carouselCard {
    width: 47rem;
    margin: auto;
  }
  .cardImage {
    width: 20rem;
  }
  .cardImageIcon {
    width: 2rem;
  }
`

function Profile(props) {
  const renderProfilePresent = () => {
    if (props.isContact) {
      const contactImageId = Math.floor(Math.random() * CONTACTIMAGES.length)
      return (
        <Image src={CONTACTIMAGES[contactImageId]} className="cardImage" />
      );
    } else {
      return (
        <video width="320" autoPlay loop>
          <source src={coffeeTimeMoive} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      )
    } 
  }

  const homePageContent = () => {
    return (
      <Card.Text>
        {
          SHARINGTHOUGHTS.map((value, index) => {
            return <li key={index}>{value}</li>
          })
        }
      </Card.Text>
    )
  }

  const renderContent = () => {
    if (props.isContact) {
      return (
        <Card.Text>
          <br />
          <Image src={emailIcon} thumbnail className="cardImageIcon" />
          {' '}<a href={`mailto:{EMAILADDRESS}`} target="_blank" rel="noopener noreferrer">{' '}{EMAILADDRESS}</a>
          <br />
          <Image src={linkedInIcon} thumbnail className="cardImageIcon" />
          <a href={LINKEDINURL} target="_blank" rel="noopener noreferrer">{' '}LinkedIn</a>
          <br />
          <Image src={githubIcon} thumbnail className="cardImageIcon" />
          <a href={GITHUBURL} target="_blank" rel="noopener noreferrer">{' '}GitHub</a>
          <br />
        </Card.Text>
      )
    } else {
      return homePageContent()
    }
  }

  return (
    <Styles>
      <Carousel className="carousel">
        <Carousel.Item className={(props.isContact) ? "carouselContactItem" : "carouselProfileItem"}>
          <Card border="light" className="carouselCard">
            <Card.Header>Leo Lam</Card.Header>
            <Card.Body style={{ width: '45rem' }}>
              {renderProfilePresent()}
              {renderContent()}
            </Card.Body>
          </Card>
        </Carousel.Item>
        {(!props.isContact) ? 
          <Carousel.Item className="carouselProfileItem">
            <Company />
          </Carousel.Item>
          : ""}
      </Carousel>
    </Styles>
  )
}

Profile.defaultProps = {
  isContact: false
}

export default Profile