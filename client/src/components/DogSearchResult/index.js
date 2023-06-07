import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import Auth from '../../utils/auth';

import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { ADD_DOG } from "../../utils/mutations";
import { QUERY_DOGS } from "../../utils/queries";

function DogSearchResult({ dog, userData, refetchUser }) {

  const [saveDog] = useMutation(ADD_DOG);

  // create function to handle saving a dog to the database
  const handleSaveDog = async (event) => {
    console.log(event.target);

    const name = event.target.getAttribute('data-name');
    const age = event.target.getAttribute('data-age');
    const gender = event.target.getAttribute('data-gender');
    const breed = event.target.getAttribute('data-breed');
    const profile_pic = event.target.getAttribute('data-profile_pic');
  
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveDog({
        variables: {
          name: name,
          age: age,
          gender: gender,
          breed: breed,
          profile_pic: profile_pic
        }
      })

      refetchUser();

    } catch (err) {
      console.log(err);
    }
  };

  //console.log("userData: ", userData);
  //console.log("dog._id: ", dog._id);
  return (
    <>
      <Container>
        <Col md="4">
          <Card className='h-100' key={dog?.id}>
            <Card.Img src={dog?.profile_pic}
              alt='doggy'
              variant='top'
            />
            <Card.Body>
              <Card.Title>{dog?.name}</Card.Title>
              <Card.Text>Breed: {dog?.breed}</Card.Text>
              <Card.Text>Age: {dog?.age}</Card.Text>
              <Card.Text>Gender: {dog?.gender}</Card.Text>
            </Card.Body>

            {Auth.loggedIn() && (
              <Button
                disabled={userData?.dogs?.some((savedDog) => savedDog._id === dog._id)}
                className='btn-info'
                data-name={dog?.name}
                data-breed={dog?.breed}
                data-gender={dog?.gender}
                data-age={dog?.age}
                data-id={dog?._id}
                data-profile_pic={dog?.profile_pic}
                onClick={(event) => handleSaveDog(event)}>
                {userData?.dogs.some((savedDog) => savedDog._id === dog._id)
                  ? 'Pooch saved to Favorites already'
                  : 'Save to Favorite Pooches'}
              </Button>
            )}
            {Auth.loggedIn() && (
              <Button className='btn-info'>Adopt</Button>
            )}

          </Card>
        </Col>
      </Container>
    </>
  );
}

export default DogSearchResult;