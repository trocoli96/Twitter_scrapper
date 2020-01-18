import React, {useEffect, useState} from 'react';


function Tweets(){

    const [tweetsData, setTweetsData] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const url = 'http://localhost:8080/api/tweets';
            const options = {
                method: 'GET',
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
    <div>
    {tweetsData.data && tweetsData.data.map((data) => (
        <h3>{data.username}</h3>

    ))}

    </div>
    );

}

export default Tweets;