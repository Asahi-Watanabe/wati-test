class TreeService {
    constructor() {
        this.tree = {};
    }
    
    save(tree) {
        this.tree = JSON.parse(JSON.stringify(tree));
    }

    valueValidator(tree) {
        for (const [key, value] of Object.entries(tree)) {
            if (key === 'value') {
                if (typeof value !== 'number') {
                    return false;
                }
            } else {
                return this.valueValidator(value);
            }
        }
        return true;
    }

    getValue(path) {
        if (!path) {
            return this.tree.value;
        }
        console.log(path);
        const pathSplits = path.split('.');
        let obj = this.tree;
        for (let i = 0; i < pathSplits.length; i++) {
            console.log(pathSplits[i], this.tree[pathSplits[i]]);
            obj = obj[pathSplits[i]];
            console.log(obj);
            if (obj === undefined)
                return null;
        }
        return obj.value;
    }
}

module.exports = TreeService;