import url from 'url';

class BaseUrl{
    constructor(requestUrl) {
        this.requestUrl = requestUrl;
        this.baseUrl=url.parse(this.requestUrl);
    }

    parseHost() {
        return this.baseUrl.host;
    }
    parseApp(){
      return this.baseUrl.pathname;
    }
    parseSeach(){
      return this.baseUrl.query;
    }
}

export default BaseUrl;
