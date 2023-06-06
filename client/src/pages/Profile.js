import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import PaymentComponent from '../components/Payments/Stripe'; // Willis
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log("user: ", user)

  const [newUsername, setNewUsername] = useState('');  // Willis
  const [newPassword, setNewPassword] = useState('');  // Willis
  const [newEmail, setNewEmail] = useState(''); // Willis
  const [paymentMethod, setPaymentMethod] = useState(''); // Willis

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

// Call a function or make an API request to update each parameter
 if (newUsername) {
  try {
    const response = await fetch('/api/update-username', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newUsername }),
    });

    if (response.ok) {
      console.log('Username updated successfully!');
    } else {
      console.log('Failed to update username.');
    }
  } catch (error) {
    console.error('An error occurred while updating the username:', error);
  }
    }

    if (newPassword) {
      console.log('Updating password:', newPassword);
    }

    if (newEmail) {
      console.log('Updating email address:', newEmail);
    }

    if (paymentMethod) {
      console.log('Saving payment method:', paymentMethod);
    }

    setNewUsername('');
    setNewPassword('');
    setNewEmail('');
    setPaymentMethod('');
  };


  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to create and view your favorites.
        Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <div className="col-12 col-md-10 mb-5">
            <form onSubmit={handleSubmit}>
              <label>
                New Username:
                <input type="text" value={newUsername} onChange={handleUsernameChange} />
              </label>
              <br />
              <label>
                New Password:
                <input type="password" value={newPassword} onChange={handlePasswordChange} />
              </label>
              <br />
              <label>
                New Email Address:
                <input type="email" value={newEmail} onChange={handleEmailChange} />
              </label>
              <br />
              <label>
                Payment Method:
                <input type="text" value={paymentMethod} onChange={handlePaymentMethodChange} />
              </label>
              <br />
              <button type="submit">Save Changes</button>
            </form>
          </div>

        </div>
        {!userParam && (
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >

          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
