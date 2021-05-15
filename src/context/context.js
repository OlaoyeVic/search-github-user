import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext()

const GithubProvider = ({children}) =>{
    const [githubUser, setGithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFollowers] = useState(mockFollowers)
    const [request, setRequest] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({show: false,msg:''})
    
    const checkRequest = () =>{
        axios(`${rootUrl}/rate_limit`)
        .then(({data}) =>{
            //console.log(data)
            let {rate: {remaining}} = data
            //remaining = 0
            setRequest(remaining)
            if(remaining === 0){
                toggleError(true, 'Sorry you have exceeded your hourly rate limit')
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }
    useEffect(checkRequest, [])

    function toggleError(show, msg){
        setError({show,msg})
    }

    const searchGithubUser = async(user) =>{
        toggleError()
        const response = await axios(`${rootUrl}/users/${user}`)
        .catch(err => console.log(err))
        if(response){
            setGithubUser(response.data)
            const {login, followers_url} = response.data
            await axios(`${rootUrl}/users/${login}/repos?per_page=100`)
            .then(response =>{setRepos(response.data)})
            await axios(`${followers_url}?per_page=100`)
            .then(response =>{setFollowers(response.data)})
            .catch(err =>{console.log(err)})
        } else{
            toggleError(true, "There's no user with that username")
        }
    }

    return <GithubContext.Provider value = {{githubUser, followers, repos, request, error, isLoading, searchGithubUser}}>{children}</GithubContext.Provider>
}
export {GithubProvider, GithubContext}