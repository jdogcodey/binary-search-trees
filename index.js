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

// Function to sort array in order and remove duplicates
function sortArrayNoDuplicates(array) {
  const inOrder = [
    ...new Set( // Create a set (doesn't have duplicates) and convert back into array using [...]
      array.sort((a, b) => {
        return a - b; // Sort in ascending number order
      })
    ),
  ];
  return inOrder;
}

const testArray = [
  99, 17, 44, 2, 3, 7, 14, 99, 17, 56, 45, 34, 86, 56, 9, 4, 44, 17, 8, 9,
];
console.log(sortArrayNoDuplicates(testArray));
