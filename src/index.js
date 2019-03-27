import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

class Twitter extends React.Component{
	constructor(props){
		super(props);
		this.myRef = React.createRef();
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			tweets: [],
			error: null,
			isLoaded: false
		}
	}

	componentDidMount(){
		fetch("https://still-garden-88285.herokuapp.com/draft_tweets")
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					tweets: result.draft_tweets
				})
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error: error
				})
			}
		)
	}

	handleClick(){
		/*this.setState({tweets: [...this.state.tweets, {user: '@cristiano', date: new Date().toString(), post: this.myRef.current.value}]});
		console.log(this.state.tweets);
		this.myRef.current.value = '';
        this.myRef.current.focus();
        */
        this.setState({
        	isLoaded: false
        });
        let newTweet = {
        	user_name: 'Carlos',
        	avatar: 'https://avatars0.githubusercontent.com/u/26472750?s=460&v=4',
        	description: this.myRef.current.value
        }

        let headers = {};
        headers['Content-Type'] = 'application/json';

        const options = {
        	headers: headers,
        	method: 'POST',
        	body: JSON.stringify(newTweet)
        }

        fetch("https://still-garden-88285.herokuapp.com/draft_tweets", options)
        .then(res => res.json())
        .then(
        	(result) =>{
        		let newTweet = result.draft_tweets;
        		let tweets = this.state.tweets.slice();
        		this.setState({
        			isLoaded: true,
        			tweets: tweets.concat(newTweet)
        		})
        	},
        	(error) => {
        		this.setState({
        			isLoaded: false,
        			error: error
        		})
        	}
        )

        this.myRef.current.value = '';
        this.myRef.current.focus();

	}


	render(){
		const {error, isLoaded, tweets} = this.state;
		let content;
		if(error){
			content = <div>No hay Tweets</div>;
		}
		else{
			content = tweets.map((tweet) => 
				<div className="the-tweet" key={tweet.id}>
					<div className="img-tweet">
						<img className="img-profile" src={tweet.avatar} />
					</div>
					<div className="body-tweet">
						<div className="header-tweet">
							<span className="username">{tweet.user_name}</span>
							<span className="date">{tweet.created_at}</span>
						</div>
						<div className="content-tweet">
							<span className="text-tweet">
								{tweet.description}
							</span>
						</div>
					</div>
				</div>
			);
		}
		return(
			<div id="main">
				<div className="profile">
					<img className="img-profile" src="https://avatars0.githubusercontent.com/u/26472750?s=460&v=4" />
					<div className="profile-info">
						<span className="username">@ctellezesp</span>
						<span className="name">Carlos</span>
					</div>
				</div>
				<div className="landing">
					<div className="bar">
						<div className="img-bar">
							<img className="img-profile" src="https://avatars0.githubusercontent.com/u/26472750?s=460&v=4" />
						</div>
						<div className="myTweet">
							<textarea className="post-tweet" type="text" placeholder="What's Happening?" ref={this.myRef}></textarea>
						</div>
						<div className="btn">
							<button className="btn-tweet" onClick={this.handleClick}>Tweet</button>
						</div>
					</div>
					<div className="tweets">
						{content}
						
					</div>
				</div>
			</div>
		);
	}
}



//============================

ReactDOM.render(
	<Twitter />, 
	document.getElementById('root')
);