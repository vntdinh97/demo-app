export default class SingletonClass {
    constructor(name = "") {
        if (!!SingletonClass.instance) {
            return SingletonClass.instance;
        }

        SingletonClass.instance = this;

        this.name = name;

        return this;
    }

    getName() {
        return this.name;
    }
}