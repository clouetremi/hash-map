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
    };

    set(key, value) {

        // L'index de notre tableau correspond au hash donné par notre méthode hash 
        // qui prend key en argument
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Index is not right");
        }

        // Si on a pas de valeur pour cette key (soit pas de donné dans notre buckets)
        // Alors on créer un tableau
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        // Pour chaque pair key/value présent dans notre buckets
        for (let pair of this.buckets[index]) {
            if (pair.key === key) {
                // la value de pair est la nouvelle
                pair.value = value;
                return;
            }
        }

        // On pousse notre key-/value dans notre buckets à l'index (this.hash)
        this.buckets[index].push({ key, value })
    };

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

        // Si la clé n'est trouvée dans aucune paire
        return null;
    };

    has(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Index is not right");
        }

        if (!this.buckets[index]) {
            return false;
        }

        for (let pair of this.buckets[index]) {
            if (pair.key === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Index is not right");
        }

        if (!this.buckets[index]) {
            return false;
        }

        for (let i = 0; i < this.buckets[index].length; i++) {
            const pair = this.buckets[index][i];
            if (pair.key === key) {
                this.buckets[index].splice(i, 1); // supprime l'élément
                return true;
            }
        }
        return false;
    }