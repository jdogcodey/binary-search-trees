// Class for Node
class Node {
  constructor(n) {
    this.data = n;
    this.left = null;
    this.right = null;
  }
}

// Class to store Binary Search Tree of given array
class Tree {
  constructor(array) {
    // Set the root and build tree from it
    const sortedArray = sortArrayNoDuplicates(array);
    this.root = buildTree(sortedArray, 0, sortedArray.length - 1); // Sets the start at 0 and the end at the total number of nodes
  }
}

// Function that takes a sorted array and turns it into a BST returning the root node
function buildTree(array, start, end) {
  if (start > end) {
    return null;
  }
  const midPoint = parseInt((start + end) / 2);
  const midNode = new Node(array[midPoint]);
  midNode.left = buildTree(array, start, midPoint - 1);
  midNode.right = buildTree(array, midPoint + 1, end);
  return midNode;
}

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

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const testArray = [
  99, 17, 44, 2, 3, 7, 14, 99, 17, 56, 45, 34, 86, 56, 9, 4, 44, 17, 8, 9,
];

console.log(sortArrayNoDuplicates(testArray)); // Testing the sort array function

const testTree = new Tree(testArray);

console.log(prettyPrint(testTree.root));
