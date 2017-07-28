import {AsyncStorage} from 'react-native'
var cache = {};

export default {
  set(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value)).then((res)=>{
      cache[key] = value;
      return value;
    }).catch((err)=>{
      throw new Error('cache set error');
    });
  },
  get(key) {
    return AsyncStorage.getItem(key).then((res)=>{
      if(!res){
        let value = cache[key];
        if(value){
          return AsyncStorage.setItem(key, value);
        }

        throw new Error('cache get error');
      }

      return JSON.parse(res);
    }).catch((err)=>{
      let value = cache[key];
      if(value){
        return AsyncStorage.setItem(key, value);
      }

      throw new Error('cache get error');
    });
  },
  remove(...keys) {
    return AsyncStorage.multiRemove(keys).then((res)=>{
      keys.forEach((key) => {
        cache[key] = undefined;
      });

      return JSON.parse(res);
    });
  },
  clear() {
    return AsyncStorage.clear().then((res)=>{
      cache = {};
      return JSON.parse(res);
    });
  }
};