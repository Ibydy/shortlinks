import React from 'react';
import '../styles/index.scss';
import axios from 'axios';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: '', link: {fullLink: '', shortLink: ''}};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.makeRequest = this.makeRequest.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.makeRequest(this.state.value)
	}

	makeRequest(link) {
		axios.post(`http://localhost:3001/addShortLink`, {link: link})
			.then(res => {
				this.setState({
					value: this.state.value,
					link: {fullLink: res.data.fullLink, shortLink: res.data.shortLink}
				});
			}, (error) => console.log(`Request err ${error}`));
	}

	render() {
		return (
			<div className="shorten-header">
				<div className="constrain">
					<div className="shorten-header-text">Simplify your links</div>
					<input type="text"
								 value={this.state.value}
								 onChange={this.handleChange}
								 className="constrain"/>
					<div className="shorten-header-button">
						<button className="shorten-header-button" onClick={this.handleSubmit}>Get simple link</button>
					</div>
				</div>
				Your link :
				<a style={{color: 'red'}} href={this.state.link.fullLink}>
					{this.state.link.shortLink}
				</a>
			</div>

		)
	}
}
