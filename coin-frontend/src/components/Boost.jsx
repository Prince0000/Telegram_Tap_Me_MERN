import React, { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';

export default function Boost({ user }) {
  const [userData, setUserData] = useState(null);
  const endpoint = 'http://localhost:4000/';

  // GraphQL query to fetch user data
  const GET_USER_QUERY = gql`
    query getUser($username: String!) {
      getUser(username: $username) {
        id
        username
        total_clicks
        current_clicks
        total_coins
        click_per_point
        per_click_lavel
        coin_lavel
      }
    }
  `;

  // GraphQL mutation to update user data
  const UPDATE_USER_MUTATION = gql`
    mutation updateUser(
      $username: String!
      $total_clicks: Int
      $current_clicks: Int
      $total_coins: Int
      $click_per_point: Int
      $per_click_lavel: Int
      $coin_lavel: Int
    ) {
      updateUser(
        username: $username
        total_clicks: $total_clicks
        current_clicks: $current_clicks
        total_coins: $total_coins
        click_per_point: $click_per_point
        per_click_lavel: $per_click_lavel
        coin_lavel: $coin_lavel
      ) {
        id
        total_clicks
        current_clicks
        total_coins
        click_per_point
        per_click_lavel
        coin_lavel
      }
    }
  `;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await request(endpoint, GET_USER_QUERY, { username: user });
        setUserData(data.getUser);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [user]);

  const handleMultitapUpgrade = async () => {
    if (!userData) return;

    const currentLevel = userData.per_click_lavel || 1;
    const cost = currentLevel * 500;

    if (userData.total_coins < cost) {
      alert("Insufficient coins for Multitap upgrade!");
      return;
    }

    const newClickPerPoint = userData.click_per_point + 1;
    const newClickPerLavel = currentLevel + 1;
    const newTotalCoins = userData.total_coins - cost;

    try {
      const data = await request(endpoint, UPDATE_USER_MUTATION, {
        username: user,
        click_per_point: newClickPerPoint,
        per_click_lavel: newClickPerLavel,
        total_coins: newTotalCoins,
      });
      setUserData(data.updateUser);
    } catch (error) {
      console.error('Error upgrading multitap:', error.message);
    }
  };

  const handleEnergyUpgrade = async () => {
    if (!userData) return;

    const currentLevel = userData.coin_lavel || 1;
    const cost = currentLevel * 5 * 500;

    if (userData.total_coins < cost) {
      alert("Insufficient coins for Energy upgrade!");
      return;
    }

    const newCoinLavel = currentLevel + 1;
    const newTotalClicks = userData.total_clicks + 2000;
    const newCurrentClicks = userData.current_clicks + 2000;
    const newTotalCoins = userData.total_coins - cost;

    try {
      const data = await request(endpoint, UPDATE_USER_MUTATION, {
        username: user,
        coin_lavel: newCoinLavel,
        total_clicks: newTotalClicks,
        current_clicks: newCurrentClicks,
        total_coins: newTotalCoins,
      });
      setUserData(data.updateUser);
    } catch (error) {
      console.error('Error upgrading energy:', error.message);
    }
  };

  return (
    <div className='container text-white'>
      <div className="row text-center pt-2">
        <div className="col-12 my-3">
          <h3 className="text-warning">TapMe</h3>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12 my-3">
          <div className="card bg-dark text-light border border-light">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title">Multitap</h5>
                <p className="card-text">Level: {userData?.per_click_lavel || 1}</p>
              </div>
              <div>
                <button
                  className='btn btn-outline-warning'
                  onClick={handleMultitapUpgrade}
                >
                  {userData?.per_click_lavel ? `${userData.per_click_lavel * 500}` : "-500"} Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card bg-dark text-light border border-light">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5 className="card-title">Energy Limit X2</h5>
                <p className="card-text">Level: {userData?.coin_lavel || 1}</p>
              </div>
              <div>
                <button
                  className='btn btn-outline-warning'
                  onClick={handleEnergyUpgrade}
                >
                  {userData?.coin_lavel ? `${userData.coin_lavel * 5 * 500}` : "-2500"} Upgrade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
