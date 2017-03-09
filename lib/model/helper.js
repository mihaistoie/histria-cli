var _destroyObject = (obj) => {
    if (obj) {
        Object.keys(obj).forEach((name) => {
            let ii = obj[name];
            ii.destroy();
        });
    }
    ;
};
export var destroyObject = _destroyObject;
