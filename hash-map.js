class HashMap {
    constructor() {
        this.loadFactor = 0.75; // la norme
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            // charCodeAt converti un string (ici de key) en nombre
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    resize() {
        const oldBuckets = this.buckets;
        // on double this.capacity pour réduire le taux de charge (nombre d'élément par rapport à la capacité totale)
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0; // sera recalculée lors de l'insertion

        for (let bucket of oldBuckets) {
            if (bucket !== null) {
                for (let pair of bucket) {
                    this.set(pair.key, pair.value);
                }
            }
        }
    }


    set(key, value) {


        const index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        for (let pair of this.buckets[index]) {
            if (pair.key === key) {
                pair.value = value;
                return;
            }
        }

        if ((this.size + 1) / this.capacity > this.loadFactor) {
            this.resize();
        }

        const newIndex = this.hash(key);

        if (!this.buckets[newIndex]) {
            this.buckets[newIndex] = [];
        }


        this.buckets[index].push({ key, value });
        this.size++;
    }

    get(key) {
        const index = this.hash(key);

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

    has(key) {

        const index = this.hash(key);

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

        if (!this.buckets[index]) {
            return false;
        }

        for (let i = 0; i < this.buckets[index].length; i++) {
            const pair = this.buckets[index][i];
            if (pair.key === key) {
                this.buckets[index].splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    };


    clear() {
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
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

        let entriesArray = [];

        for (let bucket of this.buckets) {
            if (bucket !== null) {
                for (let pair of bucket) {
                    entriesArray.push([pair.key, pair.value])
                }
            }
        }
        return entriesArray;
    }
}

const test = new HashMap();
console.log(`Load Factor : ${test.loadFactor}`);
console.log(`Capacity : ${test.capacity}`);
console.log(`Size : ${test.length()}`);

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(`Size after insertion : ${test.length()}`);
console.log(`Capacity after insertion: ${test.capacity}`);
// méthode .toFixed(x) sert à formater un nombre en une chaîne de caractère
// avec exactement x chiffres après la virgule
console.log(`Current load: : ${(test.length() / test.capacity).toFixed(2)}`);

test.set('apple', 'green');
test.set('dog', 'white');
console.log(`Capacity after insertion: ${test.capacity}`);
test.set('lion', 'black');

console.log(`Size after overwriting : ${test.length()}`);
console.log(`Capacity after overwriting : ${test.capacity}`);

console.log(`apple: ${test.get('apple')}`); // doit afficher "green"
console.log(`dog: ${test.get('dog')}`); // doit afficher "white"
console.log(`lion: ${test.get('lion')}`); // doit afficher "black"

test.set('moon', 'silver')
console.log(`moon: ${test.get("moon")}`);

test.remove("moon");
test.remove("lion");
test.remove("dog");
test.remove("apple"); 
console.log(`Size after removing : ${test.length()}`);

console.log(`Keys available: ${test.keys()}`);
console.log(`Values available: ${test.values()}`);
console.log(`Entries available: ${test.entries()}`);

test.clear(); 
console.log(`Entries available after clearing: ${test.entries()}`);




