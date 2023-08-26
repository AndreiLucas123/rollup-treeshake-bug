//
//

export function selector(from, getter) {
  let value;
  let fromValue;
  let unsub;
  const subscribers = new Set();

  //
  //

  function set(newValue) {
    if (fromValue === newValue) return;
    fromValue = newValue;
    value = getter(newValue);
    subscribers.forEach((callback) => callback(value));
  }

  console.log('This will be included in the bundle');

  //
  //

  const _selector = {
    get() {
      if (!unsub) {
        return getter(from.get());
      }
      return value;
    },

    subscribe(callback) {
      if (!unsub) {
        unsub = from.subscribe((v) => set(v));
      }

      console.log('This should be included in the bundle'); // But will be removed

      callback(value);
      subscribers.add(callback);

      return () => {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          unsub?.();
          unsub = undefined;
        }
      };
    },
  };

  //
  //

  if (__DEV__) {
    _selector.dev = {
      get value() {
        return value;
      },
      get fromValue() {
        return fromValue;
      },
      subscribers,
      get started() {
        return unsub !== undefined;
      },
    };
  }

  return {
    get() {
      if (!unsub) {
        return getter(from.get());
      }
      return value;
    },

    subscribe(callback) {
      callback(value);
      subscribers.add(callback);
      if (!unsub) {
        unsub = from.subscribe((value) => set(value));
      }

      return () => {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          unsub?.();
          unsub = undefined;
        }
      };
    },
  };
}
