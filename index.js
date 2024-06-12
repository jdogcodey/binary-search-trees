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

// Heads as far down the left of a branch as it can
function communism(value) {
  if (value.left.left !== null) {
    communism(value.left);
  } else {
    const farLeft = value.left;
    value.left = value.left.right;
    return farLeft;
  }
}

// Returns the node with the value
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

// Applies callback function on each item in level-order
function levelOrder(tree, callback = toArray) {
  if (tree === null) return null;
  const levelOrderTracker = [];
  const queue = [];
  queue.push(tree.root);
  // Apply the callback function, then add both left and right to the queue
  while (queue.length > 0) {
    const firstInLine = queue[0];
    callback(levelOrderTracker, firstInLine.data);
    if (firstInLine.left !== null) {
      queue.push(firstInLine.left);
    }
    if (firstInLine.right !== null) {
      queue.push(firstInLine.right);
    }
    queue.shift();
  }
  return levelOrderTracker;
}

// Function to add to an array - might be a built in function?
function toArray(arr, value) {
  arr.push(value);
}

// Runs a callback function on each item in the tree using inOrder tree traversal
function inOrder(tree, callback = toArray) {
  const inOrderTracker = [];
  if (tree === null) return null;
  inOrderLogic(tree.root, (returnedData) =>
    callback(inOrderTracker, returnedData)
  );
  return inOrderTracker;
}

// Logic making the recursion take place
function inOrderLogic(leaf, callback) {
  // Base case
  if (leaf === null) return;
  //Search left first
  inOrderLogic(leaf.left, callback);
  callback(leaf.data);
  inOrderLogic(leaf.right, callback);
}

// Runs a callback function on every item in the tree using preOrder tree traversal
function preOrder(tree, callback = toArray) {
  const preOrderTracker = [];
  if (tree === null) return null;
  preOrderLogic(tree.root, (returnedData) =>
    callback(preOrderTracker, returnedData)
  );
  return preOrderTracker;
}

// PreOrder traversal logic
function preOrderLogic(leaf, callback) {
  if (leaf === null) return;
  // Call back the data first then search left
  callback(leaf.data);
  preOrderLogic(leaf.left, callback);
  preOrderLogic(leaf.right, callback);
}

// RUns a callback function on every item in the tree using postOrder tree traversal
function postOrder(tree, callback = toArray) {
  const postOrderTracker = [];
  if (tree === null) return null;
  postOrderLogic(tree.root, (returnedData) =>
    callback(postOrderTracker, returnedData)
  );
  return postOrderTracker;
}

// Post Order Traversal Logic
function postOrderLogic(leaf, callback) {
  if (leaf === null) return;
  postOrderLogic(leaf.left, callback);
  postOrderLogic(leaf.right, callback);
  callback(leaf.data);
}

function height(node) {
  if (node == null) {
    return -1;
  }
  const leftHeight = height(node.left);
  const rightHeight = height(node.right);
  return Math.max(leftHeight, rightHeight) + 1;
}

function depth(value, tree) {
  if (value === tree.data) return 0;
  if (value < tree.data) return depth(value, tree.left) + 1;
  if (value > tree.data) return depth(value, tree.right) + 1;
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
// console.log(find(14, testTree.root));
// console.log(find(45, testTree.root));
// console.log(find(99, testTree.root));
// console.log(find(2, testTree.root));

// Testing levelOrder
// console.log(prettyPrint(testTree.root));
// console.log(levelOrder(testTree));

//Testing inOrder Tree Traversal
// console.log(prettyPrint(testTree.root));
// console.log(inOrder(testTree));

// Testing PreOrder Tree Traversal
// console.log(prettyPrint(testTree.root));
// console.log(postOrder(testTree));

// Testing Depth
// console.log(prettyPrint(testTree.root));
// console.log(depth(44, testTree.root));

// Testing height
console.log(prettyPrint(testTree.root));
console.log(height(find(99, testTree.root)));
