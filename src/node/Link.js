class Link {
	constructor(link) {
		this.shortLinkLength = 35;
		this.fullLink = link;
		this.shortLink = `http://localhost:3001/link/${this.getHashSum(link) + (new Date()).valueOf()}`
			.substring(0, this.shortLinkLength)
	}

	getHashSum (str) {
		let hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < str.length; i++) {
			chr   = str.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}
}
module.exports.Link = Link;
