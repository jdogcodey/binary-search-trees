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
  // Base case - sets left/right as null when search tree is complete
  if (start > end) {
    return null;
  }
  const midPoint = parseInt((start + end) / 2);
  const midNode = new Node(array[midPoint]);
  midNode.left = buildTree(array, start, midPoint - 1); // Recursively runs to set left side of tree
  midNode.right = buildTree(array, midPoint + 1, end); // Same on right side
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

function insert(value, root) {
  if (root === null) {
    // If empty tree then make this the root
    root = new Node(value);
  } else if (value < root.data) {
    // Recursively head down left side
    root.left = insert(value, root.left);
  } else if (value > root.data) {
    // Recursively head down right side
    root.right = insert(value, root.right);
  } else if (value === root.data) {
    // If it already exists within data set
    return "This node already exists";
  }
  return root;
}

function deleteItem(value, tree) {
  if (tree === null) {
    return null;
  }
  // Find the node to delete
  if (value < tree.data) {
    tree.left = deleteItem(value, tree.left);
  } else if (value > tree.data) {
    tree.right = deleteItem(value, tree.right);
  } else {
    // Node found
    if (tree.left === null && tree.right === null) {
      // No children (leaf node)
      return null;
    } else if (tree.left === null) {
      // One child (right)
      return tree.right;
    } else if (tree.right === null) {
      // One child (left)
      return tree.left;
    } else {
      // Two children
      const nextHighest = communism(tree.right);
      tree.data = nextHighest.data;
      tree.right = deleteItem(nextHighest.data, tree.right);
    }
  }
  return tree;
}

function communism(value) {
  if (value.left.left !== null) {
    communism(value.left);
  } else {
    const farLeft = value.left;
    value.left = value.left.right;
    return farLeft;
  }
}

function find(value, tree) {
  if (tree === null) {
    return null;
  }
  if (tree.data === value) {
    return tree;
  } else if (value < tree.data) {
    return find(value, tree.left);
  } else if (value > tree.data) {
    return find(value, tree.right);
  }
}

// Function provided by The Odin Project to help with visualisation
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

// console.log(sortArrayNoDuplicates(testArray)); // Testing the sort array function

const testTree = new Tree(testArray);

// console.log(prettyPrint(testTree.root)); // Testing that it creates a balanced search tree from given data

// Testing insertion
// console.log(insert(12, testTree.root));
// console.log(insert(14, testTree.root));
// console.log(insert(88, testTree.root));
// console.log(prettyPrint(testTree.root));
// console.log(prettyPrint(testTree.root));

// Testing deletion
// console.log(deleteItem(99, testTree.root));
// console.log(deleteItem(2, testTree.root));
// console.log(deleteItem(45, testTree.root));

// console.log(prettyPrint(testTree.root));

// Testing find
console.log(find(14, testTree.root));
console.log(find(45, testTree.root));
console.log(find(99, testTree.root));
console.log(find(2, testTree.root));
