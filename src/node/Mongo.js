const mongoUrl = 'mongodb://localhost:27017/myproject';
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Link = require('./Link').Link;

class Mongo {
	constructor() {
		MongoClient.connect(mongoUrl, (err, db) => {
			this.db = db;
			assert.equal(null, err);
			console.log("Connected successfully to server");
		})
	}

	addLink(link, callback) {
		const collection = this.db.collection('links');

		collection.findOne({fullLink: link}, (err, result) => {
			if (result) {
				callback(JSON.stringify(result));
				return;
			}
			collection.insertOne(new Link(link), function (err, result) {
				console.log("add link");
			});
			collection.findOne({fullLink: link}, (err, result) => {
				callback(JSON.stringify(result));
			})
		});
	}

	getLink(link, callback) {
		this.db.collection('links')
			.findOne({shortLink: link}, (err, result) => {
				result ? callback(result.fullLink) : callback('', 'There is no link');
			});
	}
}

module.exports.Mongo = Mongo;
