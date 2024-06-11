// Class for Node
class Node {
  constructor(n) {
    this.number = n;
    this.left = null;
    this.right = null;
  }
}

// Class to store Binary Search Tree of given array
class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
}

function buildTree(array) {}

function sortArrayNoDuplicates(array) {
  const inOrder = [
    ...new Set(
      array.sort((a, b) => {
        return a - b;
      })
    ),
  ];
  return inOrder;
}

const testArray = [
  99, 17, 44, 2, 3, 7, 14, 99, 17, 56, 45, 34, 86, 56, 9, 4, 44, 17, 8, 9,
];
console.log(sortArrayNoDuplicates(testArray));
