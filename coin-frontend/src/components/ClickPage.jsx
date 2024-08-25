import React, { useState, useEffect, useRef } from 'react';
import { request, gql } from 'graphql-request';
import CountUp from 'react-countup';

export default function ClickPage({ user }) {
    const [animate, setAnimate] = useState(false);
    const [totalClicks, setTotalClicks] = useState(0);
    const [currentClicks, setCurrentClicks] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);
    const [clickPerPoint, setClickPerPoint] = useState(1);
    const [animateCoins, setAnimateCoins] = useState(false);
    const [animateClicks, setAnimateClicks] = useState(false);
    const [userId, setUserId] = useState('');
    const imageRef = useRef(null);

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
        ) {
            updateUser(
                username: $username
                total_clicks: $total_clicks
                current_clicks: $current_clicks
                total_coins: $total_coins
                click_per_point: $click_per_point
            ) {
                id
                total_clicks
                current_clicks
                total_coins
                click_per_point
            }
        }
    `;

    // Function to fetch user data from GraphQL API
    const fetchUserData = async () => {
        try {
            const data = await request(endpoint, GET_USER_QUERY, { username: user });

            if (data && data.getUser) {
                setUserId(data.getUser.id);
                setTotalClicks(data.getUser.total_clicks || 1000);
                setCurrentClicks(data.getUser.current_clicks || 1000);
                setTotalCoins(data.getUser.total_coins || 0);
                setClickPerPoint(data.getUser.click_per_point || 1);
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    useEffect(() => {
        fetchUserData();

        const intervalId = setInterval(() => {
            setCurrentClicks((prevClicks) => {
                if (prevClicks + 2 <= totalClicks) {
                    return Math.max(prevClicks + 2, 0);
                }
                return prevClicks;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [totalClicks]);

    const handleImageClick = async (event) => {
        if (currentClicks > 0) {
            setAnimate(true);
            setAnimateCoins(true);
            setAnimateClicks(true);
            setCurrentClicks(currentClicks - clickPerPoint);
            setTotalCoins(totalCoins + clickPerPoint);

            // Create and animate the floating element
            const clickX = event.clientX;
            const clickY = event.clientY;

            const floatElement = document.createElement('div');
            floatElement.textContent = `+${clickPerPoint}`;
            floatElement.style.position = 'absolute';
            floatElement.style.left = `${clickX}px`;
            floatElement.style.top = `${clickY}px`;
            floatElement.style.fontSize = '28px';
            floatElement.style.color = 'white';
            floatElement.style.pointerEvents = 'none';
            floatElement.className = 'float-animation';
            document.body.appendChild(floatElement);

            setTimeout(() => {
                floatElement.remove();
            }, 1000);

            // Update the backend with new values using GraphQL
            await updateUserData(user, totalClicks, totalCoins + clickPerPoint, clickPerPoint);

            setTimeout(() => {
                setAnimate(false);
                setAnimateCoins(false);
                setAnimateClicks(false);
            }, 1000);
        }
    };

    // Function to update user data using GraphQL API
    const updateUserData = async (username, totalClicks, totalCoins, clickPerPoint) => {
        try {
            await request(endpoint, UPDATE_USER_MUTATION, {
                username,
                total_clicks: totalClicks,
                current_clicks: currentClicks,
                total_coins: totalCoins,
                click_per_point: clickPerPoint,
            });
        } catch (error) {
            console.error('Error updating user data:', error.message);
        }
    };

    return (
        <div
            className="container border-lg bg-dark rounded"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
        >
            <div className="row text-center pt-2">
                <div className="col-12 my-3">
                    <h3 className="text-warning">TapMe</h3>
                </div>

                <div className="col-12 my-2" style={{ cursor: 'pointer' }}>
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h5 className="card-title text-white">
                                <img src="assets/coin.png" style={{ width: '30px', height: '30px' }} alt="" /> &nbsp;
                                <CountUp
                                    start={totalCoins - clickPerPoint}
                                    end={totalCoins}
                                    duration={1}
                                    className={animateCoins ? 'animate-value' : ''}
                                />
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-3" style={{ position: 'relative', cursor: "pointer" }}>
                    <img
                        ref={imageRef}
                        src="assets/coin.png"
                        alt="Tap Coin"
                        className={`img-fluid ${animate ? 'animate-image' : ''}`}
                        style={{ maxWidth: '280px', width: '100%' }}
                        onClick={handleImageClick}
                    />
                </div>
                <div className="col-12 my-2" style={{ cursor: 'pointer' }}>
                    <div className="card bg-dark">
                        <div className="card-body">
                            <h5 className="card-title text-white">
                                <CountUp
                                    start={currentClicks}
                                    end={currentClicks}
                                    duration={1}
                                    className={animateClicks ? 'animate-value' : ''}
                                />
                                /{totalClicks}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
