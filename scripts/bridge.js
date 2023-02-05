const axios = require('axios');


class Bridge {
    #username;
    #ipAddress;
    #baseUrl;
    constructor(address, username) {
        this.#username = username;
        this.#ipAddress = address;
        this.#baseUrl = `http://${this.#ipAddress}/api/${this.#username}/`;
    }

    async init() {
        if (!(await Bridge.verifyBridge(this.#ipAddress, this.#username))) {
            throw Error("Invalid bridge or username");
        }
    }

    getBaseApiUrl() {
        return this.#baseUrl;
    }

    async getLights() {
        let res = await axios.get(this.#baseUrl + 'lights');
        let lights = res.data;
        let final = {};
        for (const light of Object.keys(lights)) {
            final[light] = new Light(this, light, lights[light].name, lights[light].state);
        }
        return final;
    }

    static async findBridgeAddress(username) {
        let res = await axios.get("https://discovery.meethue.com");
        const bridges = res.data;

        if (!bridges) return;

        for (const bridge of bridges) {
            if (!(await Bridge.verifyBridge(bridge.internalipaddress, username))) {
                continue;
            }

            return bridge.internalipaddress;
        }
        return null;
    }

    static async verifyBridge(address, username) {
        let res = await axios.get(`http://${address}/api/${username}/`);
        if (Array.isArray(res.data) && 'error' in res.data[0]) {
            return false;
        }
        return true;
    }
};


class Light {
    #bridge;
    #id;
    #name;
    constructor(bridge, id, name, state) {
        this.#bridge = bridge;
        this.#id = id;
        this.#name = name;
        this.state = state;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    async toggle() {
        await axios.put(
            `${this.#bridge.getBaseApiUrl()}lights/${this.#id}/state`,
            {on: !this.state.on}
        );
        this.state.on = !this.state.on;
    }

    async on() {
        this.state.on = true;
        await axios.put(
            `${this.#bridge.getBaseApiUrl()}lights/${this.#id}/state`,
            {on: true}
        );
    }

    async off() {
        this.state.on = false;
        await axios.put(
            `${this.#bridge.getBaseApiUrl()}lights/${this.#id}/state`,
            {on: false}
        );
    }

    json() {
        return {
            name: this.#name,
            id: this.#id
        }
    }
};

module.exports = Bridge;
