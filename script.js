const node = (value, left = null, right = null) => {
  return { value, left, right };
};

const tree = () => {
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  const formatArray = (array) => {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (newArray.includes(array[i])) continue;
      newArray.push(array[i]);
    }
    return newArray.sort((a, b) => a - b);
  };
  const mainRoot = {};
  const buildTree = (array) => {
    const sortedArray = formatArray(array);
    if (sortedArray[0] === undefined) {
      return null;
    }
    const mid = Math.floor((0 + sortedArray.length) / 2);
    const target = sortedArray[mid];
    const root = node(target);

    const leftHalf = sortedArray.splice(0, mid);
    const rightHalf = sortedArray.splice(1, sortedArray.length - 1);

    root.left = buildTree(leftHalf);
    root.right = buildTree(rightHalf);

    mainRoot.root = root;
    return root;
  };

  const insert = (value) => {
    let tree = mainRoot.root;
    while (true) {
      if (value < tree.value) {
        if (tree.left === null) {
          tree.left = node(value);
          break;
        }
        tree = tree.left;
        continue;
      } else if (value > tree.value) {
        if (tree.right === null) {
          tree.right = node(value);
          break;
        }
        tree = tree.right;
        continue;
      } else if (value === tree.value) {
        console.log(`${value} already exists in the BST.`);
        break;
      }
    }
  };
  // TODO: remove function
  // reqs to do the remove function:
  // case 1
  // need icheck yong value before last or target then delete yon if sha yong preceding value

  const removeLogic = (tree, value) => {
    while (true) {
      // console.log("treevalue", tree);
      //case 1
      if (
        value === tree.left.value &&
        tree.left.right === null &&
        tree.left.left === null
      ) {
        console.log(value);
        tree.left = null;
        break;
      } else if (
        value === tree.right.value &&
        tree.right.right === null &&
        tree.right.left === null
      ) {
        console.log(2);
        tree.right = null;
        break;
      }
      // loop through condition
      if (value < tree.value) {
        // console.log(tree.value);
        tree = tree.left;
        continue;
      } else if (value > tree.value) {
        // console.log(tree.value);
        tree = tree.right;
        continue;
      } else if (tree.value == null) {
        console.log("tree is null");
        return;
      }
    }
  };

  const remove = (value) => {
    let tree = mainRoot.root;
    removeLogic(tree, value);
    console.log("tree:", tree);
  };
  return { buildTree, prettyPrint, mainRoot, insert, remove };
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(array.sort((a, b) => a - b));
const balancedBST = tree();
const root = balancedBST.buildTree(array);
// balancedBST.prettyPrint(root);
console.log(balancedBST.mainRoot);
// balancedBST.insert(252);
// balancedBST.insert(932);
// balancedBST.insert(213);
// balancedBST.insert(563534);
// balancedBST.insert(6321);
// balancedBST.remove(1);

balancedBST.prettyPrint(balancedBST.mainRoot.root);

balancedBST.remove(5);
balancedBST.remove(1);
balancedBST.remove(9);
balancedBST.remove(324);
balancedBST.prettyPrint(balancedBST.mainRoot.root);
