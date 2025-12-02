import AuthStore from './AuthStore';

class RootStore {
    constructor(){
        this.authStore = new AuthStore();
    }
}

export default RootStore;