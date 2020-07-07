class APIs {

    constructor(){
        this.baseUrl = 'https://facebook.com/';

        this.urls = {
            profile: {
                me: this.baseUrl + 'nitishsihmar',
            },
            homescreen: {
                meme: this.baseUrl + 'nitishsihmar',
            }
        };
        this.getUrls = this.getUrls.bind(this);
    }

    getUrls() {
        return this.urls;
    }
}

const APIConstants = new APIs();
export default APIConstants;