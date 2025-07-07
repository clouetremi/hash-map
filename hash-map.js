class HashMap {
    constructor() {
        this.loadFactor = 0.75; // la norme
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null);
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }


    set(key, value) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("The index is not right");
        }

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        for (let pair of this.buckets[index]) {
            if (pair.key === key) {
                pair.value = value;
                return;
            }
        }
        this.buckets[index].push({ key, value });
    }

    get(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Index is not right");
        }

        if (!this.buckets[index]) {
            return null;
        }

        for (let pair of this.buckets[index]) {
            if (pair.key === key) {
                return pair.value;
            }
        }
        return null;
    }

    remove(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("The index is not right");
        }

        if (!this.buckets[index]) {
            return false;
        }

        for (let i = 0; i < this.buckets[index].length; i++) {
            const pair = this.buckets[index][i];
            if (pair.key === key) {
                this.buckets[index].splice(i, 1);
                return true;
            }
        }
        return false;
    }

    length() {

        let count = 0;

        for (let bucket of this.buckets) {
            if (bucket !== null) {
                count += bucket.length; // ajoute le nombre de paires key/value
            }
        }
        return count;
    };


    clear() {
        this.buckets = new Array(this.capacity).fill(null);
    };


    keys() {

        const keysArray = [];

        for (let bucket of this.buckets) {
            if (bucket !== null) {
                for (let pair of bucket) {
                    keysArray.push(pair.key);
                }
            }
        }
        return keysArray;
    }


    values() {

        const valuesArray = [];

        for (let bucket of this.buckets) {
            if (bucket !== null) {
                for (let pair of bucket) {
                    valuesArray.push(pair.value);
                }
            }
        }
        return valuesArray;
    }

    entries() {

        let entriesValue = [];

        for (let bucket of this.buckets) {
            if (bucket !== null) {
                for (let pair of bucket) {
                    entriesValue.push([pair.key, pair.value])
                }
            }
        }
        return entriesValue;
    }
}