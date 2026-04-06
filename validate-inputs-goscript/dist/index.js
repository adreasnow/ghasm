// src/@goscript/builtin/slice.ts
function wrapSliceProxy(proxy) {
  const handler = {
    get(target, prop) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) {
        const index2 = Number(prop);
        if (index2 >= 0 && index2 < target.__meta__.length) {
          return target.__meta__.backing[target.__meta__.offset + index2];
        }
        throw new Error(
          `Slice index out of range: ${index2} >= ${target.__meta__.length}`
        );
      }
      if (prop === "length") {
        return target.__meta__.length;
      }
      if (prop === "__meta__") {
        return target.__meta__;
      }
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) {
        const index2 = Number(prop);
        if (index2 >= 0 && index2 < target.__meta__.length) {
          target.__meta__.backing[target.__meta__.offset + index2] = value;
          target[index2] = value;
          return true;
        }
        throw new Error(
          `Slice index out of range: ${index2} >= ${target.__meta__.length}`
        );
      }
      if (prop === "length" || prop === "__meta__") {
        return false;
      }
      return Reflect.set(target, prop, value);
    }
  };
  return new Proxy(proxy, handler);
}
function asArray(slice) {
  if (slice === null || slice === void 0) {
    return [];
  }
  if (slice instanceof Uint8Array) {
    return Array.from(slice);
  }
  if (isComplexSlice(slice)) {
    const result = [];
    for (let i = 0; i < slice.__meta__.length; i++) {
      result.push(slice.__meta__.backing[slice.__meta__.offset + i]);
    }
    return result;
  }
  if (Array.isArray(slice)) {
    return slice;
  }
  return [];
}
function isComplexSlice(slice) {
  return slice !== null && slice !== void 0 && typeof slice === "object" && "__meta__" in slice && slice.__meta__ !== void 0;
}
function isSliceProxy(slice) {
  return isComplexSlice(slice);
}
var makeSlice = (length, capacity, typeHint) => {
  if (typeHint === "byte") {
    const actualCapacity2 = capacity === void 0 ? length : capacity;
    if (length < 0 || actualCapacity2 < 0 || length > actualCapacity2) {
      throw new Error(
        `Invalid slice length (${length}) or capacity (${actualCapacity2})`
      );
    }
    if (actualCapacity2 === length) {
      return new Uint8Array(length);
    }
    const backingUint8 = new Uint8Array(actualCapacity2);
    const backingNumbers = Array.from(backingUint8);
    const proxyTargetArray2 = new Array(length);
    for (let i = 0; i < length; i++) {
      proxyTargetArray2[i] = 0;
    }
    const proxy2 = proxyTargetArray2;
    proxy2.__meta__ = {
      backing: backingNumbers,
      offset: 0,
      length,
      capacity: actualCapacity2
    };
    return wrapSliceProxy(proxy2);
  }
  const actualCapacity = capacity === void 0 ? length : capacity;
  if (length < 0 || actualCapacity < 0 || length > actualCapacity) {
    throw new Error(
      `Invalid slice length (${length}) or capacity (${actualCapacity})`
    );
  }
  let zeroVal;
  switch (typeHint) {
    case "number":
      zeroVal = 0;
      break;
    case "boolean":
      zeroVal = false;
      break;
    case "string":
      zeroVal = "";
      break;
    default:
      zeroVal = null;
  }
  const backingArr = new Array(actualCapacity);
  for (let i = 0; i < length; i++) {
    backingArr[i] = zeroVal;
  }
  if (length === actualCapacity) {
    return backingArr;
  }
  const proxyTargetArray = new Array(length);
  for (let i = 0; i < length; i++) {
    proxyTargetArray[i] = backingArr[i];
  }
  const proxy = proxyTargetArray;
  proxy.__meta__ = {
    backing: backingArr,
    offset: 0,
    length,
    capacity: actualCapacity
  };
  const handler = {
    get(target, prop) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) {
        const index2 = Number(prop);
        if (index2 >= 0 && index2 < target.__meta__.length) {
          return target.__meta__.backing[target.__meta__.offset + index2];
        }
        throw new Error(
          `Slice index out of range: ${index2} >= ${target.__meta__.length}`
        );
      }
      if (prop === "length") {
        return target.__meta__.length;
      }
      if (prop === "__meta__") {
        return target.__meta__;
      }
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) {
        const index2 = Number(prop);
        if (index2 >= 0 && index2 < target.__meta__.length) {
          target.__meta__.backing[target.__meta__.offset + index2] = value;
          target[index2] = value;
          return true;
        }
        throw new Error(
          `Slice index out of range: ${index2} >= ${target.__meta__.length}`
        );
      }
      if (prop === "length" || prop === "__meta__") {
        return false;
      }
      return Reflect.set(target, prop, value);
    }
  };
  return new Proxy(proxy, handler);
};
function goSlice(s, low, high, max2) {
  const handler = {
    get(target, prop) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) {
        const index2 = Number(prop);
        if (index2 >= 0 && index2 < target.__meta__.length) {
          return target.__meta__.backing[target.__meta__.offset + index2];
        }
        throw new Error(
          `Slice index out of range: ${index2} >= ${target.__meta__.length}`
        );
      }
      if (prop === "length") {
        return target.__meta__.length;
      }
      if (prop === "__meta__") {
        return target.__meta__;
      }
      if (prop === "slice" || prop === "map" || prop === "filter" || prop === "reduce" || prop === "forEach" || prop === Symbol.iterator) {
        const backingSlice = target.__meta__.backing.slice(
          target.__meta__.offset,
          target.__meta__.offset + target.__meta__.length
        );
        return backingSlice[prop].bind(backingSlice);
      }
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) {
        const index2 = Number(prop);
        if (index2 >= 0 && index2 < target.__meta__.length) {
          target.__meta__.backing[target.__meta__.offset + index2] = value;
          return true;
        }
        if (index2 === target.__meta__.length && target.__meta__.length < target.__meta__.capacity) {
          target.__meta__.backing[target.__meta__.offset + index2] = value;
          target.__meta__.length++;
          return true;
        }
        throw new Error(
          `Slice index out of range: ${index2} >= ${target.__meta__.length}`
        );
      }
      if (prop === "length" || prop === "__meta__") {
        return false;
      }
      return Reflect.set(target, prop, value);
    }
  };
  if (s instanceof Uint8Array) {
    const actualLow = low ?? 0;
    const actualHigh = high ?? s.length;
    if (actualLow < 0 || actualHigh < actualLow || actualHigh > s.length) {
      throw new Error(
        `Invalid slice indices: low ${actualLow}, high ${actualHigh} for Uint8Array of length ${s.length}`
      );
    }
    const subArrayView = s.subarray(actualLow, actualHigh);
    if (max2 !== void 0) {
      if (max2 < actualHigh || max2 > s.length) {
        throw new Error(
          `Invalid max index: ${max2}. Constraints: low ${actualLow} <= high ${actualHigh} <= max <= original_length ${s.length}`
        );
      }
      const newLength2 = subArrayView.length;
      const newCap2 = max2 - actualLow;
      if (newCap2 !== newLength2) {
        const backingNumbers = Array.from(subArrayView);
        const proxyTarget = {
          __meta__: {
            backing: backingNumbers,
            // number[]
            offset: 0,
            // Offset is 0 because backingNumbers is a direct copy
            length: newLength2,
            capacity: newCap2
          }
        };
        return new Proxy(
          proxyTarget,
          handler
        );
      } else {
        return subArrayView;
      }
    } else {
      return subArrayView;
    }
  }
  if (s === null || s === void 0) {
    low = low ?? 0;
    high = high ?? 0;
    if (low < 0 || high < low) {
      throw new Error(`Invalid slice indices: ${low}:${high}`);
    }
    if (low !== 0 || high !== 0) {
      throw new Error(
        `runtime error: slice bounds out of range [:${high}] with capacity 0`
      );
    }
    if (max2 !== void 0 && max2 !== 0) {
      throw new Error(
        `runtime error: slice bounds out of range [::${max2}] with capacity 0`
      );
    }
    return null;
  }
  const slen = len(s);
  low = low ?? 0;
  high = high ?? slen;
  if (low < 0 || high < low) {
    throw new Error(`Invalid slice indices: ${low}:${high}`);
  }
  const scap = cap(s);
  if (high > scap) {
    throw new Error(`Slice index out of range: ${high} > ${scap}`);
  }
  if (Array.isArray(s) && !isComplexSlice(s) && low === 0 && high === s.length && max2 === void 0) {
    return s;
  }
  let backing;
  let oldOffset = 0;
  let oldCap = scap;
  if (isComplexSlice(s)) {
    backing = s.__meta__.backing;
    oldOffset = s.__meta__.offset;
    oldCap = s.__meta__.capacity;
  } else {
    backing = s;
  }
  let newCap;
  if (max2 !== void 0) {
    if (max2 < high) {
      throw new Error(`Invalid slice indices: ${low}:${high}:${max2}`);
    }
    if (isComplexSlice(s) && max2 > oldOffset + oldCap) {
      throw new Error(
        `Slice index out of range: ${max2} > ${oldOffset + oldCap}`
      );
    }
    if (!isComplexSlice(s) && max2 > s.length) {
      throw new Error(`Slice index out of range: ${max2} > ${s.length}`);
    }
    newCap = max2 - low;
  } else {
    if (isComplexSlice(s)) {
      newCap = oldCap - low;
    } else {
      newCap = s.length - low;
    }
  }
  const newLength = high - low;
  const newOffset = oldOffset + low;
  if (newOffset === 0 && newLength === newCap) {
    return backing;
  }
  const proxyTargetArray = new Array(newLength);
  const proxy = proxyTargetArray;
  proxy.__meta__ = {
    backing,
    offset: newOffset,
    length: newLength,
    capacity: newCap
  };
  return new Proxy(proxy, handler);
}
var arrayToSlice = (arr, depth = 1) => {
  if (arr == null) return [];
  if (arr.length === 0) return arr;
  if (depth === 1) {
    return arr;
  }
  const target = {
    __meta__: {
      backing: arr,
      offset: 0,
      length: arr.length,
      capacity: arr.length
    }
  };
  const handler = {
    get(target2, prop) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) {
        const index2 = Number(prop);
        if (index2 >= 0 && index2 < target2.__meta__.length) {
          return target2.__meta__.backing[target2.__meta__.offset + index2];
        }
        throw new Error(
          `Slice index out of range: ${index2} >= ${target2.__meta__.length}`
        );
      }
      if (prop === "length") {
        return target2.__meta__.length;
      }
      if (prop === "__meta__") {
        return target2.__meta__;
      }
      if (prop === "slice" || prop === "map" || prop === "filter" || prop === "reduce" || prop === "forEach" || prop === Symbol.iterator) {
        const backingSlice = target2.__meta__.backing.slice(
          target2.__meta__.offset,
          target2.__meta__.offset + target2.__meta__.length
        );
        return backingSlice[prop].bind(backingSlice);
      }
      return Reflect.get(target2, prop);
    },
    set(target2, prop, value) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) {
        const index2 = Number(prop);
        if (index2 >= 0 && index2 < target2.__meta__.length) {
          target2.__meta__.backing[target2.__meta__.offset + index2] = value;
          return true;
        }
        if (index2 === target2.__meta__.length && target2.__meta__.length < target2.__meta__.capacity) {
          target2.__meta__.backing[target2.__meta__.offset + index2] = value;
          target2.__meta__.length++;
          return true;
        }
        throw new Error(
          `Slice index out of range: ${index2} >= ${target2.__meta__.length}`
        );
      }
      if (prop === "length" || prop === "__meta__") {
        return false;
      }
      return Reflect.set(target2, prop, value);
    }
  };
  if (depth > 1 && arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (!isComplexSlice(item) && Array.isArray(item)) {
        arr[i] = arrayToSlice(item, depth - 1);
      }
    }
  }
  return new Proxy(target, handler);
};
var len = (obj) => {
  if (obj === null || obj === void 0) {
    return 0;
  }
  if (typeof obj === "string") {
    return stringLen(obj);
  }
  if (obj instanceof Map || obj instanceof Set) {
    return obj.size;
  }
  if (obj instanceof Uint8Array) {
    return obj.length;
  }
  if (isComplexSlice(obj)) {
    return obj.__meta__.length;
  }
  if (Array.isArray(obj)) {
    return obj.length;
  }
  throw new Error("cannot determine len of this type");
};
var cap = (obj) => {
  if (obj === null || obj === void 0) {
    return 0;
  }
  if (obj instanceof Uint8Array) {
    return obj.length;
  }
  if (isComplexSlice(obj)) {
    return obj.__meta__.capacity;
  }
  if (Array.isArray(obj)) {
    return obj.length;
  }
  return 0;
};
function append(slice, ...elements) {
  const inputIsUint8Array = slice instanceof Uint8Array;
  const appendingUint8Array = elements.some((el) => el instanceof Uint8Array);
  const produceUint8Array = inputIsUint8Array || appendingUint8Array || slice === null && appendingUint8Array;
  if (produceUint8Array) {
    let combinedBytes = [];
    if (inputIsUint8Array) {
      combinedBytes.push(...Array.from(slice));
    } else if (slice !== null && slice !== void 0) {
      const sliceLen = len(slice);
      for (let i = 0; i < sliceLen; i++) {
        const val = slice[i];
        if (typeof val !== "number") {
          throw new Error(
            "Cannot produce Uint8Array: original slice contains non-number elements."
          );
        }
        combinedBytes.push(val);
      }
    }
    for (const item of elements) {
      if (item instanceof Uint8Array) {
        combinedBytes.push(...Array.from(item));
      } else if (isComplexSlice(item) || Array.isArray(item)) {
        const itemLen = len(item);
        for (let i = 0; i < itemLen; i++) {
          const val = item[i];
          if (typeof val !== "number") {
            throw new Error(
              "Cannot produce Uint8Array: appended elements contain non-numbers."
            );
          }
          combinedBytes.push(val);
        }
      } else {
        if (typeof item !== "number") {
          throw new Error(
            "Cannot produce Uint8Array: appended elements contain non-numbers."
          );
        }
        combinedBytes.push(item);
      }
    }
    const newArr = new Uint8Array(combinedBytes.length);
    newArr.set(combinedBytes);
    return newArr;
  }
  const numAdded = elements.length;
  if (numAdded === 0) {
    return slice;
  }
  let originalElements = [];
  let oldCapacity;
  let isOriginalComplex = false;
  let originalBacking = void 0;
  let originalOffset = 0;
  if (slice === null || slice === void 0) {
    oldCapacity = 0;
  } else if (isComplexSlice(slice)) {
    const meta = slice.__meta__;
    for (let i = 0; i < meta.length; i++)
      originalElements.push(meta.backing[meta.offset + i]);
    oldCapacity = meta.capacity;
    isOriginalComplex = true;
    originalBacking = meta.backing;
    originalOffset = meta.offset;
  } else {
    originalElements = slice.slice();
    oldCapacity = slice.length;
  }
  const oldLength = originalElements.length;
  const newLength = oldLength + numAdded;
  if (isOriginalComplex && newLength <= oldCapacity && originalBacking) {
    for (let i = 0; i < numAdded; i++) {
      originalBacking[originalOffset + oldLength + i] = elements[i];
    }
    const resultProxy2 = new Array(newLength);
    for (let i = 0; i < newLength; i++)
      resultProxy2[i] = originalBacking[originalOffset + i];
    resultProxy2.__meta__ = {
      backing: originalBacking,
      offset: originalOffset,
      length: newLength,
      capacity: oldCapacity
    };
    return wrapSliceProxy(resultProxy2);
  }
  let newCapacity = oldCapacity;
  if (newCapacity === 0) {
    newCapacity = newLength;
  } else if (oldLength < 1024) {
    newCapacity = Math.max(oldCapacity * 2, newLength);
  } else {
    newCapacity = Math.max(oldCapacity + Math.floor(oldCapacity / 4), newLength);
  }
  if (newCapacity < newLength) {
    newCapacity = newLength;
  }
  const newBacking = new Array(newCapacity);
  for (let i = 0; i < oldLength; i++) {
    newBacking[i] = originalElements[i];
  }
  for (let i = 0; i < numAdded; i++) {
    newBacking[oldLength + i] = elements[i];
  }
  const resultProxy = new Array(newLength);
  for (let i = 0; i < newLength; i++) resultProxy[i] = newBacking[i];
  resultProxy.__meta__ = {
    backing: newBacking,
    offset: 0,
    length: newLength,
    capacity: newCapacity
  };
  return wrapSliceProxy(resultProxy);
}
function copy(dst, src) {
  if (dst === null) {
    return 0;
  }
  if (typeof src === "string") {
    return copyFromString(dst, src);
  }
  if (src === null) {
    return 0;
  }
  const dstLen = dst instanceof Uint8Array ? dst.length : len(dst);
  const srcLen = src instanceof Uint8Array ? src.length : len(src);
  const count = Math.min(dstLen, srcLen);
  if (count === 0) {
    return 0;
  }
  if (dst instanceof Uint8Array && src instanceof Uint8Array) {
    dst.set(src.subarray(0, count));
    return count;
  }
  if (dst instanceof Uint8Array) {
    return copyToUint8Array(dst, src, count);
  }
  if (src instanceof Uint8Array) {
    return copyFromUint8Array(dst, src, count);
  }
  return copyBetweenSlices(dst, src, count);
}
function copyFromString(dst, src) {
  const dstLen = dst instanceof Uint8Array ? dst.length : len(dst);
  const count = Math.min(dstLen, src.length);
  if (count === 0) {
    return 0;
  }
  if (dst instanceof Uint8Array) {
    for (let i = 0; i < count; i++) {
      dst[i] = src.charCodeAt(i);
    }
  } else if (isComplexSlice(dst)) {
    const dstMeta = dst.__meta__;
    for (let i = 0; i < count; i++) {
      const byteVal = src.charCodeAt(i);
      dstMeta.backing[dstMeta.offset + i] = byteVal;
      dst[i] = byteVal;
    }
  } else if (Array.isArray(dst)) {
    for (let i = 0; i < count; i++) {
      dst[i] = src.charCodeAt(i);
    }
  }
  return count;
}
function copyToUint8Array(dst, src, count) {
  if (isComplexSlice(src)) {
    const srcMeta = src.__meta__;
    for (let i = 0; i < count; i++) {
      dst[i] = srcMeta.backing[srcMeta.offset + i];
    }
  } else if (Array.isArray(src)) {
    for (let i = 0; i < count; i++) {
      dst[i] = src[i];
    }
  }
  return count;
}
function copyFromUint8Array(dst, src, count) {
  if (isComplexSlice(dst)) {
    const dstMeta = dst.__meta__;
    for (let i = 0; i < count; i++) {
      dstMeta.backing[dstMeta.offset + i] = src[i];
      dst[i] = src[i];
    }
  } else if (Array.isArray(dst)) {
    for (let i = 0; i < count; i++) {
      dst[i] = src[i];
    }
  }
  return count;
}
function copyBetweenSlices(dst, src, count) {
  if (isComplexSlice(dst)) {
    const dstMeta = dst.__meta__;
    if (isComplexSlice(src)) {
      const srcMeta = src.__meta__;
      for (let i = 0; i < count; i++) {
        dstMeta.backing[dstMeta.offset + i] = srcMeta.backing[srcMeta.offset + i];
        dst[i] = srcMeta.backing[srcMeta.offset + i];
      }
    } else if (Array.isArray(src)) {
      for (let i = 0; i < count; i++) {
        dstMeta.backing[dstMeta.offset + i] = src[i];
        dst[i] = src[i];
      }
    }
  } else if (Array.isArray(dst)) {
    if (isComplexSlice(src)) {
      const srcMeta = src.__meta__;
      for (let i = 0; i < count; i++) {
        dst[i] = srcMeta.backing[srcMeta.offset + i];
      }
    } else if (Array.isArray(src)) {
      for (let i = 0; i < count; i++) {
        dst[i] = src[i];
      }
    }
  }
  return count;
}
function index(collection, index2) {
  if (collection === null || collection === void 0) {
    throw new Error("runtime error: index on nil or undefined collection");
  }
  if (typeof collection === "string") {
    return indexString(collection, index2);
  } else if (collection instanceof Uint8Array) {
    if (index2 < 0 || index2 >= collection.length) {
      throw new Error(
        `runtime error: index out of range [${index2}] with length ${collection.length}`
      );
    }
    return collection[index2];
  } else if (isComplexSlice(collection)) {
    if (index2 < 0 || index2 >= collection.__meta__.length) {
      throw new Error(
        `runtime error: index out of range [${index2}] with length ${collection.__meta__.length}`
      );
    }
    return collection.__meta__.backing[collection.__meta__.offset + index2];
  } else if (Array.isArray(collection)) {
    if (index2 < 0 || index2 >= collection.length) {
      throw new Error(
        `runtime error: index out of range [${index2}] with length ${collection.length}`
      );
    }
    return collection[index2];
  }
  throw new Error("runtime error: index on unsupported type");
}
var stringToRunes = (str) => {
  return Array.from(str).map((c) => c.codePointAt(0) || 0);
};
var stringToRune = (str) => {
  if (str.length === 0) {
    return 0;
  }
  return str.codePointAt(0) || 0;
};
var runesToString = (runes) => {
  return runes?.length ? String.fromCharCode(...runes) : "";
};
var byte = (n) => {
  return n & 255;
};
var indexString = (str, index2) => {
  if (typeof str !== "string") {
    if (str instanceof Uint8Array) {
      if (index2 < 0 || index2 >= str.length) {
        throw new Error(
          `runtime error: index out of range [${index2}] with length ${str.length}`
        );
      }
      return str[index2];
    }
    if (str === null || str === void 0) {
      throw new Error(
        `runtime error: index out of range [${index2}] with length 0`
      );
    }
    if (index2 < 0 || index2 >= str.length) {
      throw new Error(
        `runtime error: index out of range [${index2}] with length ${str.length}`
      );
    }
    return str[index2];
  }
  const bytes = new TextEncoder().encode(str);
  if (index2 < 0 || index2 >= bytes.length) {
    throw new Error(
      `runtime error: index out of range [${index2}] with length ${bytes.length}`
    );
  }
  return bytes[index2];
};
var stringLen = (str) => {
  return new TextEncoder().encode(str).length;
};
var sliceString = (str, low, high) => {
  const bytes = new TextEncoder().encode(str);
  const actualLow = low === void 0 ? 0 : low;
  const actualHigh = high === void 0 ? bytes.length : high;
  if (actualLow < 0 || actualHigh < actualLow || actualHigh > bytes.length) {
    if (actualLow === actualHigh && actualLow >= 0 && actualLow <= bytes.length) {
      return "";
    }
    throw new Error(
      `runtime error: slice bounds out of range [${actualLow}:${actualHigh}] with length ${bytes.length}`
    );
  }
  const slicedBytes = bytes.subarray(actualLow, actualHigh);
  try {
    const result = new TextDecoder("utf-8", { fatal: true }).decode(slicedBytes);
    return result;
  } catch (_e) {
    throw new Error(
      `Cannot slice string at byte indices [${actualLow}:${actualHigh}] because it would create invalid UTF-8. This is a limitation of JavaScript's string handling.`
    );
  }
};
var bytesToString = (bytes) => {
  if (bytes === null) return "";
  if (typeof bytes === "string") return bytes;
  if (bytes instanceof Uint8Array) {
    return new TextDecoder().decode(bytes);
  }
  let byteArray;
  if (isComplexSlice(bytes)) {
    byteArray = bytes.__meta__.backing.slice(
      bytes.__meta__.offset,
      bytes.__meta__.offset + bytes.__meta__.length
    );
  } else {
    byteArray = bytes;
  }
  return new TextDecoder().decode(Uint8Array.from(byteArray));
};
function stringToBytes(s) {
  if (typeof s === "string") {
    return new TextEncoder().encode(s);
  }
  if (s instanceof Uint8Array) {
    return s;
  }
  if (s === null || s === void 0) {
    return new Uint8Array(0);
  }
  return new Uint8Array(Array.isArray(s) ? s : []);
}
function genericBytesOrStringToString(value) {
  if (value === null || value === void 0) {
    return "";
  }
  if (typeof value === "string") {
    return value;
  }
  return bytesToString(value);
}
function indexStringOrBytes(value, index2) {
  if (typeof value === "string") {
    return indexString(value, index2);
  } else if (value instanceof Uint8Array) {
    if (index2 < 0 || index2 >= value.length) {
      throw new Error(
        `runtime error: index out of range [${index2}] with length ${value.length}`
      );
    }
    return value[index2];
  } else if (value === null) {
    throw new Error(
      `runtime error: index out of range [${index2}] with length 0`
    );
  } else {
    const length = len(value);
    if (index2 < 0 || index2 >= length) {
      throw new Error(
        `runtime error: index out of range [${index2}] with length ${length}`
      );
    }
    return value[index2];
  }
}
function sliceStringOrBytes(value, low, high, max2) {
  if (typeof value === "string") {
    return sliceString(value, low, high);
  } else {
    return goSlice(value, low, high, max2);
  }
}

// src/@goscript/builtin/builtin.ts
function println(...args) {
  if (args.length === 0) {
    console.log("");
  } else {
    console.log(...args);
  }
}
function panic(...args) {
  throw new Error(`panic: ${args.map((arg) => String(arg)).join(" ")}`);
}
function clear(v) {
  if (v === null || v === void 0) {
    return;
  }
  if (v instanceof Map) {
    v.clear();
    return;
  }
  if (Array.isArray(v)) {
    v.fill(null);
    return;
  }
}
function assignStruct(target, source) {
  if (target === null || target === void 0 || source === null || source === void 0) {
    return;
  }
  const targetFields = target._fields;
  const sourceFields = source._fields;
  if (!targetFields || !sourceFields) {
    return;
  }
  for (const key of Object.keys(sourceFields)) {
    const sourceField = sourceFields[key];
    const targetField = targetFields[key];
    if (sourceField && targetField && sourceField.value !== void 0) {
      targetField.value = sourceField.value;
    }
  }
}
function int(value) {
  return Math.trunc(value);
}
function normalizeBytes(bytes) {
  if (bytes === null || bytes === void 0) {
    return new Uint8Array(0);
  }
  if (bytes instanceof Uint8Array) {
    return bytes;
  }
  if (bytes && typeof bytes === "object" && "data" in bytes && Array.isArray(bytes.data)) {
    return new Uint8Array(bytes.data);
  }
  if (Array.isArray(bytes)) {
    return new Uint8Array(bytes);
  }
  throw new Error(`Cannot normalize bytes of type ${typeof bytes}: ${bytes}`);
}
function sortSlice(s) {
  if (s === null || s === void 0) {
    return;
  }
  if (Array.isArray(s)) {
    s.sort();
    return;
  }
  if (s instanceof Uint8Array) {
    s.sort();
    return;
  }
  if (isSliceProxy(s)) {
    const proxy = s;
    const meta = proxy.__meta__;
    const section = meta.backing.slice(meta.offset, meta.offset + meta.length);
    section.sort();
    for (let i = 0; i < section.length; i++) {
      meta.backing[meta.offset + i] = section[i];
    }
    return;
  }
}
function bytesEqual(a, b) {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  const aArr = bytesToArray(a);
  const bArr = bytesToArray(b);
  if (aArr.length !== bArr.length) return false;
  for (let i = 0; i < aArr.length; i++) {
    if (aArr[i] !== bArr[i]) return false;
  }
  return true;
}
function bytesCompare(a, b) {
  if (a === null && b === null) return 0;
  if (a === null) return -1;
  if (b === null) return 1;
  const aArr = bytesToArray(a);
  const bArr = bytesToArray(b);
  const minLen = Math.min(aArr.length, bArr.length);
  for (let i = 0; i < minLen; i++) {
    if (aArr[i] < bArr[i]) return -1;
    if (aArr[i] > bArr[i]) return 1;
  }
  if (aArr.length < bArr.length) return -1;
  if (aArr.length > bArr.length) return 1;
  return 0;
}
function bytesToArray(bytes) {
  if (bytes === null) return [];
  if (bytes instanceof Uint8Array) {
    return Array.from(bytes);
  }
  if (Array.isArray(bytes)) {
    return bytes;
  }
  if (isSliceProxy(bytes)) {
    const proxy = bytes;
    const meta = proxy.__meta__;
    return meta.backing.slice(meta.offset, meta.offset + meta.length);
  }
  throw new Error(`Cannot convert bytes of type ${typeof bytes} to array`);
}
function bytesToUint8Array(bytes) {
  if (bytes === null) return new Uint8Array(0);
  if (bytes instanceof Uint8Array) {
    return bytes;
  }
  return new Uint8Array(bytesToArray(bytes));
}
function bytesIndexOf(bytes, subslice) {
  if (bytes === null || subslice === null) return -1;
  const haystack = bytesToArray(bytes);
  const needle = bytesToArray(subslice);
  if (needle.length === 0) return 0;
  if (needle.length > haystack.length) return -1;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let found = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        found = false;
        break;
      }
    }
    if (found) return i;
  }
  return -1;
}
function bytesLastIndexOf(bytes, subslice) {
  if (bytes === null || subslice === null) return -1;
  const haystack = bytesToArray(bytes);
  const needle = bytesToArray(subslice);
  if (needle.length === 0) return haystack.length;
  if (needle.length > haystack.length) return -1;
  for (let i = haystack.length - needle.length; i >= 0; i--) {
    let found = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        found = false;
        break;
      }
    }
    if (found) return i;
  }
  return -1;
}
function bytesIndexByte(bytes, c) {
  if (bytes === null) return -1;
  const arr = bytesToArray(bytes);
  return arr.indexOf(c);
}
function bytesLastIndexByte(bytes, c) {
  if (bytes === null) return -1;
  const arr = bytesToArray(bytes);
  return arr.lastIndexOf(c);
}
function bytesCount(bytes, sep) {
  if (bytes === null || sep === null) return 0;
  const haystack = bytesToArray(bytes);
  const needle = bytesToArray(sep);
  if (needle.length === 0) {
    return haystack.length + 1;
  }
  let count = 0;
  let pos = 0;
  while (pos <= haystack.length - needle.length) {
    let found = true;
    for (let i = 0; i < needle.length; i++) {
      if (haystack[pos + i] !== needle[i]) {
        found = false;
        break;
      }
    }
    if (found) {
      count++;
      pos += needle.length;
    } else {
      pos++;
    }
  }
  return count;
}
function min(a, b) {
  return Math.min(a, b);
}
function max(a, b) {
  return Math.max(a, b);
}
function runeOrStringToString(runeOrString) {
  if (typeof runeOrString === "string") {
    return runeOrString;
  }
  return String.fromCharCode(runeOrString);
}
function recover() {
  return null;
}

// src/@goscript/builtin/channel.ts
async function selectStatement(cases, hasDefault = false) {
  if (cases.length === 0 && !hasDefault) {
    return new Promise(() => {
    });
  }
  const readyCases = [];
  for (const caseObj of cases) {
    if (caseObj.id === -1) {
      continue;
    }
    if (caseObj.channel === null) {
      continue;
    }
    if (caseObj.channel) {
      if (caseObj.isSend && caseObj.channel.canSendNonBlocking()) {
        readyCases.push(caseObj);
      } else if (!caseObj.isSend && caseObj.channel.canReceiveNonBlocking()) {
        readyCases.push(caseObj);
      }
    }
  }
  if (readyCases.length > 0) {
    const selectedCase2 = readyCases[Math.floor(Math.random() * readyCases.length)];
    if (selectedCase2.channel) {
      if (selectedCase2.isSend) {
        const result2 = await selectedCase2.channel.selectSend(
          selectedCase2.value,
          selectedCase2.id
        );
        if (selectedCase2.onSelected) {
          const handlerResult = await selectedCase2.onSelected(
            result2
          );
          return [handlerResult !== void 0, handlerResult];
        }
      } else {
        const result2 = await selectedCase2.channel.selectReceive(selectedCase2.id);
        if (selectedCase2.onSelected) {
          const handlerResult = await selectedCase2.onSelected(result2);
          return [handlerResult !== void 0, handlerResult];
        }
      }
    } else {
      console.error("Selected case without a channel:", selectedCase2);
    }
    return [false, void 0];
  }
  if (hasDefault) {
    const defaultCase = cases.find((c) => c.id === -1);
    if (defaultCase && defaultCase.onSelected) {
      const handlerResult = await defaultCase.onSelected({
        value: void 0,
        ok: false,
        id: -1
      });
      return [handlerResult !== void 0, handlerResult];
    }
    return [false, void 0];
  }
  const blockingPromises = cases.filter((c) => c.id !== -1).filter((c) => c.channel !== null).map((caseObj) => {
    if (caseObj.isSend) {
      return caseObj.channel.selectSend(caseObj.value, caseObj.id);
    } else {
      return caseObj.channel.selectReceive(caseObj.id);
    }
  });
  if (blockingPromises.length === 0) {
    return new Promise(() => {
    });
  }
  const result = await Promise.race(blockingPromises);
  const selectedCase = cases.find((c) => c.id === result.id);
  if (selectedCase && selectedCase.onSelected) {
    const handlerResult = await selectedCase.onSelected(result);
    return [handlerResult !== void 0, handlerResult];
  }
  return [false, void 0];
}
async function chanSend(channel, value) {
  if (channel === null) {
    return new Promise(() => {
    });
  }
  return channel.send(value);
}
async function chanRecv(channel) {
  if (channel === null) {
    return new Promise(() => {
    });
  }
  return channel.receive();
}
async function chanRecvWithOk(channel) {
  if (channel === null) {
    return new Promise(() => {
    });
  }
  return channel.receiveWithOk();
}
function makeChannel(bufferSize, zeroValue, direction = "both") {
  const channel = new BufferedChannel(bufferSize, zeroValue);
  if (direction === "send") {
    return new SendOnlyChannelRef(channel);
  } else if (direction === "receive") {
    return new ReceiveOnlyChannelRef(channel);
  } else {
    return channel;
  }
}
var BufferedChannel = class {
  buffer = [];
  closed = false;
  capacity;
  zeroValue;
  // Made public for access by ChannelRef or for type inference
  // Senders queue: stores { value, resolve for send, reject for send }
  senders = [];
  // Receivers queue for receive(): stores { resolve for receive, reject for receive }
  receivers = [];
  // Receivers queue for receiveWithOk(): stores { resolve for receiveWithOk }
  receiversWithOk = [];
  constructor(capacity, zeroValue) {
    if (capacity < 0) {
      throw new Error("Channel capacity cannot be negative");
    }
    this.capacity = capacity;
    this.zeroValue = zeroValue;
  }
  async send(value) {
    if (this.closed) {
      throw new Error("send on closed channel");
    }
    if (this.receivers.length > 0) {
      const receiverTask = this.receivers.shift();
      queueMicrotask(() => receiverTask.resolveReceive(value));
      return;
    }
    if (this.receiversWithOk.length > 0) {
      const receiverTask = this.receiversWithOk.shift();
      queueMicrotask(() => receiverTask.resolveReceive({ value, ok: true }));
      return;
    }
    if (this.buffer.length < this.capacity) {
      this.buffer.push(value);
      return;
    }
    return new Promise((resolve, reject) => {
      this.senders.push({ value, resolveSend: resolve, rejectSend: reject });
    });
  }
  async receive() {
    if (this.buffer.length > 0) {
      const value = this.buffer.shift();
      if (this.senders.length > 0) {
        const senderTask = this.senders.shift();
        this.buffer.push(senderTask.value);
        queueMicrotask(() => senderTask.resolveSend());
      }
      return value;
    }
    if (this.closed) {
      return this.zeroValue;
    }
    if (this.senders.length > 0) {
      const senderTask = this.senders.shift();
      queueMicrotask(() => senderTask.resolveSend());
      return senderTask.value;
    }
    return new Promise((resolve, reject) => {
      this.receivers.push({ resolveReceive: resolve, rejectReceive: reject });
    });
  }
  async receiveWithOk() {
    if (this.buffer.length > 0) {
      const value = this.buffer.shift();
      if (this.senders.length > 0) {
        const senderTask = this.senders.shift();
        this.buffer.push(senderTask.value);
        queueMicrotask(() => senderTask.resolveSend());
      }
      return { value, ok: true };
    }
    if (this.senders.length > 0) {
      const senderTask = this.senders.shift();
      queueMicrotask(() => senderTask.resolveSend());
      return { value: senderTask.value, ok: true };
    }
    if (this.closed) {
      return { value: this.zeroValue, ok: false };
    }
    return new Promise((resolve) => {
      this.receiversWithOk.push({ resolveReceive: resolve });
    });
  }
  async selectReceive(id) {
    if (this.buffer.length > 0) {
      const value = this.buffer.shift();
      if (this.senders.length > 0) {
        const senderTask = this.senders.shift();
        this.buffer.push(senderTask.value);
        queueMicrotask(() => senderTask.resolveSend());
      }
      return { value, ok: true, id };
    }
    if (this.senders.length > 0) {
      const senderTask = this.senders.shift();
      queueMicrotask(() => senderTask.resolveSend());
      return { value: senderTask.value, ok: true, id };
    }
    if (this.closed) {
      return { value: this.zeroValue, ok: false, id };
    }
    return new Promise((resolve) => {
      this.receiversWithOk.push({
        resolveReceive: (result) => {
          resolve({ ...result, id });
        }
      });
    });
  }
  async selectSend(value, id) {
    if (this.closed) {
      throw new Error("send on closed channel");
    }
    if (this.receivers.length > 0) {
      const receiverTask = this.receivers.shift();
      queueMicrotask(() => receiverTask.resolveReceive(value));
      return { value: true, ok: true, id };
    }
    if (this.receiversWithOk.length > 0) {
      const receiverTask = this.receiversWithOk.shift();
      queueMicrotask(() => receiverTask.resolveReceive({ value, ok: true }));
      return { value: true, ok: true, id };
    }
    if (this.buffer.length < this.capacity) {
      this.buffer.push(value);
      return { value: true, ok: true, id };
    }
    return new Promise((resolve, reject) => {
      this.senders.push({
        value,
        resolveSend: () => resolve({ value: true, ok: true, id }),
        rejectSend: (e) => reject(e)
        // Propagate error if channel closes
      });
    });
  }
  close() {
    if (this.closed) {
      throw new Error("close of closed channel");
    }
    this.closed = true;
    const sendersToNotify = [...this.senders];
    this.senders = [];
    for (const senderTask of sendersToNotify) {
      queueMicrotask(
        () => senderTask.rejectSend(new Error("send on closed channel"))
      );
    }
    const receiversToNotify = [...this.receivers];
    this.receivers = [];
    for (const receiverTask of receiversToNotify) {
      queueMicrotask(() => receiverTask.resolveReceive(this.zeroValue));
    }
    const receiversWithOkToNotify = [...this.receiversWithOk];
    this.receiversWithOk = [];
    for (const receiverTask of receiversWithOkToNotify) {
      queueMicrotask(
        () => receiverTask.resolveReceive({ value: this.zeroValue, ok: false })
      );
    }
  }
  canReceiveNonBlocking() {
    return this.buffer.length > 0 || this.senders.length > 0 || this.closed;
  }
  canSendNonBlocking() {
    if (this.closed) {
      return true;
    }
    return this.buffer.length < this.capacity || this.receivers.length > 0 || this.receiversWithOk.length > 0;
  }
};
var BidirectionalChannelRef = class {
  constructor(channel) {
    this.channel = channel;
  }
  channel;
  direction = "both";
  // Delegate all methods to the underlying channel
  send(value) {
    return this.channel.send(value);
  }
  receive() {
    return this.channel.receive();
  }
  receiveWithOk() {
    return this.channel.receiveWithOk();
  }
  close() {
    this.channel.close();
  }
  canSendNonBlocking() {
    return this.channel.canSendNonBlocking();
  }
  canReceiveNonBlocking() {
    return this.channel.canReceiveNonBlocking();
  }
  selectSend(value, id) {
    return this.channel.selectSend(value, id);
  }
  selectReceive(id) {
    return this.channel.selectReceive(id);
  }
};
var SendOnlyChannelRef = class {
  constructor(channel) {
    this.channel = channel;
  }
  channel;
  direction = "send";
  // Allow send operations
  send(value) {
    return this.channel.send(value);
  }
  // Allow close operations
  close() {
    this.channel.close();
  }
  canSendNonBlocking() {
    return this.channel.canSendNonBlocking();
  }
  selectSend(value, id) {
    return this.channel.selectSend(value, id);
  }
  // Disallow receive operations
  receive() {
    throw new Error("Cannot receive from send-only channel");
  }
  receiveWithOk() {
    throw new Error("Cannot receive from send-only channel");
  }
  canReceiveNonBlocking() {
    return false;
  }
  selectReceive(_id) {
    throw new Error("Cannot receive from send-only channel");
  }
};
var ReceiveOnlyChannelRef = class {
  constructor(channel) {
    this.channel = channel;
  }
  channel;
  direction = "receive";
  // Allow receive operations
  receive() {
    return this.channel.receive();
  }
  receiveWithOk() {
    return this.channel.receiveWithOk();
  }
  canReceiveNonBlocking() {
    return this.channel.canReceiveNonBlocking();
  }
  selectReceive(id) {
    return this.channel.selectReceive(id);
  }
  // Disallow send operations
  send(_value) {
    throw new Error("Cannot send to receive-only channel");
  }
  // Disallow close operations
  close() {
    throw new Error("Cannot close receive-only channel");
  }
  canSendNonBlocking() {
    return false;
  }
  selectSend(_value, _id) {
    throw new Error("Cannot send to receive-only channel");
  }
};
function makeChannelRef(channel, direction) {
  switch (direction) {
    case "send":
      return new SendOnlyChannelRef(channel);
    case "receive":
      return new ReceiveOnlyChannelRef(channel);
    default:
      return new BidirectionalChannelRef(channel);
  }
}

// src/@goscript/builtin/map.ts
var makeMap = () => {
  return /* @__PURE__ */ new Map();
};
function mapGet(map, key, defaultValue) {
  const exists = map?.has(key);
  if (exists) {
    return [map.get(key), true];
  } else {
    return [defaultValue, false];
  }
}
var mapSet = (map, key, value) => {
  if (!map) {
    throw new Error("assign to nil map");
  }
  map.set(key, value);
};
var deleteMapEntry = (map, key) => {
  map?.delete(key);
};
var mapHas = (map, key) => {
  return map?.has(key) ?? false;
};

// src/@goscript/builtin/type.ts
var TypeKind = /* @__PURE__ */ ((TypeKind2) => {
  TypeKind2["Basic"] = "basic";
  TypeKind2["Interface"] = "interface";
  TypeKind2["Struct"] = "struct";
  TypeKind2["Map"] = "map";
  TypeKind2["Slice"] = "slice";
  TypeKind2["Array"] = "array";
  TypeKind2["Pointer"] = "pointer";
  TypeKind2["Function"] = "function";
  TypeKind2["Channel"] = "channel";
  return TypeKind2;
})(TypeKind || {});
function isStructTypeInfo(info) {
  return info.kind === "struct" /* Struct */;
}
function isInterfaceTypeInfo(info) {
  return info.kind === "interface" /* Interface */;
}
function isBasicTypeInfo(info) {
  return info.kind === "basic" /* Basic */;
}
function isMapTypeInfo(info) {
  return info.kind === "map" /* Map */;
}
function isSliceTypeInfo(info) {
  return info.kind === "slice" /* Slice */;
}
function isArrayTypeInfo(info) {
  return info.kind === "array" /* Array */;
}
function isPointerTypeInfo(info) {
  return info.kind === "pointer" /* Pointer */;
}
function isFunctionTypeInfo(info) {
  return info.kind === "function" /* Function */;
}
function isChannelTypeInfo(info) {
  return info.kind === "channel" /* Channel */;
}
function isStructFieldInfo(fieldValue) {
  return typeof fieldValue === "object" && fieldValue !== null && "type" in fieldValue && !("kind" in fieldValue);
}
var typeRegistry = /* @__PURE__ */ new Map();
var registerStructType = (name, zeroValue, methods, ctor, fields = {}) => {
  const typeInfo = {
    name,
    kind: "struct" /* Struct */,
    zeroValue,
    methods,
    ctor,
    fields
  };
  typeRegistry.set(name, typeInfo);
  return typeInfo;
};
var registerInterfaceType = (name, zeroValue, methods) => {
  const typeInfo = {
    name,
    kind: "interface" /* Interface */,
    zeroValue,
    methods
  };
  typeRegistry.set(name, typeInfo);
  return typeInfo;
};
var getTypeByName = (name) => {
  return typeRegistry.get(name);
};
function normalizeTypeInfo(info) {
  if (typeof info === "string") {
    const typeInfo = typeRegistry.get(info);
    if (typeInfo) {
      return typeInfo;
    }
    return {
      kind: "basic" /* Basic */,
      name: info
    };
  }
  return info;
}
function compareOptionalTypeInfo(type1, type2) {
  if (type1 === void 0 && type2 === void 0) return true;
  if (type1 === void 0 || type2 === void 0) return false;
  return areTypeInfosIdentical(type1, type2);
}
function areFuncParamOrResultArraysIdentical(arr1, arr2) {
  if (arr1 === void 0 && arr2 === void 0) return true;
  if (arr1 === void 0 || arr2 === void 0) return false;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (!areTypeInfosIdentical(arr1[i], arr2[i])) {
      return false;
    }
  }
  return true;
}
function areFuncSignaturesIdentical(func1, func2) {
  if ((func1.isVariadic || false) !== (func2.isVariadic || false)) {
    return false;
  }
  return areFuncParamOrResultArraysIdentical(func1.params, func2.params) && areFuncParamOrResultArraysIdentical(func1.results, func2.results);
}
function areTypeInfosIdentical(type1InfoOrName, type2InfoOrName) {
  const t1Norm = normalizeTypeInfo(type1InfoOrName);
  const t2Norm = normalizeTypeInfo(type2InfoOrName);
  if (t1Norm === t2Norm) return true;
  if (t1Norm.kind !== t2Norm.kind) return false;
  if (t1Norm.name !== t2Norm.name) return false;
  if (t1Norm.name !== void 0) {
    if (t1Norm.kind === "basic" /* Basic */ || t1Norm.kind === "struct" /* Struct */ || t1Norm.kind === "interface" /* Interface */) {
      return true;
    }
  }
  switch (t1Norm.kind) {
    case "basic" /* Basic */:
      return true;
    case "pointer" /* Pointer */:
      return compareOptionalTypeInfo(
        t1Norm.elemType,
        t2Norm.elemType
      );
    case "slice" /* Slice */:
      return compareOptionalTypeInfo(
        t1Norm.elemType,
        t2Norm.elemType
      );
    case "array" /* Array */:
      return t1Norm.length === t2Norm.length && compareOptionalTypeInfo(
        t1Norm.elemType,
        t2Norm.elemType
      );
    case "map" /* Map */:
      return compareOptionalTypeInfo(
        t1Norm.keyType,
        t2Norm.keyType
      ) && compareOptionalTypeInfo(
        t1Norm.elemType,
        t2Norm.elemType
      );
    case "channel" /* Channel */:
      return (
        // Ensure direction property exists before comparing, or handle undefined if it can be
        (t1Norm.direction || "both") === (t2Norm.direction || "both") && compareOptionalTypeInfo(
          t1Norm.elemType,
          t2Norm.elemType
        )
      );
    case "function" /* Function */:
      return areFuncSignaturesIdentical(
        t1Norm,
        t2Norm
      );
    case "struct" /* Struct */:
    case "interface" /* Interface */:
      return false;
    default:
      return false;
  }
}
function validateMapKey(key, keyTypeInfo) {
  if (keyTypeInfo.kind === "basic" /* Basic */) {
    if (keyTypeInfo.name === "string") {
      return typeof key === "string";
    } else if (keyTypeInfo.name === "int" || keyTypeInfo.name === "float64" || keyTypeInfo.name === "number") {
      if (typeof key === "string") {
        return /^-?\d+(\.\d+)?$/.test(key);
      } else {
        return typeof key === "number";
      }
    }
  }
  return false;
}
function matchesBasicType(value, info) {
  if (info.name === "string") return typeof value === "string";
  if (info.name === "number" || info.name === "int" || info.name === "float64")
    return typeof value === "number";
  if (info.name === "boolean" || info.name === "bool")
    return typeof value === "boolean";
  return false;
}
function matchesStructType(value, info) {
  if (!isStructTypeInfo(info)) return false;
  if (info.ctor && value instanceof info.ctor) {
    return isMarkedAsStructValue(value);
  }
  if (info.ctor) {
    return false;
  }
  if (typeof value === "object" && value !== null && info.fields) {
    const fieldNames = Object.keys(info.fields || {});
    const valueFields = Object.keys(value);
    const fieldsExist = fieldNames.every((field) => field in value);
    const sameFieldCount = valueFields.length === fieldNames.length;
    const allFieldsInStruct = valueFields.every(
      (field) => fieldNames.includes(field)
    );
    if (fieldsExist && sameFieldCount && allFieldsInStruct) {
      return Object.entries(info.fields).every(([fieldName, fieldType]) => {
        return matchesType(
          value[fieldName],
          normalizeTypeInfo(fieldType)
        );
      });
    }
    return false;
  }
  return false;
}
function matchesInterfaceType(value, info) {
  if (!isInterfaceTypeInfo(info) || typeof value !== "object" || value === null) {
    return false;
  }
  return info.methods.every((requiredMethodSig) => {
    const actualMethod = value[requiredMethodSig.name];
    if (typeof actualMethod !== "function") {
      return false;
    }
    const declaredParamCount = actualMethod.length;
    const requiredParamCount = requiredMethodSig.args.length;
    if (declaredParamCount < requiredParamCount) {
      return false;
    }
    if (value.__goTypeName) {
      const valueTypeInfo = typeRegistry.get(value.__goTypeName);
      if (valueTypeInfo && isStructTypeInfo(valueTypeInfo)) {
        const valueMethodSig = valueTypeInfo.methods.find(
          (m) => m.name === requiredMethodSig.name
        );
        if (valueMethodSig) {
          if (valueMethodSig.returns.length !== requiredMethodSig.returns.length) {
            return false;
          }
          for (let i = 0; i < requiredMethodSig.returns.length; i++) {
            const requiredReturnType = normalizeTypeInfo(
              requiredMethodSig.returns[i].type
            );
            const valueReturnType = normalizeTypeInfo(
              valueMethodSig.returns[i].type
            );
            if (isInterfaceTypeInfo(requiredReturnType)) {
              if (requiredReturnType.name !== valueReturnType.name) {
                return false;
              }
            } else if (requiredReturnType.name !== valueReturnType.name) {
              return false;
            }
          }
        }
      }
    }
    return true;
  });
}
function matchesMapType(value, info) {
  if (typeof value !== "object" || value === null) return false;
  if (!isMapTypeInfo(info)) return false;
  if (info.keyType || info.elemType) {
    let entries = [];
    if (value instanceof Map) {
      entries = Array.from(value.entries());
    } else {
      entries = Object.entries(value);
    }
    if (entries.length === 0) return true;
    const sampleSize = Math.min(5, entries.length);
    for (let i = 0; i < sampleSize; i++) {
      const [k, v] = entries[i];
      if (info.keyType) {
        if (!validateMapKey(
          k,
          normalizeTypeInfo(info.keyType)
        )) {
          return false;
        }
      }
      if (info.elemType && !matchesType(v, normalizeTypeInfo(info.elemType))) {
        return false;
      }
    }
  }
  return true;
}
function matchesArrayOrSliceType(value, info) {
  if (!Array.isArray(value)) return false;
  if (!isArrayTypeInfo(info) && !isSliceTypeInfo(info)) return false;
  if (info.elemType) {
    const arr = value;
    if (arr.length === 0) return true;
    const sampleSize = Math.min(5, arr.length);
    for (let i = 0; i < sampleSize; i++) {
      if (!matchesType(
        arr[i],
        normalizeTypeInfo(info.elemType)
      )) {
        return false;
      }
    }
  }
  return true;
}
var STRUCT_VALUE_MARKER = /* @__PURE__ */ Symbol("structValue");
function markAsStructValue(value) {
  if (typeof value === "object" && value !== null) {
    ;
    value[STRUCT_VALUE_MARKER] = true;
  }
  return value;
}
function isMarkedAsStructValue(value) {
  return typeof value === "object" && value !== null && value[STRUCT_VALUE_MARKER] === true;
}
function matchesPointerType(value, info) {
  if (value === null || value === void 0) {
    return true;
  }
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (!isPointerTypeInfo(info)) return false;
  if (!info.elemType) return false;
  let elem = info.elemType;
  let elemName;
  if (typeof elem === "string") {
    elemName = elem;
  } else if (elem.name) {
    elemName = elem.name;
  } else {
    return false;
  }
  const registered = typeRegistry.get(elemName);
  if (registered && registered.kind === "struct" /* Struct */ && registered.ctor) {
    if ("value" in value) {
      let elemTypeInfo = normalizeTypeInfo(elem);
      return matchesType(value.value, elemTypeInfo);
    }
    return value instanceof registered.ctor && !isMarkedAsStructValue(value);
  } else {
    if (!("value" in value)) {
      return false;
    }
    let elemTypeInfo = normalizeTypeInfo(elem);
    return matchesType(value.value, elemTypeInfo);
  }
}
function matchesFunctionType(value, info) {
  if (typeof value !== "function") {
    return false;
  }
  if (info.name && value.__goTypeName) {
    return info.name === value.__goTypeName;
  }
  return true;
}
function matchesChannelType(value, info) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  let channel = value;
  let valueDirection = "both";
  if ("channel" in value && "direction" in value) {
    channel = value.channel;
    valueDirection = value.direction;
  }
  if (!("send" in channel) || !("receive" in channel) || !("close" in channel) || typeof channel.send !== "function" || typeof channel.receive !== "function" || typeof channel.close !== "function") {
    return false;
  }
  if (info.elemType) {
    if (info.elemType === "string" && "zeroValue" in channel && channel.zeroValue !== "") {
      return false;
    }
    if (info.elemType === "number" && "zeroValue" in channel && typeof channel.zeroValue !== "number") {
      return false;
    }
  }
  if (info.direction) {
    return valueDirection === info.direction;
  }
  return true;
}
function matchesType(value, info) {
  if (value === null || value === void 0) {
    return false;
  }
  switch (info.kind) {
    case "basic" /* Basic */:
      return matchesBasicType(value, info);
    case "struct" /* Struct */:
      return matchesStructType(value, info);
    case "interface" /* Interface */:
      return matchesInterfaceType(value, info);
    case "map" /* Map */:
      return matchesMapType(value, info);
    case "slice" /* Slice */:
    case "array" /* Array */:
      return matchesArrayOrSliceType(value, info);
    case "pointer" /* Pointer */:
      return matchesPointerType(value, info);
    case "function" /* Function */:
      return matchesFunctionType(value, info);
    case "channel" /* Channel */:
      return matchesChannelType(value, info);
    default:
      console.warn(
        `Type matching for kind '${info.kind}' not implemented.`
      );
      return false;
  }
}
function compareTypeStringWithTypeInfo(typeStr, typeInfo) {
  if (isPointerTypeInfo(typeInfo)) {
    if (!typeStr.startsWith("*")) {
      return false;
    }
    const elemStr = typeStr.slice(1);
    const elemType = typeInfo.elemType;
    if (!elemType) {
      return false;
    }
    if (elemStr.startsWith("struct{")) {
      const elemTypeInfo = normalizeTypeInfo(elemType);
      if (!isStructTypeInfo(elemTypeInfo)) {
        return false;
      }
      const fieldsMatch = elemStr.match(/^struct{(.+)}$/);
      if (!fieldsMatch) {
        return false;
      }
      const fieldStr = fieldsMatch[1];
      const fieldParts = fieldStr.split(";").map((s) => s.trim());
      const parsedFields = {};
      for (const part of fieldParts) {
        const match = part.match(/^(\w+)\s+(.+)$/);
        if (match) {
          const [, fieldName, fieldType] = match;
          parsedFields[fieldName] = fieldType.trim();
        }
      }
      const typeInfoFields = elemTypeInfo.fields || {};
      const typeInfoFieldNames = Object.keys(typeInfoFields);
      const parsedFieldNames = Object.keys(parsedFields);
      if (typeInfoFieldNames.length !== parsedFieldNames.length) {
        return false;
      }
      for (const fieldName of typeInfoFieldNames) {
        if (!(fieldName in parsedFields)) {
          return false;
        }
        const fieldValue = typeInfoFields[fieldName];
        const fieldTypeInfo = isStructFieldInfo(fieldValue) ? fieldValue.type : fieldValue;
        const typeInfoFieldType = normalizeTypeInfo(fieldTypeInfo);
        const parsedFieldType = parsedFields[fieldName];
        if (isBasicTypeInfo(typeInfoFieldType)) {
          const expectedTypeName = typeInfoFieldType.name || "";
          if (expectedTypeName === "string" && parsedFieldType === "string") {
            continue;
          }
          if ((expectedTypeName === "int" || expectedTypeName === "number") && (parsedFieldType === "int" || parsedFieldType === "number")) {
            continue;
          }
          return false;
        }
      }
      return true;
    }
    if (typeof elemType === "string") {
      return elemStr === elemType;
    }
    if (elemType.name) {
      return elemStr === elemType.name;
    }
  }
  return false;
}
function typeAssert(value, typeInfo) {
  const normalizedType = normalizeTypeInfo(typeInfo);
  if (typeof value === "object" && value !== null && value.__isTypedNil) {
    if (isPointerTypeInfo(normalizedType)) {
      const storedTypeStr = value.__goType;
      if (compareTypeStringWithTypeInfo(storedTypeStr, normalizedType)) {
        return { value: null, ok: true };
      }
      return { value: null, ok: false };
    }
    return { value: null, ok: false };
  }
  if (isPointerTypeInfo(normalizedType) && value === null) {
    return { value: null, ok: true };
  }
  if (isMapTypeInfo(normalizedType) && typeof value === "object" && value !== null) {
    if (normalizedType.keyType || normalizedType.elemType) {
      let entries = [];
      if (value instanceof Map) {
        entries = Array.from(value.entries());
      } else {
        entries = Object.entries(value);
      }
      if (entries.length === 0) {
        return { value, ok: true };
      }
      const sampleSize = Math.min(5, entries.length);
      for (let i = 0; i < sampleSize; i++) {
        const [k, v] = entries[i];
        if (normalizedType.keyType) {
          if (!validateMapKey(
            k,
            normalizeTypeInfo(normalizedType.keyType)
          )) {
            return { value: null, ok: false };
          }
        }
        if (normalizedType.elemType) {
          const elemTypeInfo = normalizeTypeInfo(
            normalizedType.elemType
          );
          if (!matchesType(v, elemTypeInfo)) {
            return { value: null, ok: false };
          }
        }
      }
      return { value, ok: true };
    }
  }
  const matches = matchesType(value, normalizedType);
  if (matches) {
    if (isPointerTypeInfo(normalizedType) && typeof value === "object" && value !== null && "value" in value) {
      return { value: value.value, ok: true };
    }
    return { value, ok: true };
  }
  if (typeof typeInfo === "string") {
    const registeredType = typeRegistry.get(typeInfo);
    if (registeredType && registeredType.zeroValue !== void 0) {
      return { value: registeredType.zeroValue, ok: false };
    }
  } else if (normalizedType.zeroValue !== void 0) {
    return { value: normalizedType.zeroValue, ok: false };
  }
  return { value: null, ok: false };
}
function mustTypeAssert(value, typeInfo) {
  const { value: assertedValue, ok } = typeAssert(value, typeInfo);
  if (!ok) {
    const targetTypeName = typeof typeInfo === "string" ? typeInfo : typeInfo.name || JSON.stringify(typeInfo);
    let valueTypeName = typeof value;
    if (value && value.constructor && value.constructor.name) {
      valueTypeName = value.constructor.name;
    }
    if (value === null) {
      valueTypeName = "nil";
    }
    throw new Error(
      `inline type conversion panic: value is ${valueTypeName}, not ${targetTypeName}`
    );
  }
  return assertedValue;
}
function is(value, typeInfo) {
  return matchesType(value, normalizeTypeInfo(typeInfo));
}
function typeSwitch(value, cases, defaultCase) {
  for (const caseObj of cases) {
    if (caseObj.types.length > 1) {
      const matchesAny = caseObj.types.some((typeInfo) => is(value, typeInfo));
      if (matchesAny) {
        caseObj.body(value);
        return;
      }
    } else if (caseObj.types.length === 1) {
      const typeInfo = caseObj.types[0];
      const { value: assertedValue, ok } = typeAssert(value, typeInfo);
      if (ok) {
        caseObj.body(assertedValue);
        return;
      }
    }
  }
  if (defaultCase) {
    defaultCase();
  }
}
function typedNil(typeName) {
  return Object.assign(/* @__PURE__ */ Object.create(null), {
    __goType: typeName,
    __isTypedNil: true
  });
}

// src/@goscript/builtin/varRef.ts
function varRef(v) {
  return { value: v, __isVarRef: true };
}
function isVarRef(v) {
  return v !== null && typeof v === "object" && v.__isVarRef === true;
}
function unref(b) {
  if (b === null) {
    throw new Error(
      "runtime error: invalid memory address or nil pointer dereference"
    );
  }
  return b.value;
}

// src/@goscript/builtin/defer.ts
var DisposableStack = class {
  stack = [];
  /**
   * Adds a function to be executed when the stack is disposed.
   * @param fn The function to defer.
   */
  defer(fn) {
    this.stack.push(fn);
  }
  /**
   * Disposes of the resources in the stack by executing the deferred functions
   * in Last-In, First-Out (LIFO) order.
   * If a deferred function throws an error, disposal stops, and the error is rethrown,
   * similar to Go's panic behavior during defer execution.
   */
  [Symbol.dispose]() {
    while (this.stack.length) {
      const fn = this.stack.pop();
      fn();
    }
  }
};
var AsyncDisposableStack = class {
  stack = [];
  /**
   * Adds a synchronous or asynchronous function to be executed when the stack is disposed.
   * @param fn The function to defer. Can return void or a Promise<void>.
   */
  defer(fn) {
    this.stack.push(fn);
  }
  /**
   * Asynchronously disposes of the resources in the stack by executing the deferred functions
   * sequentially in Last-In, First-Out (LIFO) order. It awaits each function if it returns a promise.
   */
  async [Symbol.asyncDispose]() {
    for (let i = this.stack.length - 1; i >= 0; --i) {
      await this.stack[i]();
    }
  }
};

// src/@goscript/builtin/errors.ts
function newError(text) {
  return {
    Error: () => text
  };
}
function toGoError(err) {
  if ("Error" in err) {
    return err;
  }
  return {
    JsError: err,
    Error: () => err.message
  };
}
function wrapPrimitiveError(value, errorFn) {
  return {
    Error: () => errorFn(value)
  };
}
export {
  AsyncDisposableStack,
  BidirectionalChannelRef,
  DisposableStack,
  ReceiveOnlyChannelRef,
  SendOnlyChannelRef,
  TypeKind,
  append,
  areTypeInfosIdentical,
  arrayToSlice,
  asArray,
  assignStruct,
  byte,
  bytesCompare,
  bytesCount,
  bytesEqual,
  bytesIndexByte,
  bytesIndexOf,
  bytesLastIndexByte,
  bytesLastIndexOf,
  bytesToArray,
  bytesToString,
  bytesToUint8Array,
  cap,
  chanRecv,
  chanRecvWithOk,
  chanSend,
  clear,
  copy,
  deleteMapEntry,
  genericBytesOrStringToString,
  getTypeByName,
  goSlice,
  index,
  indexString,
  indexStringOrBytes,
  int,
  is,
  isArrayTypeInfo,
  isBasicTypeInfo,
  isChannelTypeInfo,
  isFunctionTypeInfo,
  isInterfaceTypeInfo,
  isMapTypeInfo,
  isPointerTypeInfo,
  isSliceProxy,
  isSliceTypeInfo,
  isStructFieldInfo,
  isStructTypeInfo,
  isVarRef,
  len,
  makeChannel,
  makeChannelRef,
  makeMap,
  makeSlice,
  mapGet,
  mapHas,
  mapSet,
  markAsStructValue,
  max,
  min,
  mustTypeAssert,
  newError,
  normalizeBytes,
  panic,
  println,
  recover,
  registerInterfaceType,
  registerStructType,
  runeOrStringToString,
  runesToString,
  selectStatement,
  sliceString,
  sliceStringOrBytes,
  sortSlice,
  stringLen,
  stringToBytes,
  stringToRune,
  stringToRunes,
  toGoError,
  typeAssert,
  typeSwitch,
  typedNil,
  unref,
  varRef,
  wrapPrimitiveError
};
