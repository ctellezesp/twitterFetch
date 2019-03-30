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

class Feed extends React.Component{
	render(){
		
		if(this.props.error)
		{
			return <div>No hay Tweets</div>;
		}
		else{
			return this.props.tweets.map((tweet) => 
				<Tweet tweet={tweet}/>
			);
		}
	}
}

class Profile extends React.Component{
	render(){
		return(
			<div className="profile">
				<img className="img-profile" src="https://avatars0.githubusercontent.com/u/26472750?s=460&v=4" />
				<div className="profile-info">
					<span className="username">@ctellezesp</span>
					<span className="name">Carlos</span>
				</div>
			</div>
		);
	}
}

class Postbar extends React.Component{
	constructor(props){
		super(props);
		this.myRef = React.createRef();
		this.myClick = this.myClick.bind(this);
	}

	myClick(){
		this.props.click(null, this.myRef);
	}

	render(){
		return(
			<div className="bar">
				<div className="img-bar">
					<img className="img-profile" src="https://scontent.fntr4-1.fna.fbcdn.net/v/t31.0-1/c362.106.1324.1324a/s320x320/133460_150577164994084_5857203_o.jpg?_nc_cat=111&_nc_ht=scontent.fntr4-1.fna&oh=934b9abef83d1ec86ca313a135894d87&oe=5D4BDCB1" />
				</div>
				<div className="myTweet">
					<textarea className="post-tweet" type="text" placeholder="What's Happening?" ref={this.myRef}></textarea>
				</div>
				<div className="btn">
					<button className="btn-tweet" onClick={this.myClick}>Tweet</button>
				</div>
			</div>
		);
	}
}

class Tweet extends React.Component{
	render(){
		return(
			<div className="the-tweet" key={this.props.tweet.id}>
				<div className="img-tweet">
					<img className="img-profile" src={this.props.tweet.avatar} />
				</div>
				<div className="body-tweet">
					<div className="header-tweet">
						<span className="username">{this.props.tweet.user_name}</span>
						<span className="date">{this.props.tweet.created_at}</span>
					</div>
					<div className="content-tweet">
						<span className="text-tweet">
							{this.props.tweet.description}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

class Twitter extends React.Component{
	constructor(props){
		super(props);
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

	handleClick(e, ref){
		/*this.setState({tweets: [...this.state.tweets, {user: '@cristiano', date: new Date().toString(), post: this.myRef.current.value}]});
		console.log(this.state.tweets);
		this.myRef.current.value = '';
        this.myRef.current.focus();
        */
        this.setState({
        	isLoaded: false
        });
        let newTweet = {
        	user_name: 'Pepe',
        	avatar: 'https://scontent.fntr4-1.fna.fbcdn.net/v/t31.0-1/c362.106.1324.1324a/s320x320/133460_150577164994084_5857203_o.jpg?_nc_cat=111&_nc_ht=scontent.fntr4-1.fna&oh=934b9abef83d1ec86ca313a135894d87&oe=5D4BDCB1',
        	description: ref.current.value
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
        		let newTweet = result.draft_tweet;
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

        ref.current.value = '';
        ref.current.focus();

	}


	render(){
		const {error, isLoaded, tweets} = this.state;
		
		return(
			<div id="main">
				<Profile />
				<div className="landing">
					<Postbar click={this.handleClick}/>
					<div className="tweets">
						<Feed error={error} tweets={tweets}/>
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