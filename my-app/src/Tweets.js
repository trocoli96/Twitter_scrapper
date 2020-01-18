import React, {useEffect, useState} from 'react';
import './App.css';


function Tweets(){



    const [tweetsData, setTweetsData] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const url = 'http://localhost:8080/api/tweets';
            const options = {
                method: 'GET',
                header: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
                mode: 'cors',
            };

            return fetch(url, options)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    return Promise.reject(response.status);

                })
                .then(data => {
                    return setTweetsData(data);
                })
                .catch(error => {
                    if (error === 401) {
                        setError(true);
                    }
                });
        };
        fetchdata();
    },[]);

    return (
    <div className="page">
        {tweetsData.data && tweetsData.data.map((data) => (
                    <div className="box">
                        <div className="userinfo">
                            <div>
                                {data.emoji}
                            </div>
                            <span>
                                        <h3>{data._doc.username}</h3>
                                        <p>Sentiment: {data.sentiment}</p>
                                    </span>
                        </div>
                        <div className="text">
                        <p>{data._doc.body}</p>
                        </div>
                    </div>
                ))}
            </div>
    );

}

export default Tweets;