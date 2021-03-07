function Promise(executor) {
    this.status = 'pending';
    this.data = undefined;
    this.onResolvedCallbackStack = [];
    this.onRejectedCallbackStack = [];

    const self = this;

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        setTimeout(() => {
            self.status = 'resolved';
            self.data = value;
            self.onResolvedCallbackStack.map((cb) => cb(value));
        });

    }

    function reject(reason) {
        setTimeout(() => {
            self.data = reason;
            self.status = 'rejected';
            self.onRejectedCallbackStack.map((cb) => cb(reason));
        });
    }

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }

}

Promise.prototype.then = function(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function'? onResolved : v => v;
    onRejected = typeof onRejected === 'function'? onRejected : (r) => { throw  r};

    let promise1;
    const self = this;
    if (this.status === 'resolved') {
        return promise1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onResolved(self.data);
                    resolvePromise1(promise1, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
    if (this.status === 'rejected') {
        return promise1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const x = onRejected(self.data);
                    resolvePromise1(promise1, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
    if (this.status === 'pending') {
        return promise1 = new Promise((resolve, reject) => {
            this.onResolvedCallbackStack.push((v) => {
                try {
                    const x = onResolved(v);
                    resolvePromise1(promise1, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            this.onRejectedCallbackStack.push((r) => {
                try {
                    const x = onRejected(r);
                    resolvePromise1(promise1, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
}

function resolvePromise1(promise1, x, resolve, reject) {

    if (x === promise1) {
        return reject(new TypeError("hello"));
    }

    if (x instanceof Promise) {
        if (x.status === 'pending') {
            x.then(function(v) {
                return resolvePromise1(promise1, v, resolve, reject);
            }, reject);
        } else {
            x.then(resolve, reject);
        }

        return;
    }

    if (!(x !== null && (typeof x === 'object' || typeof x === 'function'))) {
        return resolve(x);
    }

    let thenCalledOrThrown = false;
    try {
        const then = x.then;
        if (typeof then !== 'function') {
            return resolve(x);
        }
        then.call(x, function rs(y) {
            if (thenCalledOrThrown) return;
            thenCalledOrThrown = true;
            return resolvePromise1(promise1, y, resolve, reject);
        }, function rj(r) {
            if (thenCalledOrThrown) return;
            thenCalledOrThrown = true;
            return reject(r);
        });
    } catch (e) {
        if (thenCalledOrThrown) return;
        thenCalledOrThrown = true;
        reject(e);
    }

}

Promise.prototype.catch = function(onReject) {
    return this.then(null, onReject);
}


Promise.deferred = function() {
    const dfd = {};

    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });

    return dfd;
}

module.exports = Promise;


