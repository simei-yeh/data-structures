

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);

  let indexList = this._storage.get(index);
  // check if something exists
  if (indexList) {
  // if there is a matching key, replace and exit out of if statement
    for (let i = 0; i < indexList.length; i++) {
      if (indexList[i][0] === k) {
        indexList[i][1] = v;
        return;
      }
    }
    // if matching index, add into index
    indexList.push([k, v]);
  } else {
    // if nothing exists in index, set index to a key, value array
    this._storage.set(index, [[k, v]]);
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);

  let indexList = this._storage.get(index);
  //check if something exists
  if (indexList) {
  //if something exists, loop through the index to find the key
    for (let i = 0; i < indexList.length; i++) {
      if (indexList[i][0] === k) {
        return indexList[i][1];
      }
    }
  }

  //if index is empty, return undefined
  return undefined;
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);

  let indexList = this._storage.get(index);
  // check if something exists
  if (indexList) {
    // if there is a matching key, delete then exit if statement
    for (let i = 0; i < indexList.length; i++) {
      if (indexList[i][0] === k) {
        indexList.splice(i,1);
        return;
      }
    }
  }
  //if something exists, loop through the index to remove the key
  this._storage.set(index, undefined);
};


/*
* Complexity: What is the time complexity of the above functions?
*
* insert      best case O(1) worst case O(n)
* retrieve    best case O(1) worst case O(n)
* remove      best case O(1) worst case O(n)
*
*/
